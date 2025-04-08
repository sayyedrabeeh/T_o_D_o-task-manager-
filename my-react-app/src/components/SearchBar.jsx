import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        <FiSearch size={18} />
      </span>
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;