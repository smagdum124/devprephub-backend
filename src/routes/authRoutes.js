import express from "express";
import {
    registerUser,
    loginUser,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working",
    });
});
router.get(
    "/profile",
    protect,
    (req, res) => {
        res.json({
            success: true,
            user: req.user,
        });
    }
);
router.get(
    "/admin-test",
    protect,
    admin,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
        });
    }
);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;