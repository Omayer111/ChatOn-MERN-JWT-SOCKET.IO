import express from "express";
import { protectedRoute } from "../../middleware/protectedRoute.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
} from "../../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

router.patch("/:id", protectedRoute, updateMessage);
router.delete("/:id", protectedRoute, deleteMessage);

export default router;
