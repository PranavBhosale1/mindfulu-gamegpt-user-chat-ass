import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { InteractiveGamesLayout } from '@/components/InteractiveGamesLayout';
import { GameSchema } from '@/types/game-schema';
import { useGameGeneration } from '@/hooks/useGameGeneration';
import { GameRequest } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Lazy load the DynamicGameRenderer only when needed
const DynamicGameRenderer = lazy(() => import('@/components/games/DynamicGameRenderer'));
import { 
  Loader2, 
  Wand2, 
  Clock, 
  Target, 
  Users, 
  BookOpen,
  Gamepad2,
  ArrowLeft,
  Download,
  Share2,
  RefreshCw,
  Brain,
  Heart,
  Settings,
  Sparkles
} from 'lucide-react';

export default function Dynamic() {
  const { toast } = useToast();
  
  const [gameRequest, setGameRequest] = useState<GameRequest>({
    description: '',
    difficulty: 'medium',
    targetAge: '',
    estimatedTime: 10,
    learningObjectives: '',
    theme: '',
    customRequirements: ''
  });

  const {
    generateGame,
    generatedGame,
    isGenerating,
    error,
    generationStep,
    clearError,
    reset
  } = useGameGeneration();

  // Log when a new game is generated
  useEffect(() => {
    if (generatedGame) {
      console.log('🎉 New game received in Dynamic component!');
      console.log('🎉 Game ID:', generatedGame.id);
      console.log('🎉 Game Title:', generatedGame.title);
      console.log('🎉 Full Game Object:', generatedGame);
    }
  }, [generatedGame]);

const gameTypes = [
    { value: 'quiz', label: 'Quiz', description: 'Multiple choice and knowledge testing' },
    { value: 'drag-drop', label: 'Drag & Drop', description: 'Interactive sorting and categorization' },
    { value: 'memory-match', label: 'Memory Match', description: 'Memory and matching challenges' },
    { value: 'word-puzzle', label: 'Word Puzzle', description: 'Crosswords and word games' },
    { value: 'sorting', label: 'Sorting', description: 'Categorize and organize items' },
    { value: 'matching', label: 'Matching', description: 'Connect related concepts' },
    { value: 'story-sequence', label: 'Story Sequence', description: 'Order events and narratives' },
    { value: 'fill-blank', label: 'Fill Blanks', description: 'Complete sentences and paragraphs' },
    { value: 'card-flip', label: 'Card Flip', description: 'Flip cards to learn concepts' },
    { value: 'puzzle-assembly', label: 'Puzzle', description: 'Assemble pieces to complete images' },
    { value: 'anxiety-adventure', label: 'Anxiety Adventure', description: 'Branching choices through anxiety scenarios' }
  ];

  const suggestions = [
    "A quiz about recognizing and managing stress for teens",
    "A memory matching game for positive affirmations and coping skills",
    "A drag and drop game about identifying emotions and healthy responses",
    "A word puzzle featuring mindfulness and self-care vocabulary",
    "A sorting game for distinguishing helpful and unhelpful thoughts",
    "A story sequence game about steps in a calming breathing exercise",
    "A matching game for common triggers and healthy coping strategies",
    "An anxiety adventure with branching choices teaching coping skills",
    "A memory matching game for time management for ADHD people"
  ];

  const handleGenerate = async () => {
    if (!gameRequest.description.trim()) {
      return;
    }
    
    console.log('🚀 Starting game generation with request:', gameRequest);
    await generateGame(gameRequest);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setGameRequest(prev => ({ ...prev, description: suggestion }));
  };

  const handleDownload = () => {
    if (generatedGame) {
      const blob = new Blob([JSON.stringify(generatedGame, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedGame.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Game Downloaded!",
        description: "Your game has been saved to your device."
      });
    }
  };

  const handleShare = async () => {
    if (generatedGame && navigator.share) {
      try {
        await navigator.share({
          title: generatedGame.title,
          text: generatedGame.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  const handleRegenerate = () => {
    reset();
  };

  if (generatedGame) {
    return (
      <InteractiveGamesLayout currentPage="dynamic">
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-cream)]">
          <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <main className="relative mt-8">
              <section className="py-8">
                {/* Header with actions */}
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[var(--text-medium)] hover:text-[var(--text-dark)] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Generator
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-[var(--text-dark)] shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    
                    {navigator.share && (
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-[var(--text-dark)] shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    )}
                    
                    <button
                      onClick={handleRegenerate}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-[var(--text-dark)] shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                </div>

                {/* Game Renderer */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/50">
                  <Suspense 
                    fallback={
                      <div className="flex flex-col items-center justify-center space-y-4 py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-purple)]" />
                        <p className="text-lg font-medium text-[var(--text-dark)]">Loading Game Renderer...</p>
                        <p className="text-sm text-[var(--text-medium)]">
                          Preparing your {generatedGame.type} game experience
                        </p>
                      </div>
                    }
                  >
                    <DynamicGameRenderer 
                      gameSchema={generatedGame}
                      onComplete={(results) => {
                        console.log('Game completed:', results);
                        toast({
                          title: "Game Completed!",
                          description: `You scored ${results.score}/${results.maxScore} points!`
                        });
                      }}
                      onExit={() => reset()}
                    />
                  </Suspense>
                </div>
              </section>
            </main>
          </div>
        </div>
      </InteractiveGamesLayout>
    );
  }

  return (
    <InteractiveGamesLayout currentPage="dynamic">
      <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-cream)]">
        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <main className="relative mt-8">
            <section className="relative text-center pt-8 pb-16">
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tighter text-[var(--text-dark)]">
                <span className="text-[var(--brand-purple)]">AI Game</span> Creator for your<br className="hidden sm:block" />
                <span className="text-[var(--brand-pink)]">Well-being</span>
              </h1>
              <p className="mt-8 max-w-3xl mx-auto text-[var(--text-medium)] leading-relaxed">
                Create personalized wellness games for self-discovery, mindfulness, and coping skills. 
                Design interactive experiences that adapt to your unique needs and help you grow.
              </p>
              
              {/* Stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200/50">
                  <Sparkles className="w-4 h-4 text-[var(--brand-purple)]" />
                  <span className="text-sm font-medium text-[var(--brand-purple)]">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200/50">
                  <Target className="w-4 h-4 text-[var(--brand-blue)]" />
                  <span className="text-sm font-medium text-[var(--brand-blue)]">Personalized</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200/50">
                  <Heart className="w-4 h-4 text-[var(--brand-pink)]" />
                  <span className="text-sm font-medium text-[var(--brand-pink)]">Wellness-Focused</span>
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Main Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200/50">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[var(--brand-purple)] rounded-2xl flex items-center justify-center">
                        <Wand2 className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="font-extrabold text-2xl text-[var(--text-dark)]">Create Your Game</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Main Description */}
                      <div>
                        <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2 mb-2 text-[var(--text-dark)]">
                          <Brain className="w-4 h-4 text-[var(--brand-purple)]" />
                          Describe your game idea *
                        </Label>
                        <Textarea
                          id="description"
                          value={gameRequest.description}
                          onChange={(e) => setGameRequest(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="e.g., 'A matching game for positive affirmations and coping skills'"
                          className="border-2 border-gray-200 text-base min-h-[100px] resize-none rounded-lg bg-white w-full"
                          rows={4}
                        />
                      </div>

                      {/* Game Type Selection */}
                      <div>
                        <Label className="text-base font-semibold flex items-center gap-2 mb-2 text-[var(--text-dark)]">
                          <Gamepad2 className="w-4 h-4 text-[var(--brand-purple)]" />
                          Game Type (optional)
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {gameTypes.map((type, index) => (
                            <button
                              key={type.value}
                              onClick={() => setGameRequest(prev => ({ 
                                ...prev, 
                                gameType: prev.gameType === type.value ? undefined : type.value as GameSchema['type']
                              }))}
                              className={`p-3 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                                gameRequest.gameType === type.value
                                  ? 'border-[var(--brand-purple)] bg-gradient-to-br from-purple-50 to-purple-100 shadow-md'
                                  : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                              }`}
                            >
                              <div className={`text-sm font-medium font-poppins ${
                                gameRequest.gameType === type.value ? 'text-[var(--brand-purple)]' : 'text-[var(--text-medium)]'
                              }`}>
                                {type.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Settings in Grid */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-base font-semibold flex items-center gap-2 mb-2 text-[var(--text-dark)]">
                            <Target className="w-4 h-4 text-[var(--brand-purple)]" />
                            Difficulty
                          </Label>
                          <Select 
                            value={gameRequest.difficulty} 
                            onValueChange={(value: any) => setGameRequest(prev => ({ ...prev, difficulty: value }))}
                          >
                            <SelectTrigger className="h-10 border-2 border-gray-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-base font-semibold flex items-center gap-2 mb-2 text-[var(--text-dark)]">
                            <Users className="w-4 h-4 text-[var(--brand-purple)]" />
                            Target Age
                          </Label>
                          <Input
                            value={gameRequest.targetAge}
                            onChange={(e) => setGameRequest(prev => ({ ...prev, targetAge: e.target.value }))}
                            placeholder="e.g., 8-12, Adults"
                            className="h-10 border-2 border-gray-200"
                          />
                        </div>
                      </div>

                      {/* Generate Button */}
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !gameRequest.description.trim()}
                        className="w-full px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-[var(--brand-purple)] to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 font-poppins"
                      >
                        <div className="flex items-center justify-center gap-3">
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Creating Game...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              <span>Generate Game</span>
                            </>
                          )}
                        </div>
                      </button>

                      {/* Error Display */}
                      {error && (
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
                          <div className="font-semibold">Generation Failed</div>
                          <div className="text-sm">{error}</div>
                        </div>
                      )}

                      {/* Generation Status */}
                      {isGenerating && (
                        <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
                          <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin text-purple-500" />
                          <div className="font-semibold text-purple-700">{generationStep}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Tips & Info */}
                <div className="space-y-6">
                  {/* Quick Tips */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">💡</span>
                      <h3 className="font-extrabold text-lg text-[var(--text-dark)]">Quick Tips</h3>
                    </div>
                    <div className="space-y-3">
                      {suggestions.slice(0, 3).map((suggestion, index) => (
                        <div
                          key={index}
                          className="cursor-pointer p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-purple-300 text-sm transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎯</span>
                      <h3 className="font-extrabold text-lg text-[var(--text-dark)]">Benefits</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Personalized to your needs
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Created in seconds
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Science-backed wellness focus
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </InteractiveGamesLayout>
  );
}
