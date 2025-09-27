/**
 * Custom hook for game generation
 * Handles game generation state and API calls
 */

import { useState } from 'react';
import { GameSchema } from '@/types/game-schema';
import { apiService, GameRequest } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface UseGameGenerationReturn {
  generateGame: (request: GameRequest) => Promise<void>;
  generatedGame: GameSchema | null;
  isGenerating: boolean;
  error: string | null;
  generationStep: string;
  clearError: () => void;
  reset: () => void;
}

export function useGameGeneration(): UseGameGenerationReturn {
  const { toast } = useToast();
  const [generatedGame, setGeneratedGame] = useState<GameSchema | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState<string>('');

  const generateGame = async (request: GameRequest): Promise<void> => {
    setIsGenerating(true);
    setError(null);
    setGeneratedGame(null);
    
    try {
      setGenerationStep('Building prompt...');
      
      setGenerationStep('Generating game with AI...');
      const game = await apiService.generateGame(request);
      
      setGenerationStep('Processing response...');
      setGeneratedGame(game);
      setGenerationStep('');
      
      // Log the generated game to console
      console.log('🎯 Game Generation Complete!');
      console.log('🎯 Generated Game:', game);
      console.log('🎯 Game Type:', game.type);
      console.log('🎯 Game Title:', game.title);
      console.log('🎯 Game Description:', game.description);
      console.log('🎯 Game Content:', game.content);
      
      toast({
        title: "Game Generated Successfully!",
        description: `Created "${game.title}" - ${game.type} game`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setGenerationStep('');
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const reset = () => {
    setGeneratedGame(null);
    setError(null);
    setGenerationStep('');
    setIsGenerating(false);
  };

  return {
    generateGame,
    generatedGame,
    isGenerating,
    error,
    generationStep,
    clearError,
    reset,
  };
}
