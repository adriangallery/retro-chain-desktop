
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

export interface ProgramConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  defaultWindow?: Partial<WindowData>;
}
