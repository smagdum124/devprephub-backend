import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import {
    createQuestion,
    getQuestions,
    getQuestionBySlug,
    updateQuestion,
    deleteQuestion
} from "../controllers/questionController.js";

const router = express.Router();
router.get("/", getQuestions);
router.get("/:slug", getQuestionBySlug);
router.post(
    "/",
    protect,
    admin,
    createQuestion
);
router.put(
    "/:id",
    protect,
    admin,
    updateQuestion
);

router.delete(
    "/:id",
    protect,
    admin,
    deleteQuestion
);
export default router;