import { FiTrash, FiCheck, FiEdit } from "react-icons/fi";

const TodoCard = ({ title, description, completed, completedDate, frequency }) => {
  const badgeColor = {
    Daily: "bg-blue-600",
    Weekly: "bg-indigo-600",
    Monthly: "bg-purple-600",
  }[frequency] || "";

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-5 space-y-3 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {frequency && (
          <span className={`text-white text-xs px-3 py-1 rounded-full ${badgeColor}`}>
            {frequency}
          </span>
        )}
      </div>

      <p className="text-gray-300 text-sm">{description}</p>
      
      {completed && (
        <p className="text-green-400 text-sm flex items-center">
          <FiCheck className="mr-1" /> Completed on: {completedDate}
        </p>
      )}
      
      <div className="flex gap-3 mt-3">
        <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          <FiTrash size={16} />
        </button>
        <button className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          <FiCheck size={16} />
        </button>
        <button className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
          <FiEdit size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
