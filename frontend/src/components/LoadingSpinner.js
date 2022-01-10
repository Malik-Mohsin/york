import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 animate-bounce h-52">
      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
