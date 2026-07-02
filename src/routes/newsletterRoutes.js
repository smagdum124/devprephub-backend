import express from "express";

import {
  subscribeNewsletter,
  getSubscribers,
  deleteSubscriber,
} from "../controllers/newsletterController.js";

const router = express.Router();

router.post("/", subscribeNewsletter);

router.get("/", getSubscribers);

router.delete("/:id", deleteSubscriber);

export default router;