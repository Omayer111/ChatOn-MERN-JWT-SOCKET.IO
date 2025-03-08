import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const otherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(otherUsers);
  } catch (err) {
    console.log("error in get users for sidebar controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: otherUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("error in get messages controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;

    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image);
        imageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.log("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //realtime messaging

    res.status(200).json(newMessage);
  } catch (err) {
    console.log("error in send message controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
