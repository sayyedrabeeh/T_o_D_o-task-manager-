import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
    
        // Optional: Set display name
        await updateProfile(userCredential.user, {
          displayName: formData.username,
        });
        toast.success("Signup successful!");
        setFormData({ username: "", email: "", password: "" });
        setTimeout(() => {
            navigate("/login");
          }, 1500);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            toast.error("This email is already registered.");
          } else if (error.code === "auth/invalid-email") {
            toast.error("Invalid email address.");
          } else if (error.code === "auth/weak-password") {
            toast.error("Password should be at least 6 characters.");
          } else {
            toast.error("Signup failed. Please try again.");
            console.error("Signup error:", error.code);
          }
      }    
  };

  return (
  <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-400">TaskMaster</h1>
        <p className="mt-2 text-gray-400">Create your account</p>
      </div>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiUser />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Choose a username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiMail />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiLock />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Create a password"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiUserPlus size={18} />
            <span>Create Account</span>
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default Signup;
