import React, { useState, useEffect } from 'react';

const QuoteCard = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb"
    },
    {
      text: "Time is what we want most but what we use worst.",
      author: "William Penn"
    },
    {
      text: "Yesterday is history, tomorrow is a mystery, today is a gift, which is why we call it the present.",
      author: "Bill Keane"
    },
    {
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi"
    },
    {
      text: "Time flies over us, but leaves its shadow behind.",
      author: "Nathaniel Hawthorne"
    },
    {
      text: "Don't spend time beating on a wall, hoping to transform it into a door.",
      author: "Coco Chanel"
    },
    {
      text: "The way we spend our time defines who we are.",
      author: "Jonathan Estrin"
    },
    {
      text: "Time is the most valuable thing we have and the most likely to be wasted.",
      author: "Benjamin Franklin"
    },
    {
      text: "إن مع العسر يسرا (With hardship comes ease)",
      author: "Quran 94:6"
    },
    {
      text: "الوقت كالسيف إن لم تقطعه قطعك (Time is like a sword, if you don't cut it, it will cut you)",
      author: "Arabic Proverb"
    }
  ];

  useEffect(() => {
    setCurrentQuote(quotes[0]);
  }, []);

  const getRandomQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === quoteIndex && quotes.length > 1);
    
    setQuoteIndex(newIndex);
    setCurrentQuote(quotes[newIndex]);
  };

  const getNextQuote = () => {
    const newIndex = (quoteIndex + 1) % quotes.length;
    setQuoteIndex(newIndex);
    setCurrentQuote(quotes[newIndex]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Daily Inspiration</h3>
        <div className="text-2xl">📜</div>
      </div>

      {currentQuote && (
        <div className="text-center">
          <div className="text-2xl text-gray-300 mb-4">"</div>
          <blockquote className="text-lg text-gray-700 leading-relaxed mb-4 italic">
            {currentQuote.text}
          </blockquote>
          <cite className="text-indigo-600 font-medium">
            — {currentQuote.author}
          </cite>
        </div>
      )}

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={getRandomQuote}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium"
        >
          Random Quote
        </button>
        <button
          onClick={getNextQuote}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
        >
          Next Quote
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        Quote {quoteIndex + 1} of {quotes.length}
      </div>
    </div>
  );
};

export default QuoteCard;