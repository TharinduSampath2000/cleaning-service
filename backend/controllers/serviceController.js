import Service from '../models/Service.js';
import { HandleError } from '../utils/handleError.js';

export const createService = async (req, res, next) => {
  const { name } = req.body;

  try {
    if (!name) {
      throw new HandleError("Name is required", 400);
    }

    const service = await Service.create({ name });

    res.status(201).json({ service });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      throw new HandleError("Name is required", 400);
    }
    
    const service = await Service.findByIdAndUpdate(id, { name }, { new: true });

    if (!service) {
      throw new HandleError('Service not found', 404);
    }

    res.status(200).json({ service });
  } catch (error) {
    next(error);
  }
}

export const deleteService = async (req, res, next) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      throw new HandleError('Service not found', 404);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};


