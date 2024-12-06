import { verifyToken } from '../utils/jwt.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return HandleError('Unauthorized', 401);
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return HandleError('Unauthorized', 401);
  }
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return HandleError("Forbidden", 403);
  }

  next();
};