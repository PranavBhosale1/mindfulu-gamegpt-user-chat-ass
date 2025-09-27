import { ReactNode } from "react";
import { InteractiveGamesHeader } from "@/components/InteractiveGamesHeader";

interface InteractiveGamesLayoutProps {
  children: ReactNode;
  currentPage?: 'challenge' | 'dynamic' | 'landing';
}

export function InteractiveGamesLayout({ children, currentPage }: InteractiveGamesLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <InteractiveGamesHeader currentPage={currentPage} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
