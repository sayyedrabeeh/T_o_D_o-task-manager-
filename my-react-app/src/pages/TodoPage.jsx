import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TodoCarddisplay from "../components/TodoCarddisplay";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const TodoPage = () => {
  const staticTodos = [
    {
      id: 1,
      title: "Complete Portfolio",
      description: "Finish all sections of the portfolio project",
      frequency: "Daily",
      tracking: {
        "2025-04-07": false,
        "2025-04-08": true,
      },
      subtasks: [
        {
          id: 101,
          title: "Header section",
          tracking: {
            "2025-04-07": true,
            "2025-04-08": false,
          },
        },
        {
          id: 102,
          title: "Projects section",
          tracking: {
            "2025-04-07": false,
            "2025-04-08": false,
          },
        },
      ],
    },
    {
      id: 2,
      title: "Prepare Weekly Review",
      description: "Summarize work done and plan next week",
      frequency: "Weekly",
      tracking: {
        "2025-04-01": true,
        "2025-04-08": false,
      },
      subtasks: [
        {
          id: 201,
          title: "Gather tasks",
          tracking: {
            "2025-04-01": false,
            "2025-04-08": true,
          },
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-6 space-y-6 overflow-auto">
          <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-4">
            <FiArrowLeft className="mr-2" />
            Back to dashboard
          </Link>
          
          <h1 className="text-2xl font-bold text-white mb-6">Task Details</h1>
          
          {staticTodos.map((todo) => (
            <TodoCarddisplay
              key={todo.id}
              todo={todo}
              onToggle={() => {}}
              onSubtaskToggle={() => {}}
              onAddSubtask={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;