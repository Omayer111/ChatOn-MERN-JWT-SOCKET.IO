import express from "express";
import { protectedRoute } from "../../middleware/protectedRoute.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
