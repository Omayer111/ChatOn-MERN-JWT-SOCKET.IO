import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20 px-4 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1a1a1a] shadow-xl rounded-2xl p-8 space-y-10 border border-zinc-800">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="text-sm text-zinc-400">Manage your personal info</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-zinc-700 shadow-md group-hover:brightness-75 transition-all"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-400 p-2 rounded-full cursor-pointer shadow-lg transition-all ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to upload photo"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-zinc-400 flex items-center gap-2 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <div className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg">
                {authUser?.name}
              </div>
            </div>

            <div>
              <div className="text-sm text-zinc-400 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <div className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                <span className="text-zinc-400">Member Since</span>
                <span className="text-white">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-zinc-400">Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
