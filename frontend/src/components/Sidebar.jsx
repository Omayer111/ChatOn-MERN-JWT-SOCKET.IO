import React, { useEffect } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Users,
  Search,
  Settings,
  MessageSquare,
  UserSearch,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

const Sidebar = () => {
  const { users, isUsersLoading, fetchUsers, setSelectedUser, selectedUser } =
    useChatStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesOnlineFilter = showOnlineOnly
      ? onlineUsers.includes(user._id)
      : true;
    return matchesSearch && matchesOnlineFilter;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col bg-base-100 shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-3 border-b border-base-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <h2 className="font-semibold text-lg hidden lg:block">ChatOn</h2>
          </div>
          <div className="hidden lg:flex items-center gap-1 text-xs">
            <span
              className={`size-2 rounded-full ${
                onlineUsers.length > 1 ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <span className="text-base-content/70">
              {onlineUsers.length - 1} online
            </span>
          </div>
        </div>

        {/* Search and filter - visible on larger screens */}
        <div className="hidden lg:block space-y-2">
          <div className="relative mb-4">
            <UserSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/50 z-30" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm input-bordered w-full pl-10 bg-base-200/70"
            />
          </div>

          <div className="flex items-center justify-between ">
            <label className="cursor-pointer flex items-center gap-3">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-sm">Online only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Users list */}
      <div className="overflow-auto w-full flex-1 py-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full px-2 py-2 flex items-center gap-3 mb-1 mx-1 rounded-lg
                hover:bg-base-200 transition-all
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-200 shadow-sm border-l-4 border-l-emerald-600"
                    : ""
                }
              `}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-10 object-cover rounded-full shadow-sm border border-base-300"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-2.5 bg-green-500 
                    rounded-full ring-2 ring-base-100"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block flex-1 text-left min-w-0">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-xs text-base-content/60 flex items-center gap-1">
                  <span
                    className={`size-1.5 rounded-full ${
                      onlineUsers.includes(user._id)
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {onlineUsers.includes(user._id) ? "Active now" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50 py-6">
            <Users className="size-10 mb-2 opacity-20" />
            <p className="text-xs">
              {searchQuery
                ? "No matching contacts found"
                : showOnlineOnly
                ? "No online contacts"
                : "No contacts available"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setShowOnlineOnly(false);
              }}
              className="btn btn-ghost btn-xs mt-1"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Footer with settings link */}
      <div className="p-2 border-t border-base-300 flex justify-center lg:justify-between items-center">
        <span className="hidden lg:block text-xs text-base-content/60">
          {filteredUsers.length} contact{filteredUsers.length !== 1 && "s"}
        </span>
        <button
          className="btn btn-ghost btn-sm btn-circle"
          title="Settings"
          onClick={() => (window.location.href = "/settings")}
        >
          <Settings className="size-4" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
