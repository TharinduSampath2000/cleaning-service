import { login, register, logout, checkAuth } from '../controllers/authController.js';
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', authenticate(['admin', 'user']), logout);
router.get('/status', authenticate(['admin', 'user']), checkAuth);

export default router;