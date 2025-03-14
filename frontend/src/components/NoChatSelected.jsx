import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-6 py-16 bg-base-200/60 rounded-lg">
      <div className="max-w-md text-center space-y-8">
        {/* Icon with subtle animation and glow */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary/70 shadow-xl shadow-primary/20 rounded-full flex items-center justify-center animate-pulse transition">
              <MessageSquare className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-primary tracking-tight">
          No Conversation Selected
        </h2>

        {/* Subtitle */}
        <p className="text-base text-zinc-500 leading-relaxed">
          Select a conversation to start chatting with your friends.
        </p>

        {/* Optional CTA or friendly tip */}
        {/* <p className="text-sm text-zinc-400 italic">
          Tip: You can also start a new chat from the contacts list.
        </p> */}
      </div>
    </div>
  );
};

export default NoChatSelected;
