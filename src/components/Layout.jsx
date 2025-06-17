import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Clock, 
  Calendar, 
  CloudSun, 
  RefreshCw, 
  Globe, 
  Timer, 
  Quote, 
  Shuffle, 
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Play,
  Pause,
  Square,
  MapPin,
  Wind,
  Thermometer,
  Heart,
  BookOpen,
  Coffee,
  Star,
  Music2,
  Briefcase,
  Smile,
  BatteryCharging
} from 'lucide-react';

const UnifiedDashboard = () => {
  // DARK MODE & TIME
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // CLOCK CARD
  const [is24Hour, setIs24Hour] = useState(true);
  const formatClockTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour12: !is24Hour ? true : false,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

  // CALENDAR CARD
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = getDaysInMonth(selectedMonth);
  const today = currentTime.getDate();
  const isCurrentMonth =
    selectedMonth.getMonth() === currentTime.getMonth() &&
    selectedMonth.getFullYear() === currentTime.getFullYear();

  // WEATHER CARD
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
  
  const getLocationAndWeather = () => {
    setWeatherLoading(true); setWeatherError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
        () => {
          setWeatherError('Location access denied.');
          fetchWeather(41.2995, 69.2401);
        }
      );
    } else {
      setWeatherError('Geolocation not supported.');
      fetchWeather(41.2995, 69.2401);
    }
  };
  
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Weather data not available');
      setWeather(await response.json());
    } catch {
      setWeatherError('Failed to fetch weather');
      setWeather({
        name: 'Tashkent',
        main: { temp: 25, feels_like: 27 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 }
      });
    } finally {
      setWeatherLoading(false);
    }
  };
  useEffect(getLocationAndWeather, []);

  // TIMEZONE CARD
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
        newTimes[tz.zone] = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.zone,
          hour: '2-digit', minute: '2-digit', hour12: false
        }).format(new Date());
      });
      setTimes(newTimes);
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  // STOPWATCH CARD
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const stopwatchIntervalRef = useRef(null);
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchIntervalRef.current = setInterval(
        () => setStopwatchTime(prev => prev + 10), 10
      );
    } else clearInterval(stopwatchIntervalRef.current);
    return () => clearInterval(stopwatchIntervalRef.current);
  }, [isStopwatchRunning]);
  const formatStopwatch = (cs) => {
    const hours = Math.floor(cs / 360000);
    const minutes = Math.floor((cs % 360000) / 6000);
    const seconds = Math.floor((cs % 6000) / 100);
    const c = cs % 100;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${c
      .toString().padStart(2, '0')}`;
  };

  // QUOTE CARD
  const quotes = [
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Time is what we want most but what we use worst.", author: "William Penn" },
    { text: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Bill Keane" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Time flies over us, but leaves its shadow behind.", author: "Nathaniel Hawthorne" },
    { text: "Don't spend time beating on a wall, hoping to transform it into a door.", author: "Coco Chanel" }
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = quotes[quoteIndex];
  const getRandomQuote = () => {
    let newIndex;
    do { newIndex = Math.floor(Math.random() * quotes.length); }
    while (newIndex === quoteIndex && quotes.length > 1);
    setQuoteIndex(newIndex);
  };
  const getNextQuote = () => setQuoteIndex((quoteIndex + 1) % quotes.length);

  // DAY STATUS CARD
  const [greeting, setGreeting] = useState({ message: '', icon: Sun });
  useEffect(() => {
    const updateGreeting = (date) => {
      const hour = date.getHours();
      if (hour >= 6 && hour < 12)
        setGreeting({ message: 'Good Morning', icon: Sun });
      else if (hour >= 12 && hour < 18)
        setGreeting({ message: 'Good Afternoon', icon: Sun });
      else if (hour >= 18 && hour < 22)
        setGreeting({ message: 'Good Evening', icon: Moon });
      else
        setGreeting({ message: 'Good Night', icon: Moon });
    };
    updateGreeting(currentTime);
  }, [currentTime]);

  // ELEGANT BORDER CARD CLASS
  const getCardClass = () => {
    if (darkMode) {
      return "bg-gray-900 text-white rounded-3xl p-6 transition-all duration-300 h-full flex flex-col " +
        "border-2 border-gray-700 hover:border-gray-500 backdrop-blur-sm";
    } else {
      return "bg-white text-black rounded-3xl p-6 transition-all duration-300 h-full flex flex-col " +
        "border-2 border-gray-200 hover:border-gray-300 backdrop-blur-sm";
    }
  };

  const getButtonClass = () => {
    if (darkMode) {
      return "rounded-2xl transition-all duration-200 bg-gray-800 text-gray-300 " +
        "border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 " +
        "active:bg-gray-900 active:border-gray-400";
    } else {
      return "rounded-2xl transition-all duration-200 bg-gray-50 text-black " +
        "border-2 border-gray-200 hover:border-gray-300 hover:bg-white " +
        "active:bg-gray-100 active:border-gray-400";
    }
  };

  // --- EXTRA 4 CARDS ---
  // 1. Motivation Card
  const motivationList = [
    { icon: <Heart className="w-6 h-6 text-red-500" />, text: "Spread love and kindness today!" },
    { icon: <Star className="w-6 h-6 text-yellow-400" />, text: "Shine bright like a star!" },
    { icon: <Smile className="w-6 h-6 text-blue-400" />, text: "Smile, it's contagious!" },
    { icon: <Coffee className="w-6 h-6 text-brown-500" />, text: "Take a coffee break and recharge." }
  ];
  const [motivationIdx, setMotivationIdx] = useState(0);

  // 2. Book Recommendation Card
  const books = [
    { title: "Atomic Habits", author: "James Clear" },
    { title: "Deep Work", author: "Cal Newport" },
    { title: "The Alchemist", author: "Paulo Coelho" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt" }
  ];
  const [bookIdx, setBookIdx] = useState(0);

  // 3. Music Suggestion Card
  const musics = [
    { song: "Lofi Hip Hop", artist: "ChilledCow" },
    { song: "River Flows In You", artist: "Yiruma" },
    { song: "Shape of You", artist: "Ed Sheeran" },
    { song: "Blinding Lights", artist: "The Weeknd" }
  ];
  const [musicIdx, setMusicIdx] = useState(0);

  // 4. Productivity Tip Card
  const tips = [
    "Take regular breaks to boost focus.",
    "Prioritize your tasks with a to-do list.",
    "Start your day with the hardest task.",
    "Keep your workspace organized."
  ];
  const [tipIdx, setTipIdx] = useState(0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    } p-6`}>
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Day Status Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Day Status</h3>
            <greeting.icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-3`}>
              {greeting.message}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
            <div className="text-xs text-gray-500">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Clock Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Clock</h3>
            <Clock className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className={`text-3xl font-mono font-bold ${darkMode ? 'text-white' : 'text-black'} mb-6`}>
              {formatClockTime(currentTime)}
            </div>
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className={`${getButtonClass()} px-4 py-2 text-sm font-medium`}
            >
              {is24Hour ? '12H Format' : '24H Format'}
            </button>
          </div>
        </div>

        {/* Calendar Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Calendar</h3>
            <Calendar className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}
                className={`${getButtonClass()} p-2`}
              >
                <ChevronLeft className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>
                {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
              </span>
              <button 
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}
                className={`${getButtonClass()} p-2`}
              >
                <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-gray-500 p-2">{day}</div>
              ))}
              {calendarDays.slice(0, 21).map((day, idx) => (
                <div key={idx} className={`text-center p-2 ${
                  day && isCurrentMonth && day === today
                    ? darkMode 
                      ? 'bg-white text-gray-900 rounded-xl font-bold border border-gray-300'
                      : 'bg-black text-white rounded-xl font-bold border border-gray-700'
                    : day 
                      ? darkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:border-gray-600 rounded-xl cursor-pointer transition-all border border-transparent'
                        : 'text-black hover:bg-gray-100 hover:border-gray-300 rounded-xl cursor-pointer transition-all border border-transparent'
                      : ''
                }`}>
                  {day || ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Weather</h3>
            <div className="flex items-center gap-2">
              <CloudSun className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <button onClick={getLocationAndWeather} className={`${getButtonClass()} p-2`}>
                <RefreshCw className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {weatherLoading ? (
              <div className="text-center">
                <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
                  darkMode ? 'border-white' : 'border-black'
                } mx-auto mb-3`}></div>
                <p className="text-xs text-gray-500">Loading...</p>
              </div>
            ) : weather ? (
              <div className="text-center">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} capitalize mb-3`}>
                  {weather.weather[0].description}
                </div>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {weather.name}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Thermometer className="w-3 h-3" />
                    Feels {Math.round(weather.main.feels_like)}°C
                  </div>
                  {weather.wind && (
                    <div className="flex items-center justify-center gap-2">
                      <Wind className="w-3 h-3" />
                      {weather.wind.speed} m/s
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-3">{weatherError}</p>
                <button onClick={getLocationAndWeather} 
                  className={`${getButtonClass()} px-4 py-2 text-xs`}>
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* World Clock Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>World Clock</h3>
            <Globe className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 space-y-3">
            {timeZones.map(tz => (
              <div key={tz.zone} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{tz.flag}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>{tz.name}</span>
                </div>
                <div className={`font-mono text-sm font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  {times[tz.zone] || '--:--'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stopwatch Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Stopwatch</h3>
            <Timer className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className={`text-2xl font-mono font-bold ${darkMode ? 'text-white' : 'text-black'} mb-6`}>
              {formatStopwatch(stopwatchTime)}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                className={`${getButtonClass()} p-3`}
              >
                {isStopwatchRunning ? 
                  <Pause className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-black'}`} /> : 
                  <Play className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-black'}`} />
                }
              </button>
              <button
                onClick={() => { setIsStopwatchRunning(false); setStopwatchTime(0); }}
                className={`${getButtonClass()} p-3`}
              >
                <Square className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-black'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Quote Card */}
        <div className={`${getCardClass()} md:col-span-2`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Daily Quote</h3>
            <Quote className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <blockquote className={`text-lg ${darkMode ? 'text-gray-300' : 'text-black'} italic mb-4 leading-relaxed font-medium`}>
              "{currentQuote.text}"
            </blockquote>
            <cite className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold mb-6`}>
              — {currentQuote.author}
            </cite>
            <div className="flex justify-center gap-3">
              <button
                onClick={getRandomQuote}
                className={`${getButtonClass()} flex items-center gap-2 px-4 py-2 text-sm font-medium`}
              >
                <Shuffle className="w-4 h-4" />
                Random
              </button>
              <button
                onClick={getNextQuote}
                className={`${getButtonClass()} flex items-center gap-2 px-4 py-2 text-sm font-medium`}
              >
                <ChevronRight className="w-4 h-4" />
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Motivation Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Motivation</h3>
            <Smile className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className="flex justify-center mb-3">
              {motivationList[motivationIdx].icon}
            </div>
            <div className={`text-md font-semibold ${darkMode ? 'text-gray-300' : 'text-black'} mb-4`}>
              {motivationList[motivationIdx].text}
            </div>
            <button
              onClick={() => setMotivationIdx((motivationIdx + 1) % motivationList.length)}
              className={`${getButtonClass()} px-4 py-2 text-xs font-medium`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Book Recommendation Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Book of the Day</h3>
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
              {books[bookIdx].title}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-5`}>
              by {books[bookIdx].author}
            </div>
            <button
              onClick={() => setBookIdx((bookIdx + 1) % books.length)}
              className={`${getButtonClass()} px-4 py-2 text-xs font-medium`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Music Suggestion Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Music Suggestion</h3>
            <Music2 className="w-5 h-5 text-pink-500" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-2`}>
              {musics[musicIdx].song}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-5`}>
              {musics[musicIdx].artist}
            </div>
            <button
              onClick={() => setMusicIdx((musicIdx + 1) % musics.length)}
              className={`${getButtonClass()} px-4 py-2 text-xs font-medium`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Productivity Tip Card */}
        <div className={getCardClass()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>Productivity Tip</h3>
            <Briefcase className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className={`text-md font-semibold ${darkMode ? 'text-gray-300' : 'text-black'} mb-4`}>
              {tips[tipIdx]}
            </div>
            <button
              onClick={() => setTipIdx((tipIdx + 1) % tips.length)}
              className={`${getButtonClass()} px-4 py-2 text-xs font-medium`}
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 ${getButtonClass()}`}
      >
        {darkMode ? 
          <Sun className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-black'}`} /> : 
          <Moon className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-black'}`} />
        }
      </button>
    </div>
  );
};

export default UnifiedDashboard;