import React, { useState, useEffect, useRef } from 'react';

function HelloReact() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
  const targetText = "REACT";
  const [displayedText, setDisplayedText] = useState(targetText);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= targetText.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayedText(targetText);
      }
    }, 30);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDisplayedText(targetText);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='flex justify-center items-center p-5'>
      <h1
        className='font-mono uppercase cursor-pointer px-10 py-5 m-0 rounded-lg transition-all duration-300 
        text-4xl sm:text-6xl lg:text-7xl 
        text-gray-900 dark:text-gray-100 
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700 
        shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]
        hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayedText}
      </h1>
    </div>
  );
}

export default HelloReact;