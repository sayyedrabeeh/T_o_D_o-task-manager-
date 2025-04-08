import { format, parseISO } from "date-fns";

const TrackingCheckbox = ({ tracking, onChange }) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const dates = Object.keys(tracking).sort();

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {dates.map((date) => {
        const isToday = date === today;
        const checked = tracking[date];

        return (
          <label
            key={date}
            className={`flex items-center gap-2 text-sm ${
              isToday ? "text-indigo-400" : "text-gray-400"
            } ${isToday ? "font-medium" : ""}`}
          >
            <input
              type="checkbox"
              disabled={!isToday}
              checked={checked}
              onChange={() => onChange(date)}
              className="rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            {format(parseISO(date), "dd MMM")}
          </label>
        );
      })}
    </div>
  );
};

export default TrackingCheckbox;
