import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, MessageCircle, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"; // assuming useAuthStore has authUser and logOut

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logOut } = useAuthStore();

  return (
    <nav className="bg-base-100 border-b shadow-sm px-4 py-3 flex justify-between items-center relative z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-primary flex items-center">
        <MessageCircle size={24} />
        <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-600 to-purple-700  animate-gradient-x font-bold text-[28px]">
          Chat
        </span>
        <span className="ml-1 text-[28px] font-extrabold text-[#4068be]">
          On
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4">
        {authUser ? (
          <>
            {/* If logged in, show Profile, Settings, and Logout */}
            <Link
              to="/profile"
              className="text-base-content hover:text-primary transition flex items-center gap-1"
            >
              <User size={18} /> Profile
            </Link>
            <Link
              to="/settings"
              className="pl-3 text-base-content hover:text-primary transition flex items-center gap-1"
            >
              <Settings size={18} /> Settings
            </Link>
            <button
              onClick={logOut}
              className="text-[15px] btn btn-ghost border-red-700 btn-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* If not logged in, show Login, Register, and Settings */}
            <Link to="/login" className="btn btn-ghost border-teal-400 btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
            <Link
              to="/settings"
              className="pl-3 text-base-content hover:text-primary transition flex items-center gap-1"
            >
              <Settings size={18} /> Settings
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Unique Mobile Dropdown - Top Right */}
      <div
        className={`absolute top-16 right-4 w-56 bg-base-100 rounded-xl shadow-lg border border-blue-200 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } md:hidden z-40`}
      >
        <div className="flex flex-col items-start space-y-2 p-4">
          {authUser ? (
            <>
              {/* If logged in, show Profile, Settings, and Logout */}
              <Link
                to="/profile"
                className="text-base-content hover:text-primary transition flex items-center gap-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} /> Profile
              </Link>
              <Link
                to="/settings"
                className="text-base-content hover:text-primary transition flex items-center gap-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={18} /> Settings
              </Link>
              <button
                onClick={() => {
                  logOut();
                  setIsOpen(false);
                }}
                className="btn btn-ghost border-red-700 btn-sm w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* If not logged in, show Login, Register, and Settings */}
              <Link
                to="/login"
                className="btn btn-ghost border-teal-400 btn-sm w-full"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm w-full"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/settings"
                className="text-base-content hover:text-primary transition flex items-center gap-2 w-full"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={18} /> Settings
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
