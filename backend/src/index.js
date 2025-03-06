import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server port number " + PORT);
  connectDB();
});
