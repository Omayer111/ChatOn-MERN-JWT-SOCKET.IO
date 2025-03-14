import React, { useState, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { Image, X, ZoomIn } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, messages, isMessagesLoading, fetchMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser._id, fetchMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const openImageViewer = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const closeImageViewer = () => {
    setExpandedImage(null);
  };

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100/80">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100/80">
      <ChatHeader />

      {/* Messages area with elegant styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          const isMyMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
              ref={isLastMessage ? messageEndRef : null}
            >
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full border-2 border-base-300 shadow-sm overflow-hidden">
                  <img
                    src={
                      isMyMessage
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="chat-header mb-1 flex items-center gap-1.5">
                <span className="text-sm font-medium opacity-75">
                  {isMyMessage ? "You" : selectedUser.name}
                </span>
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div
                className={`chat-bubble ${
                  isMyMessage
                    ? "bg-slate-900 text-primary-content"
                    : "bg-base-200"
                } shadow-sm`}
              >
                {message.image && (
                  <div className="relative group mb-2">
                    <div className="overflow-hidden rounded-md max-w-xs">
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="object-contain rounded-md cursor-pointer transform transition-transform hover:scale-[1.02]"
                        onClick={() => openImageViewer(message.image)}
                      />
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => openImageViewer(message.image)}
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>
                )}
                {message.text && (
                  <p className="text-sm leading-relaxed">{message.text}</p>
                )}
              </div>

              <div className="chat-footer opacity-50 text-xs mt-0.5">
                {/* Can add read receipts or additional info here */}
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-base-content/40">
            <Image size={40} className="mb-2 opacity-30" />
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">Send a message to start the conversation</p>
          </div>
        )}
      </div>

      <MessageInput />

      {/* Image modal viewer */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={closeImageViewer}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full">
            <button
              className="absolute -top-10 right-0 text-white hover:text-primary p-2"
              onClick={closeImageViewer}
            >
              <X size={24} />
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-h-[80vh] max-w-full object-contain mx-auto rounded-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
