
import React from 'react';
import { IconData } from './Desktop';

interface DesktopIconProps {
  icon: IconData;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  isSelected,
  onSelect,
  onDoubleClick,
}) => {
  return (
    <div
      className={`absolute cursor-pointer select-none flex flex-col items-center p-1 ${
        isSelected ? 'bg-blue-500 bg-opacity-50' : ''
      }`}
      style={{
        left: icon.x,
        top: icon.y,
        width: 64,
        height: 80,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={onDoubleClick}
    >
      <div className="w-8 h-8 bg-gray-200 border border-black mb-1 flex items-center justify-center">
        {/* Placeholder for icon image */}
        <div className="w-6 h-6 bg-gray-400" style={{ imageRendering: 'pixelated' }}>
          {icon.name === 'Wallet' && '💰'}
          {icon.name === 'Finder' && '📁'}
          {icon.name === 'Calculator' && '🔢'}
          {icon.name === 'Notepad' && '📝'}
          {icon.name === 'Trash' && '🗑️'}
        </div>
      </div>
      <span 
        className={`text-xs font-mono text-center leading-tight ${
          isSelected ? 'text-white' : 'text-black'
        }`}
        style={{ 
          textShadow: isSelected ? 'none' : '1px 1px 0px white',
          wordWrap: 'break-word',
          maxWidth: '100%'
        }}
      >
        {icon.name}
      </span>
    </div>
  );
};
