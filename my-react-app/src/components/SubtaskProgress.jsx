import React, { useState } from "react";
import TrackingCheckbox from "./TrackingCheckbox";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const SubtaskProgress = ({ subtasks = [], onSubtaskToggle, onDeleteSubtask, onEditSubtask, mainTaskFrequency }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFrequency, setEditFrequency] = useState("");
  
  const today = new Date().toISOString().split("T")[0]; 
  const total = subtasks.length;
  const completed = subtasks.filter((sub) => sub.tracking && sub.tracking[today]).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
 
  const getAllowedFrequencies = () => {
    switch (mainTaskFrequency) {
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

  const handleEditClick = (subtask) => {
    setEditingId(subtask.id);
    setEditTitle(subtask.title);
    setEditFrequency(subtask.frequency || "None");
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    
    onEditSubtask(editingId, {
      title: editTitle.trim(),
      frequency: editFrequency
    });
    
    setEditingId(null);
    setEditTitle("");
    setEditFrequency("");
  };
 
  return (
    <div className="mt-3">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 h-2 rounded-full overflow-hidden border border-gray-700">
        <div
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-1">Progress: {percent}%</p>

      {subtasks.map((subtask) => (
        <div key={subtask.id} className="mt-4 pl-3 border-l-2 border-gray-700">
          {editingId === subtask.id ? (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 rounded-lg mb-2 border border-gray-700 shadow-lg">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-gray-600 bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 rounded-lg w-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2 transition-all duration-300"
              />
              
              <div className="flex flex-wrap gap-4 text-sm mb-3">
                {getAllowedFrequencies().map((option) => (
                  <label key={option} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`frequency-${subtask.id}`}
                      value={option}
                      checked={editFrequency === option}
                      onChange={(e) => setEditFrequency(e.target.value)}
                      className="mr-2 accent-purple-600"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-2 p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-900/50 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-300">{subtask.title}</p>
                <span className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                  {subtask.frequency || "None"}
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditClick(subtask)}
                  className="text-gray-400 hover:text-purple-400 p-1 rounded transition-all duration-300 transform hover:scale-110"
                  title="Edit subtask"
                >
                  <FiEdit2 size={14} />
                </button>
                <button 
                  onClick={() => onDeleteSubtask(subtask.id)}
                  className="text-gray-400 hover:text-red-400 p-1 rounded transition-all duration-300 transform hover:scale-110"
                  title="Delete subtask"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          )}
          
          <TrackingCheckbox
            tracking={subtask.tracking || {}}
            frequency={subtask.frequency || "None"}
            onToggle={(date) => onSubtaskToggle(subtask.id, date)}
          />
        </div>
      ))}
    </div>
  );
};

export default SubtaskProgress;