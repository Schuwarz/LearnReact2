import React, { useState, useEffect, useRef } from 'react';
import "./HelloReact.css";

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
    <div id="helloReact__container">
      <h1
        id="helloReact"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayedText}
      </h1>
    </div>
  );
}

export default HelloReact;