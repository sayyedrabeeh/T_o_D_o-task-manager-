import TrackingCheckbox from "./TrackingCheckbox";

const SubtaskProgress = ({ subtasks, onSubtaskToggle }) => {
  const total = subtasks.length;
  const completed = subtasks.filter((sub) =>
    sub.tracking[new Date().toISOString().split("T")[0]]
  ).length;
  const percent = Math.round((completed / total) * 100) || 0;

  return (
    <div className="mt-3">
      <div className="bg-gray-700 h-2 rounded-full">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-1">Progress: {percent}%</p>

      {subtasks.map((subtask) => (
        <div key={subtask.id} className="mt-3 pl-3 border-l border-gray-700">
          <p className="text-sm font-medium text-gray-300">{subtask.title}</p>
          <TrackingCheckbox
            tracking={subtask.tracking}
            onChange={(date) => onSubtaskToggle(subtask.id, date)}
          />
        </div>
      ))}
    </div>
  );
};

export default SubtaskProgress;
