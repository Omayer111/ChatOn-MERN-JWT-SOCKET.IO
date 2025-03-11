import {
  MessageCircle,
  Users,
  Send,
  Smile,
  PhoneCall,
  ShieldCheck,
  ThumbsUp,
  HeartHandshake,
  Globe,
} from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Card Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Card 1 - Messaging */}
          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 shadow-md hover:shadow-xl transition ">
            <MessageCircle className="mx-auto text-primary" size={30} />
          </div>

          {/* Card 2 - Community */}
          <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 shadow-md hover:shadow-xl transition animate-pulse">
            <Users className="mx-auto text-secondary" size={30} />
          </div>

          {/* Card 3 - Sending */}
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 shadow-md hover:shadow-xl transition ">
            <Send className="mx-auto text-accent" size={30} />
          </div>

          {/* Card 4 - Friendly UI */}
          <div className="p-6 rounded-2xl border border-pink-200 shadow-md hover:shadow-xl transition animate-pulse">
            <Smile className="mx-auto text-pink-500" size={30} />
          </div>

          {/* Card 5 - Secure Communication */}
          <div className="p-6 rounded-2xl border border-blue-200 shadow-md hover:shadow-xl transition ">
            <ShieldCheck className="mx-auto text-blue-600" size={30} />
          </div>

          {/* Card 6 - Global Connection */}
          <div className="p-6 rounded-2xl border border-emerald-200 shadow-md hover:shadow-xl transition animate-pulse">
            <Globe className="mx-auto text-emerald-600" size={30} />
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        <p className="text-base text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
