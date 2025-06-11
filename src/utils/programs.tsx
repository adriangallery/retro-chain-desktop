
import React from 'react';
import { WalletConnection } from '../components/WalletConnection';
import { ProgramConfig } from '../types/desktop';

// Calculator Component
const Calculator: React.FC = () => (
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

// Finder Component
const Finder: React.FC = () => (
  <div className="p-4 font-mono text-sm">
    <div>📁 Applications</div>
    <div>📁 Documents</div>
    <div>📁 Desktop</div>
    <div>📁 Downloads</div>
    <div>📁 System</div>
    <div>📁 Users</div>
  </div>
);

// Notepad Component
const Notepad: React.FC = () => (
  <div className="p-4 h-full">
    <textarea 
      className="w-full h-full border-none outline-none resize-none font-mono text-sm bg-white"
      placeholder="Type your notes here..."
    />
  </div>
);

// Program configurations - easily extensible
export const PROGRAMS: ProgramConfig[] = [
  {
    id: 'wallet',
    name: 'Wallet',
    icon: '/icons/wallet.png',
    component: WalletConnection,
    defaultWindow: { width: 400, height: 350 }
  },
  {
    id: 'finder',
    name: 'Finder',
    icon: '/icons/finder.png',
    component: Finder,
    defaultWindow: { width: 300, height: 200 }
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '/icons/calculator.png',
    component: Calculator,
    defaultWindow: { width: 250, height: 300 }
  },
  {
    id: 'notepad',
    name: 'Notepad',
    icon: '/icons/notepad.png',
    component: Notepad,
    defaultWindow: { width: 400, height: 300 }
  }
];

export const getProgramById = (id: string): ProgramConfig | undefined => {
  return PROGRAMS.find(program => program.id === id);
};
