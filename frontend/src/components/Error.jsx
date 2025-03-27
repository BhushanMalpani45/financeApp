import React from 'react';

const Error = ({ message }) => {
  if (!message) return null; // Don't render if no message provided

  return (
    <div style={{
      color: "white",
      backgroundColor: "red",
      padding: "10px",
      borderRadius: "5px",
      textAlign: "center",
      margin: "10px 0",
      fontWeight: "bold"
    }}>
      ⚠️ Error: {message}
    </div>
  );
};

export default Error;
