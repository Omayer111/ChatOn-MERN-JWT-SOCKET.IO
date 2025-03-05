import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup hoise");
});
router.get("/login", (req, res) => {
  res.send("login hoise");
});
router.get("/logout", (req, res) => {
  res.send("Signout hoise");
});

export default router;
