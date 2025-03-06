
import { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import GameRules from '@/components/GameRules';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-tavern-parchment/40">
        <div className="animate-float">
          <div className="w-20 h-20 border-8 border-tavern-wood/30 border-t-tavern-wood rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-tavern-dark animate-pulse">Preparing the tavern...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center">
      <header className="w-full max-w-4xl mx-auto mb-12 text-center animate-slide-down">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-tavern-dark font-bold mb-3">
          Adventurer's Fortune
        </h1>
        <p className="text-lg text-tavern-dark/70 max-w-2xl mx-auto">
          A game of chance and strategy for tavern patrons. Roll the dice, collect gold, and claim the fortune!
        </p>
        <div className="mt-6">
          <GameRules />
        </div>
      </header>
      
      <main className="w-full max-w-4xl mx-auto flex-1 animate-slide-up">
        <GameBoard />
      </main>
      
      <footer className="w-full max-w-4xl mx-auto mt-12 text-center text-tavern-dark/50 text-sm animate-fade-in">
        <p>© {new Date().getFullYear()} Adventurer's Fortune • A tavern game of luck and strategy</p>
      </footer>
    </div>
  );
};

export default Index;
