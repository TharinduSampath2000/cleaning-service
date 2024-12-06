import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import { HandleError } from '../utils/handleError.js';

export const authenticate = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return HandleError("Unauthorized", 401);
      }

      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return HandleError("User not found", 404);
      }

      if (roles.length && !roles.includes(user.role)) {
        return HandleError("Forbidden", 403);
      }

      req.user = user;
      next();
    } catch (error) {
      return HandleError("Unauthorized", 401);
    }
  };
}