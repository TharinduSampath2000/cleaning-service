import Booking from '../models/Booking.js';
import { HandleError } from '../utils/handleError.js';

export const createBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;
  const user_id = req.user.id;

  try {
    const booking = await Booking.create({
      customer_name,
      address,
      date_time,
      service_id,
      user_id,
    });

    const populatedBooking = await booking.populate(['service', 'user']);
    res.status(201).json(populatedBooking);
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}

export const getBookings = async (req, res) => {
  const user_id = req.user.id;
  const isAdmin = req.user.role === 'admin';

  try {
    const queryParam = isAdmin ? {} : { user_id };
    const bookings = await Booking.find(queryParam)
      .populate(['service', 'user'])
      .sort({ date_time: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}

export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { customer_name, address, date_time, service_id } = req.body;
  const user_id = req.user.id;
  const isAdmin = req.user.role === 'admin';

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return HandleError('Booking not found', 404);
    }

    if (!isAdmin && booking.user_id.toString() !== user_id) {
      return HandleError('Unauthorized', 401);
    }

    booking.customer_name = customer_name;
    booking.address = address;
    booking.date_time = date_time;
    booking.service_id = service_id;
    await booking.save();

    const updatedBooking = await booking.populate(['service', 'user']);
    res.status(200).json(updatedBooking);
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const isAdmin = req.user.role === 'admin';

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return HandleError('Booking not found', 404);
    }

    if (!isAdmin && booking.user_id.toString() !== user_id) {
      return HandleError('Unauthorized', 401);  
    }

    await booking.deleteOne();
    res.status(204).end();
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}