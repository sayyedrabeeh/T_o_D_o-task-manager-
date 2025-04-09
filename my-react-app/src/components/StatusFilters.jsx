import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const StatusFilters = ({ statusFilter, setStatusFilter }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex items-center space-x-4 bg-gray-800 p-2 rounded-lg">
      <div className="flex items-center text-gray-400">
        <FiFilter size={16} className="mr-2" />
        <span className="text-sm font-medium">Status:</span>
      </div>
      
      <button 
        onClick={() => setStatusFilter("all")}
        className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
      >
        All
      </button>

      <button 
        onClick={() => setStatusFilter("completed")}
        className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
      >
        Completed
      </button>
      
      <button 
        onClick={() => setStatusFilter("pending")}
        className={`px-3 py-1 text-sm rounded-md ${statusFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
      >
        Pending
      </button>
    </div>
  );
};

export default StatusFilters;
