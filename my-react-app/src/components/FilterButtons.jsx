const FilterButtons = () => {
    return (
      <div className="flex flex-col space-y-2 px-4">
        <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all text-left">
          All Tasks
        </button>
        <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all text-left">
          Daily
        </button>
        <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all text-left">
          Weekly
        </button>
        <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all text-left">
          Monthly
        </button>
      </div>
    );
  };
  
  export default FilterButtons;