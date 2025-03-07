import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "User failed to  create" });
    }

    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (err) {
    console.log("error in register controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  res.send("login hoise");
};

export const logout = async (req, res) => {
  res.send("logout hoise");
};
