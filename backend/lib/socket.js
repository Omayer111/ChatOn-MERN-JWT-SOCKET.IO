import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId];
}

// Storing the active users
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId; // sending userId from frontend
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // Store userId in the socket instance
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    const userId = socket.userId;
    if (userId) {
      delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
