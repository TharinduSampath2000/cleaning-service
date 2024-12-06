import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({
    id: user._id,
    username: user.username,
    role: user.role,
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}