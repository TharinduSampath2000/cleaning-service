import express from 'express';
import { createBooking, getUserBookings, getAllBookings, deleteBooking, updateBooking } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(authenticate(['user']), createBooking)
  .get(authenticate(['admin']), getAllBookings);

router.route('/:id')
  .delete(authenticate(['admin']), deleteBooking)
  .put(authenticate(['admin', 'user']), updateBooking);

router.route('/user')
  .get(authenticate(['user']), getUserBookings);

export default router;