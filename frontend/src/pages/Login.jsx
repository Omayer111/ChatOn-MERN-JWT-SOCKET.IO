import React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

const Login = () => {
  const { isLoggingIn, logIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email) {
      toast.error("Invalid Authentication");
      return false;
    }
    if (!formData.password) {
      toast.error("Invalid Authentication");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Invalid Authentication");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid Authentication");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await logIn(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" shadow-2xl shadow-black rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl text-green-700 font-bold text-center text-primary mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue chatting!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password Input with toggle */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            ></button>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline text-teal-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
