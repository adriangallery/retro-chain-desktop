
import React, { useState } from 'react';

export const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = ['🍎', 'File', 'Edit', 'View', 'Special', 'Help'];

  return (
    <div className="bg-white border-b-2 border-black h-6 flex items-center justify-between px-2 text-sm font-mono relative z-50">
      <div className="flex items-center space-x-4">
        {menuItems.map((item, index) => (
          <span 
            key={index}
            className="hover:bg-black hover:text-white px-1 cursor-pointer select-none"
          >
            {item}
          </span>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-xs">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
