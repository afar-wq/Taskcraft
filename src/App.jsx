import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Board from './features/kanban/Board';
import Button from './components/ui/Button';


function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 flex flex-col">
      {/* Barre de navigation / Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">TaskCraft</h1>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Mon Espace de Travail
        </div>
      </header>

      {/* Zone principale contenant le tableau Kanban */}
      <main className="flex-1 overflow-hidden">
        <Board />
      </main>
    </div>
  );
}

export default App
