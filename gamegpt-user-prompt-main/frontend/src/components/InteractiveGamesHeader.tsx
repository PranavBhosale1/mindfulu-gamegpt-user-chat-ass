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
  currentPage?: 'challenge' | 'dynamic' | 'landing';
}

export function InteractiveGamesHeader({ currentPage }: InteractiveGamesHeaderProps) {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Challenge Games",
      icon: Target,
      path: "/challenge",
      active: currentPage === 'challenge',
      description: "Interactive behavioral challenges"
    },
    {
      title: "AI Game Creator", 
      icon: Gamepad2,
      path: "/dynamic",
      active: currentPage === 'dynamic',
      description: "Create custom wellness games"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left section - Logo and Back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Button>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">
                Interactive Activities
              </h1>
              <p className="text-xs text-muted-foreground">Wellness Games Hub</p>
            </div>
          </div>
        </div>

        {/* Center section - Navigation */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={item.active ? "default" : "ghost"}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                item.active 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md" 
                  : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Right section - Home button */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
