import { createService, deleteService, getServices, updateService } from "../controllers/serviceController.js";
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(authenticate(["admin", "user"]), getServices)
  .post(authenticate(["admin"]), createService);

router.route("/:id")
  .delete(authenticate(["admin"]), deleteService)
  .put(authenticate(["admin"]), updateService);

export default router;