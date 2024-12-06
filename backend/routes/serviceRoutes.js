import { createService, deleteService, getServices, updateService } from "../controllers/serviceController.js";
import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getServices)
  .post(requireAdmin, createService);

router.route("/:id")
  .delete(requireAdmin, deleteService)
  .put(requireAdmin, updateService);

export default router;