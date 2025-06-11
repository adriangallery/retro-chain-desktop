
import React, { useState, useRef } from 'react';
import { WindowData } from '../types/desktop';

interface WindowProps {
  window: WindowData;
  onClose: () => void;
  onFocus: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onMinimize: () => void;
}

export const Window: React.FC<WindowProps> = ({
  window,
  onClose,
  onFocus,
  onUpdatePosition,
  onMinimize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    });
    onFocus();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, globalThis.innerWidth - window.width));
    const newY = Math.max(24, Math.min(e.clientY - dragOffset.y, globalThis.innerHeight - window.height));
    
    onUpdatePosition(newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (window.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="absolute bg-white border-2 border-black shadow-lg"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => onFocus()}
    >
      {/* Title bar */}
      <div
        className="bg-gray-200 border-b border-black h-6 flex items-center justify-between px-2 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-mono">{window.title}</span>
        <div className="window-controls flex space-x-1">
          <button
            onClick={onMinimize}
            className="w-4 h-4 bg-yellow-400 border border-black hover:bg-yellow-500"
          >
            <span className="text-xs">-</span>
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-red-400 border border-black hover:bg-red-500"
          >
            <span className="text-xs">×</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-auto">
        {window.content}
      </div>
    </div>
  );
};
