import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import StatusFilters from "../components/StatusFilters";
import TodoCard from "../components/TodoCard";
import { FiPlus } from "react-icons/fi";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <div className="p-6 space-y-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">My Tasks</h1>
            <Link 
              to="/add-todo" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiPlus size={18} />
              <span>New Task</span>
            </Link>
          </div>
          
          <SearchBar />
          
          <StatusFilters />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/todo/1" className="block hover:transform hover:scale-[1.01] transition-all">
              <TodoCard
                title="Learn React"
                description="Finish the props and state lesson with comprehensive examples"
                completed={true}
                completedDate="2025-04-08"
                frequency="Daily"
              />
            </Link>
            
            <Link to="/todo/2" className="block hover:transform hover:scale-[1.01] transition-all">
              <TodoCard
                title="Complete Homework"
                description="Math and Science assignments due next week"
                completed={false}
                frequency="Weekly"
              />
            </Link>
            
            <TodoCard
              title="Project Planning"
              description="Create roadmap for upcoming app redesign"
              completed={false}
              frequency="Monthly"
            />
            
            <TodoCard
              title="Code Review"
              description="Review PR submissions for the team project"
              completed={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
