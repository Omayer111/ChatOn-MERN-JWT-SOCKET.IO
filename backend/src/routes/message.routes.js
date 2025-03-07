import express from "express";
import { protectedRoute } from "../../middleware/protectedRoute.middleware.js";
import { getUsersForSidebar } from "../../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSidebar);

export default router;
