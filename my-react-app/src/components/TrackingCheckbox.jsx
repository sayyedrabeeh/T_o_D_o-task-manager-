import { format, parseISO, isToday, isThisWeek, isThisMonth, isBefore } from "date-fns";
import React from "react";

const TrackingCheckbox = ({ tracking = {}, frequency, onToggle, disabledOverride }) => {
  const today = new Date();
  
  
  const getStartDate = () => {
    const trackingDates = Object.keys(tracking);
    if (trackingDates.length === 0) return today;
    
    const dates = trackingDates.map(date => new Date(date));
    return new Date(Math.min(...dates.map(d => d.getTime())));
  };

  const startDate = getStartDate();
  let dates = [];

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

 
  dates.sort((a, b) => a - b);

  const isEditableDate = (dateObj) => {
    if (disabledOverride) return false;
 
    if (dates.length > 0 && dateObj.getTime() === dates[dates.length - 1].getTime()) {
      return true;
    }
    
    return false;
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
      {dates.map((dateObj) => {
        const dateStr = format(dateObj, "yyyy-MM-dd");
        const isChecked = tracking[dateStr] || false;
        const isEditable = isEditableDate(dateObj);
        const isPast = isBefore(dateObj, today) && dateObj.getDate() !== today.getDate();

        const baseClasses = "w-5 h-5 rounded cursor-pointer transition transform duration-200";
        const checkedClass = isChecked ? "bg-green-500 border-green-500" : "bg-transparent border-gray-500";
        const disabledClass = !isEditable ? "cursor-not-allowed opacity-60" : "";

        return (
          <div key={dateStr} className="flex flex-col items-center space-y-1 text-xs text-white">
            <div
              className={`${baseClasses} ${checkedClass} ${disabledClass} border-2 flex items-center justify-center`}
              onClick={() => handleClick(dateStr)}
              title={`${format(dateObj, "MMM dd, yyyy")} - ${isEditable ? "Editable" : "Locked"}`}
            >
              {isChecked ? (
                <span className="text-green-300 font-bold">✓</span>
              ) : !isEditable && isPast ? (
                <span className="text-red-400 font-bold">✗</span>
              ) : (
                <span className="text-gray-400">○</span>
              )}
            </div>
            <span className="text-gray-400">
              {frequency === "Daily" ? format(dateObj, "MM/dd") : 
               frequency === "Weekly" ? `W${Math.ceil(dateObj.getDate() / 7)}` : 
               format(dateObj, "MMM")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingCheckbox;