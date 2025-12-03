 
const FilterButtons = ({ filter, setFilter }) => {
    
    const options = ["All", "Daily", "Weekly", "Monthly"];
  
  return (
    <div className="flex flex-col space-y-2 px-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setFilter(option)}  
          className={`px-4 py-2 rounded-lg text-left transition-all duration-300 transform hover:scale-[1.02] ${
            filter === option
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
              : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 hover:from-gray-700 hover:to-gray-600"
          }`}
        >
          {option} Tasks
        </button>
      ))}
    </div>
  );
  };
  
  export default FilterButtons;
  