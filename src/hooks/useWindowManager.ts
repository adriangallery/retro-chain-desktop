
import { useState, useCallback } from 'react';
import { WindowData } from '../components/Desktop';

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = useCallback((
    program: string, 
    title: string, 
    content: React.ReactNode,
    customProps?: Partial<WindowData>
  ) => {
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
      ...customProps,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [windows.length, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id 
        ? { ...window, zIndex: nextZIndex }
        : window
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, x, y } : window
    ));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false, zIndex: nextZIndex } : window
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowPosition,
    minimizeWindow,
    restoreWindow,
  };
};
