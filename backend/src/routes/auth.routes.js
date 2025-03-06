import express from "express";
import { register, login, logout } from "../../controllers/auth.controllers.js";

const router = express.Router();

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);

export default router;
