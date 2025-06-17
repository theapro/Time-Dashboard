import React, { useState, useEffect } from 'react';

const TimeZoneCard = () => {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: 'Tashkent', zone: 'Asia/Tashkent', flag: '🇺🇿' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'New York', zone: 'America/New_York', flag: '🇺🇸' },
    { name: 'London', zone: 'Europe/London', flag: '🇬🇧' }
  ];

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timeZones.forEach(tz => {
        const time = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        
        newTimes[tz.zone] = time;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">World Clock</h3>
        <div className="text-2xl">🌍</div>
      </div>

      <div className="space-y-3">
        {timeZones.map(tz => (
          <div key={tz.zone} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{tz.flag}</span>
              <span className="text-sm font-medium text-gray-700">
                {tz.name}
              </span>
            </div>
            <div className="font-mono text-indigo-600 font-semibold">
              {times[tz.zone] || '--:--:--'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Updated every second
      </div>
    </div>
  );
};

export default TimeZoneCard;