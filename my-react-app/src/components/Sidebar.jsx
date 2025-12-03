import { Link, useLocation } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import { FiHome, FiPlus, FiFilter } from 'react-icons/fi';

const Sidebar = ({ filter, setFilter }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gradient-to-b from-black via-gray-900 to-black shadow-2xl h-full flex flex-col p-6 border-r border-gray-800">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
        TaskMaster
      </h1>
      
      <Link 
        to="/" 
        className={`mb-4 flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
          location.pathname === '/' 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
            : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700'
        }`}
      >
        <FiHome size={18} />
        <span className="font-medium">Dashboard</span>
      </Link>
      
      <Link 
        to="/add-todo" 
        className={`mb-6 flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
          location.pathname === '/add-todo' 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
            : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700'
        }`}
      >
        <FiPlus size={18} />
        <span className="font-medium">Add Task</span>
      </Link>

      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2 px-4">
          <FiFilter size={14} />
          <span>FILTERS</span>
        </p>
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
};

export default Sidebar;
