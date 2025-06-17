import React, { useState, useEffect } from 'react';

const DayStatusCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState({ message: '', icon: '', color: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      updateGreeting(now);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const updateGreeting = (date) => {
    const hour = date.getHours();
    
    if (hour >= 6 && hour < 12) {
      setGreeting({
        message: 'Good Morning!',
        icon: '☀️',
        color: 'from-yellow-400 to-orange-500',
        textColor: 'text-yellow-800'
      });
    } else if (hour >= 12 && hour < 18) {
      setGreeting({
        message: 'Good Afternoon!',
        icon: '🌞',
        color: 'from-blue-400 to-cyan-500',
        textColor: 'text-blue-800'
      });
    } else if (hour >= 18 && hour < 22) {
      setGreeting({
        message: 'Good Evening!',
        icon: '🌅',
        color: 'from-orange-400 to-pink-500',
        textColor: 'text-orange-800'
      });
    } else {
      setGreeting({
        message: 'Good Night!',
        icon: '🌙',
        color: 'from-indigo-400 to-purple-600',
        textColor: 'text-indigo-100'
      });
    }
  };

  const getTimePhase = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 18) return 'Afternoon';
    if (hour >= 18 && hour < 22) return 'Evening';
    return 'Night';
  };

  const getMotivationalMessage = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) {
      return "Start your day with purpose and energy!";
    } else if (hour >= 12 && hour < 18) {
      return "Keep up the great work!";
    } else if (hour >= 18 && hour < 22) {
      return "Time to relax and reflect on your day.";
    } else {
      return "Rest well and dream sweetly.";
    }
  };

  return (
    <div className={`bg-gradient-to-br ${greeting.color} rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-all duration-300 text-white`}>
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">
          {greeting.icon}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          {greeting.message}
        </h2>
        
        <div className="text-lg opacity-90 mb-4">
          {currentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-sm font-medium">
            {getMotivationalMessage()}
          </p>
        </div>
        
        <div className="mt-4 text-xs opacity-75">
          {getTimePhase()} Time • {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

export default DayStatusCard;