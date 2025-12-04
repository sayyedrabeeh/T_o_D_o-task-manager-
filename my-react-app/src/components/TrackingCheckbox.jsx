import { format, parseISO, isToday, isThisWeek, isThisMonth, isBefore } from "date-fns";
import React from "react";

const TrackingCheckbox = ({ tracking = {}, frequency, onToggle, disabledOverride }) => {
  const today = new Date();
  
  
if (frequency === "None") {
  return <div className="text-gray-400 text-sm">No tracking for this task</div>;
}

  const getStartDate = () => {
    const trackingDates = Object.keys(tracking);
    if (trackingDates.length === 0) return today;
    
    const dates = trackingDates.map(date => new Date(date));
    return new Date(Math.min(...dates.map(d => d.getTime())));
  };

  const startDate = getStartDate();
  let dates = [];
  if (tracking && Object.keys(tracking).length === 0) {
  
    dates = [today];
  } else {

    if (frequency === "Daily") {
     
      let currentDate = new Date(startDate);
      while (currentDate <= today) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (frequency === "Weekly") {
      let currentDate = new Date(startDate);
      const dayOfWeek = currentDate.getDay();
      currentDate.setDate(currentDate.getDate() - dayOfWeek);
    
      while (currentDate <= today) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
      }
    } else if (frequency === "Monthly") {
 
      let currentDate = new Date(startDate);
 
      currentDate.setDate(1);
    
      while (currentDate <= today) {
        dates.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
  }
 
  dates.sort((a, b) => a - b);

  const isEditableDate = (d) => {
  if (disabledOverride) return false;
  if (dates.length === 0) return false;

  const last = dates[dates.length - 1];

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return isSameDay(d, last);
};

  
  const handleClick = (dateStr) => {
    if (!isEditableDate(new Date(dateStr))) return;
    onToggle(dateStr);
  };

   
  if (dates.length === 0) {
    return <div className="text-gray-400 text-sm">No tracking dates available</div>;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {dates.map((dateObj, index) => {
        const dateStr = format(dateObj, "yyyy-MM-dd");
        const isChecked = tracking[dateStr] || false;
        const isEditable = isEditableDate(dateObj);
        const isPast = isBefore(dateObj, today) && dateObj.getDate() !== today.getDate();
  const label = frequency === "Daily"
    ? format(dateObj, "MM/dd")
    : frequency === "Weekly"
      ? `W${index + 1}`
      : format(dateObj, "MMM");
        return (
          <div key={dateStr} className="flex flex-col items-center space-y-1 text-xs text-white">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                isChecked 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-500 shadow-lg shadow-green-500/30" 
                  : isEditable 
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 cursor-pointer hover:border-purple-500" 
                    : "bg-gradient-to-r from-gray-900 to-black border-gray-700 cursor-not-allowed opacity-60"
              }`}
              onClick={() => handleClick(dateStr)}
              title={`${format(dateObj, "MMM dd, yyyy")} - ${isEditable ? "Editable" : "Locked"}`}
            >
              {isChecked ? (
                <span className="text-white font-bold">✓</span>
              ) : !isEditable && isPast ? (
                <span className="text-red-400 font-bold">✗</span>
              ) : (
                <span className="text-gray-500">○</span>
              )}
            </div>
           <span className="text-gray-400 text-xs">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingCheckbox;