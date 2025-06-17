import React, { useState, useEffect } from 'react';

const ClockCard = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    if (is24Hour) {
      return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } else {
      return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Digital Clock</h3>
        <div className="text-2xl">🕐</div>
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-indigo-600 mb-4">
          {formatTime(time)}
        </div>
        
        <button
          onClick={() => setIs24Hour(!is24Hour)}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium"
        >
          {is24Hour ? '12-Hour' : '24-Hour'}
        </button>
      </div>
    </div>
  );
};

export default ClockCard;