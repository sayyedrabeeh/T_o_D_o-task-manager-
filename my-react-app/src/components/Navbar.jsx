import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiLogIn, FiMenu } from "react-icons/fi";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from 'react';



const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();  
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center md:hidden">
        <button 
          onClick={() => setShowSidebar(!showSidebar)} 
          className="text-gray-300 hover:text-white"
        >
          <FiMenu size={24} />
        </button>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <FiUser size={18} />
          <span className="hidden sm:inline">Account</span>
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-xl rounded-lg border border-gray-600 overflow-hidden z-50">
            {!user ? (
              <button
                className="block w-full px-4 py-3 text-left hover:bg-gray-600 transition-all flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <FiLogIn size={16} />
                <span>Login</span>
              </button>
            ) :(
            <button 
              className="block w-full px-4 py-3 text-left hover:bg-gray-600 transition-all flex items-center gap-2" 
              onClick={handleLogout}
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
