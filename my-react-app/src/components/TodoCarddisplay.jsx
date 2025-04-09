import { useState } from "react";
import TrackingCheckbox from "./TrackingCheckbox";
import SubtaskProgress from "./SubtaskProgress";
import { FiPlus } from "react-icons/fi";
import { format, startOfWeek, startOfMonth } from "date-fns";


const TodoCarddisplay = ({ todo, onToggle, onSubtaskToggle, onAddSubtask, onEditSubtask, onDeleteSubtask }) => {
  const [showForm, setShowForm] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtaskFrequency, setSubtaskFrequency] = useState("None");
  const [error, setError] = useState("");

  
  const getAllowedFrequencies = () => {
    switch (todo.frequency) {
      case "Daily":
        return ["Daily"];
      case "Weekly":
        return ["Daily", "Weekly"];
      case "Monthly":
        return ["Daily", "Weekly", "Monthly"];
      case "None":
      default:
        return ["Daily", "Weekly", "Monthly", "None"];
    }
  };

  const allowedFrequencies = getAllowedFrequencies();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subtaskTitle.trim()) {
      setError("Subtask title is required");
      return;
    }

   
    if (!allowedFrequencies.includes(subtaskFrequency)) {
      setError(`Subtask frequency must be one of: ${allowedFrequencies.join(", ")}`);
      return;
    }

    onAddSubtask(todo.id, {
      title: subtaskTitle.trim(),
      frequency: subtaskFrequency,
    });

    setSubtaskTitle("");
    setSubtaskFrequency("None");
    setShowForm(false);
    setError("");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-5 border border-gray-700">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{todo.title}</h2>
        <span className="px-3 py-1 text-sm rounded-full bg-indigo-600 text-white">
          {todo.frequency}
        </span>
      </div>

      <p className="text-gray-300">{todo.description}</p>

      <div className="flex flex-wrap gap-3">
        <TrackingCheckbox
          tracking={todo.tracking || {}}
          frequency={todo.frequency}
          onToggle={(d) => onToggle(todo.id, d)}
        />
      </div>

      <SubtaskProgress 
        subtasks={todo.subtasks || []} 
        onSubtaskToggle={onSubtaskToggle}
        onEditSubtask={onEditSubtask}
        onDeleteSubtask={onDeleteSubtask}
        mainTaskFrequency={todo.frequency}
      />

      <button
        className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        onClick={() => {
          setShowForm(!showForm);
          setError("");
        }}
      >
        {showForm ? "Cancel" : (
          <>
            <FiPlus size={14} />
            <span>Add Subtask</span>
          </>
        )}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Subtask title"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            className="border border-gray-600 bg-gray-800 px-3 py-2 rounded-lg w-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex flex-wrap gap-4 text-sm">
            {allowedFrequencies.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="subtaskFrequency"
                  value={option}
                  checked={subtaskFrequency === option}
                  onChange={(e) => setSubtaskFrequency(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Add Subtask
          </button>
        </form>
      )}
    </div>
  );
};

export default TodoCarddisplay;