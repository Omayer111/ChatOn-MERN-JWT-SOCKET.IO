import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  fetchUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await axiosInstance.get("/message/users");
      set({ users: data });
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  fetchMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const { data } = await axiosInstance.get(`/message/${userId}`);
      set({ messages: data });
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    try {
      const res = await axiosInstance.post(
        `/message/send/${get().selectedUser._id}`,
        message
      );
      set({ messages: [...get().messages, res.data] });
    } catch (error) {
      toast.error("Failed to send message");
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  updateMessage: async (id, text) => {
    try {
      const res = await axiosInstance.patch(`/message/${id}`, { text });
      set({
        messages: get().messages.map((message) =>
          message._id === id ? res.data : message
        ),
      });
    } catch (error) {
      toast.error("Failed to update message");
    }
  },

  deleteMessage: async (id) => {
    try {
      await axiosInstance.delete(`/message/${id}`);
      set({
        messages: get().messages.filter((message) => message._id !== id),
      });
    } catch (error) {
      toast.error("Failed to delete message");
    }
  },
}));
