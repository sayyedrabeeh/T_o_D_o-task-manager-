import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const StatusFilters = ({ statusFilter, setStatusFilter }) => {
  const [activeFilter, setActiveFilter] = useState("all");

 return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-900 to-black p-2 rounded-lg border border-gray-800 shadow-lg">
      <div className="flex items-center text-gray-400">
        <FiFilter size={16} className="mr-2" />
        <span className="text-sm font-medium">Status:</span>
      </div>
      
      <button 
        onClick={() => setStatusFilter("all")}
        className={`px-3 py-1 text-sm rounded-md transition-all duration-300 transform hover:scale-105 ${
          statusFilter === 'all' 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
            : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600'
        }`}
      >
        All
      </button>

      <button 
        onClick={() => setStatusFilter("completed")}
        className={`px-3 py-1 text-sm rounded-md transition-all duration-300 transform hover:scale-105 ${
          statusFilter === 'completed' 
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30' 
            : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600'
        }`}
      >
        Completed
      </button>
      
      <button 
        onClick={() => setStatusFilter("pending")}
        className={`px-3 py-1 text-sm rounded-md transition-all duration-300 transform hover:scale-105 ${
          statusFilter === 'pending' 
            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/30' 
            : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600'
        }`}
      >
        Pending
      </button>
    </div>
  );
};

export default StatusFilters;
