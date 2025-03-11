import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100 border-b shadow-sm px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-primary">
        QuickBid
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/login" className="btn btn-ghost btn-sm">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary btn-sm">
          Register
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md z-50 flex flex-col items-center space-y-2 py-4 md:hidden">
          <Link
            to="/login"
            className="btn btn-ghost w-11/12"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-primary w-11/12"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
