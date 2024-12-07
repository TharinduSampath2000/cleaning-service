import User from '../models/User.js';
import { HandleError } from "../utils/handleError.js"
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new HandleError("Username and password are required", 400);
    }

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
    next(error);
  }
};

export const register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new HandleError("Username and password are required", 400);
    }

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
    next(error);
  }
}

export const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new HandleError("Unauthorized", 401);
    }
    res.status(200).json({ 
      id: user._id, 
      username: user.username, 
      role: user.role 
    });
  } catch (error) {
    next(error);
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new HandleError("Unauthorized", 401);
    }

    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}