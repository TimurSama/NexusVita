import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';
import { UnauthorizedError, ForbiddenError } from './errorHandler.js';
import { UserRole } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Токен не предоставлен');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as JwtPayload;

    // Verify user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedError('Пользователь не найден');
    }

    if (!user.isActive) {
      throw new ForbiddenError('Аккаунт заблокирован');
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

// Optional auth - doesn't throw if no token
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (user && user.isActive) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }

    next();
  } catch {
    // Ignore token errors for optional auth
    next();
  }
};

// Role-based access control
export const requireRole = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Не авторизован');
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Недостаточно прав доступа');
    }

    next();
  };
};

// Check if user is trainer or higher
export const requireTrainer = requireRole(
  UserRole.TRAINER,
  UserRole.DOCTOR,
  UserRole.NUTRITIONIST,
  UserRole.PSYCHOLOGIST,
  UserRole.SEXOLOGIST,
  UserRole.SPECIALIST,
  UserRole.ADMIN
);

// Check if user is specialist (doctor, psychologist, etc.)
export const requireSpecialist = requireRole(
  UserRole.DOCTOR,
  UserRole.NUTRITIONIST,
  UserRole.PSYCHOLOGIST,
  UserRole.SEXOLOGIST,
  UserRole.SPECIALIST,
  UserRole.ADMIN
);

// Check if user is admin
export const requireAdmin = requireRole(UserRole.ADMIN);

// Check if user owns resource or is admin
export const requireOwnerOrAdmin = (getOwnerId: (req: Request) => Promise<string | null>) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Не авторизован');
      }

      if (req.user.role === UserRole.ADMIN) {
        return next();
      }

      const ownerId = await getOwnerId(req);

      if (!ownerId || ownerId !== req.user.id) {
        throw new ForbiddenError('Вы не можете выполнить это действие');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};


