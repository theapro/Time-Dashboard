import React, { useState, useEffect, useRef } from 'react';

const StopwatchCard = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (centiseconds) => {
    const hours = Math.floor(centiseconds / 360000);
    const minutes = Math.floor((centiseconds % 360000) / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Stopwatch</h3>
        <div className="text-2xl">⏱️</div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-indigo-600 mb-6">
          {formatTime(time)}
        </div>

        <div className="flex justify-center space-x-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium"
            >
              Pause
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Precision: Centiseconds
        </div>
      </div>
    </div>
  );
};

export default StopwatchCard;