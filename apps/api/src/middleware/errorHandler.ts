import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super('Ошибка валидации', 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Ресурс') {
    super(`${resource} не найден`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Не авторизован') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Доступ запрещен') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Конфликт данных') {
    super(message, 409, 'CONFLICT');
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Handle Prisma errors
  if (err.constructor.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as { code: string; meta?: { target?: string[] } };
    
    if (prismaError.code === 'P2002') {
      res.status(409).json({
        error: 'Запись с такими данными уже существует',
        code: 'DUPLICATE_ENTRY',
        field: prismaError.meta?.target?.[0],
      });
      return;
    }
    
    if (prismaError.code === 'P2025') {
      res.status(404).json({
        error: 'Запись не найдена',
        code: 'NOT_FOUND',
      });
      return;
    }
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: 'Недействительный токен',
      code: 'INVALID_TOKEN',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      error: 'Токен истек',
      code: 'TOKEN_EXPIRED',
    });
    return;
  }

  // Handle validation errors
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      errors: err.errors,
    });
    return;
  }

  // Handle operational errors
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
    return;
  }

  // Handle unknown errors
  const statusCode = 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Внутренняя ошибка сервера' 
    : err.message;

  res.status(statusCode).json({
    error: message,
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};



