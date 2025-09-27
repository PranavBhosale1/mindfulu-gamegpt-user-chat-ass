import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Target,
  Gamepad2,
  Heart,
  ArrowLeft,
  Home
} from "lucide-react";

interface InteractiveGamesHeaderProps {
  currentPage?: 'dynamic' | 'landing';
}

export function InteractiveGamesHeader({ currentPage }: InteractiveGamesHeaderProps) {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "AI Game Creator", 
      icon: Gamepad2,
      path: "/dynamic",
      active: currentPage === 'dynamic',
      description: "Create custom wellness games"
    }
  ];

  return (
    <header className="flex items-center justify-between py-6 bg-[var(--bg-cream)] border-b border-gray-200/50">
      <button 
        onClick={() => window.open('http://localhost:8080', '_blank')}
        className="flex items-center gap-3 hover:scale-105 transform transition-all duration-200 hover:bg-white hover:shadow-sm rounded-lg p-2 -m-2"
      >
        <div className="size-10 bg-gradient-to-br from-[var(--brand-purple)] to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <div>
          <h2 className="font-extrabold text-2xl tracking-tight text-[var(--text-dark)] font-poppins hover:text-[var(--brand-purple)] transition-colors duration-200">MindfulU</h2>
          <p className="text-xs text-[var(--text-medium)] -mt-1">Interactive Activities</p>
        </div>
      </button>
      
      <nav className="hidden lg:flex items-center gap-6">
        <button 
          onClick={() => navigate('/dynamic')} 
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)] transition-all duration-200 hover:scale-105 transform hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Game Creator
        </button>
      </nav>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/')} 
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)] transition-all duration-200 hover:scale-105 transform hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </button>
      </div>
    </header>
  );
}
