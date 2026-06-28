import express from "express";

import {
  createContact,
  getContacts,
  deleteContact,
  markAsRead,
} from "../controllers/contactController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createContact);

router.get("/", protect, admin, getContacts);

router.put("/:id/read", protect, admin, markAsRead);

router.delete("/:id", protect, admin, deleteContact);

export default router;