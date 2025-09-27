import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { RecordingProvider } from "./Games/RecordingContext";
import Challenge from "./pages/Challenge";
import Index from "./Games/Index";
import Dynamic from "./pages/Dynamic";
import InteractiveGamesLanding from "./pages/InteractiveGamesLanding";

// Import your existing main app pages
import Emotions from "./pages/Emotions";
import Journal from "./pages/Journal";
import Reports from "./pages/Reports";
import Companion from "./pages/Companion";
import Login from "./pages/Login";
import ChatHome from "./pages/ChatHome";

import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RecordingProvider>
          <Routes>
            {/* Interactive Games Landing Page */}
            <Route path="/" element={<InteractiveGamesLanding />} />
            {/* Login page: visible only to guest */}
           
            {/* All main features protected for users only */}
            {/* <Route path="/index" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } /> */}
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/emotions" element={
              <ProtectedRoute>
                <Emotions />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/companion" element={
              <ProtectedRoute>
                <Companion />
              </ProtectedRoute>
            } />
            <Route path="/dynamic" element={<Dynamic />} />
            {/* 404 Handler */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RecordingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
