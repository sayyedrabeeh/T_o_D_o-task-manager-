import { Link, useLocation } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import { FiHome, FiPlus, FiFilter } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 shadow-lg h-full flex flex-col p-6">
      <h1 className="text-2xl font-bold text-indigo-400 mb-8">TaskMaster</h1>
      
      <Link to="/" className={`mb-4 flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition-all ${location.pathname === '/' ? 'bg-gray-700 text-indigo-400' : 'text-gray-300'}`}>
        <FiHome size={18} />
        <span className="font-medium">Dashboard</span>
      </Link>
      
      <Link to="/add-todo" className={`mb-6 flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition-all ${location.pathname === '/add-todo' ? 'bg-gray-700 text-indigo-400' : 'text-gray-300'}`}>
        <FiPlus size={18} />
        <span className="font-medium">Add Task</span>
      </Link>

      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2 px-4">
          <FiFilter size={14} />
          <span>FILTERS</span>
        </p>
        <FilterButtons />
      </div>
    </div>
  );
};

export default Sidebar;
