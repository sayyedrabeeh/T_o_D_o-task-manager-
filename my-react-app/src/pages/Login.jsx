import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";


const Login = () => {
  const [formData, setFormData] = useState({
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
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Login successful!");
        navigate("/");  
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
            toast.error("Invalid credentials. Please try again.");
            console.log(error.message);
      
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        
  };
  }
 return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            TaskMaster
          </h1>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-lg shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
            >
              <FiLogIn size={18} />
              <span>Login</span>
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;