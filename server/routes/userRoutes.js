import { registerUser ,loginUser, getProfile} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
