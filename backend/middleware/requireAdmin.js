export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return HandleError('Forbidden', 403);
  }

  next();
}