import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null, // data of user who is currently logged in
  isCheckingAuth: true, // true if we are checking if user is logged in

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  socket: null,

  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      toast.error("Error checking auth:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      set({ authUser: res.data });
      toast.success("Signed up successfully!");
      get().connectSocket();
    } catch (err) {
      toast.error("Error signing up:", err);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");

      // Connect to socket.io server

      get().connectSocket();
    } catch (err) {
      toast.error("Error logging in:", err);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Error logging out:", err);
    }
  },

  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", formData);
      set({ authUser: res.data });
      console.log("res", res);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile:", err);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:3000", {
      query: { userId: authUser._id },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("onlineUsers", (data) => {
      set({ onlineUsers: data });
      console.log("Online users:", data);
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.emit("leave", get().authUser?._id);
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useAuthStore;
