import Service from '../models/Service.js';
import { HandleError } from '../utils/handleError.js';

export const createService = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return HandleError('Name is required', 400);
  }

  try {
    const service = await Service.create({ name });

    res.status(201).json({ service });
  } catch (error) {
    return HandleError(error.message, error.statusCode || 500);
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    return HandleError(error.message, error.statusCode || 500);
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return HandleError('Name is required', 400);
  }

  try {
    const service = await Service.findByIdAndUpdate(id, { name }, { new: true });

    if (!service) {
      return HandleError('Service not found', 404);
    }

    res.status(200).json({ service });
  } catch (error) {
    return HandleError(error.message, error.statusCode || 500);
  }
}

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return HandleError('Service not found', 404);
    }

    res.status(204).end();
  } catch (error) {
    return HandleError(error.message, error.statusCode || 500);
  }
};


