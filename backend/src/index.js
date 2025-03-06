import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
