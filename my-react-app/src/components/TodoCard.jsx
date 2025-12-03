import { FiTrash, FiCheck, FiEdit } from "react-icons/fi";

const TodoCard = ({ title, description, completed, completedDate, frequency }) => {
  const badgeColor = {
        Daily: "from-blue-600 to-cyan-600",
    Weekly: "from-green-600 to-emerald-600",
    Monthly: "from-purple-600 to-pink-600",
     
  }[frequency] || "";

 return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-lg p-5 space-y-3 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple-500/20">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {frequency && (
          <span className={`text-white text-xs px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor} shadow-lg`}>
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
    </div>
  );
};

export default TodoCard;
