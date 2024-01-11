import React, { useState, useEffect } from "react";

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div
      className="clock"
      style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div>{currentDateTime.toLocaleTimeString()}</div>
      <div>{currentDateTime.toLocaleDateString()}</div>
    </div>
  );
}

export default DateTime;
