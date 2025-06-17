import React, { useState, useEffect } from 'react';

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(selectedMonth);
  const today = currentDate.getDate();
  const isCurrentMonth = selectedMonth.getMonth() === currentDate.getMonth() && 
                        selectedMonth.getFullYear() === currentDate.getFullYear();

  const navigateMonth = (direction) => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(selectedMonth.getMonth() + direction);
    setSelectedMonth(newMonth);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Calendar</h3>
        <div className="text-2xl">📅</div>
      </div>

      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <span className="font-semibold">
          {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
        </span>
        <button
          onClick={() => navigateMonth(1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {dayNames.map(day => (
          <div key={day} className="text-center font-semibold text-gray-500 p-1">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`text-center p-1 ${
              day && isCurrentMonth && day === today
                ? 'bg-indigo-500 text-white rounded-full'
                : day
                ? 'hover:bg-gray-100 rounded cursor-pointer'
                : ''
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCard;