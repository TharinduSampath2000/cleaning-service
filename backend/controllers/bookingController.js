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

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate(['service', 'user']);
    res.status(200).json({ bookings });
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}

export const getUserBookings = async (req, res) => {
  const user_id = req.user.id;

  try {
    const bookings = await Booking.find({ user_id }).populate(['service', 'user']);
    res.status(200).json({ bookings });
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}

export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { customer_name, address, date_time, service_id, status } = req.body;
  
  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return HandleError('Booking not found', 404);
    }

    booking.customer_name = customer_name;
    booking.address = address;
    booking.date_time = date_time;
    booking.service_id = service_id;
    booking.status = status;

    await booking.save();
    res.status(200).json({ booking });
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return HandleError('Booking not found', 404);
    }

    await booking.remove();
    res.status(204).end();
  } catch (error) {
    HandleError(error.message, error.statusCode || 500);
  }
}