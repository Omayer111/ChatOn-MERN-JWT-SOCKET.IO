import User from "../models/user.model.js";

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
