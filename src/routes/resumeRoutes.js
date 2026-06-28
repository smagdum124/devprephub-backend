import express from "express";

import {
  createResumeTip,
  getResumeTips,
  getResumeTipBySlug,
  updateResumeTip,
  deleteResumeTip,
} from "../controllers/resumeController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getResumeTips);

router.get("/:slug", getResumeTipBySlug);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  createResumeTip
);

router.put(
  "/:id",
  protect,
  admin,
  updateResumeTip
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteResumeTip
);

export default router;