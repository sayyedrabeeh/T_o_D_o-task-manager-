 
const FilterButtons = ({ filter, setFilter }) => {
    
    const options = ["All", "Daily", "Weekly", "Monthly"];
  
    return (
      <div className="flex flex-col space-y-2 px-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}  
            className={`px-4 py-2 rounded-lg text-left transition-all ${
              filter === option
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {option} Tasks
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterButtons;
  