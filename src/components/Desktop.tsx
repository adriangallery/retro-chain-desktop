
import React, { useState } from 'react';
import { MenuBar } from './MenuBar';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { WalletConnection } from './WalletConnection';

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

export interface IconData {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  program?: string;
}

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  // Sample desktop icons - easily customizable
  const desktopIcons: IconData[] = [
    { id: 'wallet', name: 'Wallet', icon: '/icons/wallet.png', x: 20, y: 80, program: 'wallet' },
    { id: 'finder', name: 'Finder', icon: '/icons/finder.png', x: 20, y: 160, program: 'finder' },
    { id: 'calculator', name: 'Calculator', icon: '/icons/calculator.png', x: 20, y: 240, program: 'calculator' },
    { id: 'notepad', name: 'Notepad', icon: '/icons/notepad.png', x: 20, y: 320, program: 'notepad' },
  ];

  const openWindow = (program: string, title: string, content: React.ReactNode) => {
    const newWindow: WindowData = {
      id: `${program}-${Date.now()}`,
      title,
      content,
      x: 100 + (windows.length * 30),
      y: 100 + (windows.length * 30),
      width: 400,
      height: 300,
      zIndex: nextZIndex,
      isMinimized: false,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id 
        ? { ...window, zIndex: nextZIndex }
        : window
    ));
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, x, y } : window
    ));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const handleIconDoubleClick = (icon: IconData) => {
    switch (icon.program) {
      case 'wallet':
        openWindow('wallet', 'Crypto Wallet', <WalletConnection />);
        break;
      case 'finder':
        openWindow('finder', 'Finder', 
          <div className="p-4 font-mono text-sm">
            <div>📁 Applications</div>
            <div>📁 Documents</div>
            <div>📁 Desktop</div>
            <div>📁 Downloads</div>
          </div>
        );
        break;
      case 'calculator':
        openWindow('calculator', 'Calculator', 
          <div className="p-4 text-center">
            <div className="bg-black text-green-400 p-2 mb-2 font-mono">0</div>
            <div className="grid grid-cols-4 gap-1">
              {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '0', '.', '='].map((btn, i) => (
                <button key={i} className="bg-gray-300 hover:bg-gray-400 p-2 text-sm border border-gray-500">
                  {btn}
                </button>
              ))}
            </div>
          </div>
        );
        break;
      case 'notepad':
        openWindow('notepad', 'Notepad', 
          <div className="p-4 h-full">
            <textarea 
              className="w-full h-full border-none outline-none resize-none font-mono text-sm bg-white"
              placeholder="Type your notes here..."
            />
          </div>
        );
        break;
      default:
        openWindow('default', icon.name, <div className="p-4">Coming soon...</div>);
    }
  };

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ 
        backgroundImage: "url('/desk.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: 'pixelated'
      }}
      onClick={() => setSelectedIcon(null)}
    >
      <MenuBar />
      
      {/* Desktop Icons */}
      {desktopIcons.map(icon => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          isSelected={selectedIcon === icon.id}
          onSelect={() => setSelectedIcon(icon.id)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
        />
      ))}

      {/* Windows */}
      {windows.filter(w => !w.isMinimized).map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onUpdatePosition={updateWindowPosition}
          onMinimize={() => minimizeWindow(window.id)}
        />
      ))}

      {/* Trash Can */}
      <div className="absolute bottom-4 right-4">
        <DesktopIcon
          icon={{ id: 'trash', name: 'Trash', icon: '/icons/trash.png', x: 0, y: 0 }}
          isSelected={false}
          onSelect={() => {}}
          onDoubleClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Desktop;
