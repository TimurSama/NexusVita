import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' })
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Недействительный токен' })
    }

    req.user = user
    next()
  })
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Не авторизован' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }

    next()
  }
}

