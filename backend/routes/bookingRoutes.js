import express from 'express';
import { createBooking, getBookings, deleteBooking, updateBooking } from '../controllers/bookingController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createBooking)
  .get(requireAdmin, getBookings);

router.route('/:id')
  .delete(requireAdmin, deleteBooking)
  .put(requireAdmin, updateBooking);

export default router;