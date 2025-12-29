import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from './errorHandler.js';

export const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = req[source];
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });

        next(new ValidationError(errors));
      } else {
        next(error);
      }
    }
  };
};

// Validate multiple sources
export const validateAll = (schemas: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const errors: Record<string, string[]> = {};

      for (const [source, schema] of Object.entries(schemas)) {
        if (schema) {
          try {
            schema.parse(req[source as keyof typeof req]);
          } catch (error) {
            if (error instanceof ZodError) {
              error.errors.forEach((err) => {
                const path = `${source}.${err.path.join('.')}`;
                if (!errors[path]) {
                  errors[path] = [];
                }
                errors[path].push(err.message);
              });
            }
          }
        }
      }

      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};



