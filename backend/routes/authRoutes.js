import { login, register, logout } from '../controllers/authController.js';
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', authenticate(['admin', 'user']), logout);

export default router;