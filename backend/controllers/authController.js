import User from '../models/User.js';
import { HandleError } from "../utils/handleError.js"
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new HandleError("Username and password are required", 400);
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new HandleError("User not found", 404);
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      throw new HandleError("Invalid credentials", 401);
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
      id: user._id, 
      username: user.username, 
      role: user.role
    });
  } catch (error) {
    throw new HandleError(error.message, error.statusCode || 500);
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new HandleError("Username and password are required", 400);
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new HandleError("User already exists", 400);
    }
    
    const user = await User.create({ username, password });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ 
      id: user._id, 
      username: user.username, 
      role: user.role 
    });
  } catch (error) {
    throw new HandleError(error.message, error.statusCode || 500);
  }
}

export const checkAuth = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new HandleError("Token not provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new HandleError("User not found", 404);
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    throw new HandleError(error.message, error.statusCode || 500);
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
}