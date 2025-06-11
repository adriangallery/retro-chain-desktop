
import React, { useState, useRef } from 'react';
import { WindowData } from './Desktop';

interface WindowProps {
  window: WindowData;
  onClose: () => void;
  onFocus: () => void;
  onUpdatePosition: (id: string, x: number, y: number) => void;
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
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('title-bar')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.x,
        y: e.clientY - window.y,
      });
      onFocus();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - window.width, e.clientX - dragOffset.x));
      const newY = Math.max(24, Math.min(window.innerHeight - window.height, e.clientY - dragOffset.y));
      onUpdatePosition(window.id, newX, newY);
    }
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

  return (
    <div
      ref={windowRef}
      className="absolute bg-white border-2 border-black shadow-lg select-none"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        imageRendering: 'pixelated',
      }}
      onMouseDown={handleMouseDown}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div className="title-bar bg-gray-200 border-b border-black h-6 flex items-center justify-between px-2 cursor-move">
        <div className="flex items-center space-x-1">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-white border border-black hover:bg-gray-300 text-xs leading-none"
          >
            ×
          </button>
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-white border border-black hover:bg-gray-300 text-xs leading-none"
          >
            -
          </button>
        </div>
        
        <span className="text-xs font-mono flex-1 text-center">{window.title}</span>
        
        <div className="w-8"></div>
      </div>

      {/* Window Content */}
      <div className="h-full pb-6 overflow-hidden">
        {window.content}
      </div>

      {/* Resize Handle */}
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 border-l border-t border-black cursor-nw-resize">
        <div className="w-full h-full bg-gradient-to-br from-white to-gray-400"></div>
      </div>
    </div>
  );
};
