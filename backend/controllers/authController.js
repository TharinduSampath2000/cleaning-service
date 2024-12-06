import User from '../models/User.js';
import { HandleError } from "../utils/handleError.js"
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new HandleError("User not found", 404);
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      throw new HandleError("Invalid credentials", 401);
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      role: user.role,
    }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ token });
  } catch (error) {
    throw new HandleError(error.message, error.statusCode);
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new HandleError("User already exists", 400);
    }
    
    const user = await User.create({ username, password });

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      role: user.role,
    }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({ token });
  } catch (error) {
    throw new HandleError(error.message, error.statusCode);
  }
}