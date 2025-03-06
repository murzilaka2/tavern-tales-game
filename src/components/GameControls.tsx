
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayerStats } from '@/types/game';

interface GameControlsProps {
  currentPlayer: 'player' | 'opponent';
  playerStats: PlayerStats;
  opponentStats: PlayerStats;
  onRoll: () => void;
  onHold: () => void;
  gameEnded: boolean;
  rolling: boolean;
  onNewGame: () => void;
  turnScore: number;
}

const GameControls = ({
  currentPlayer,
  playerStats,
  opponentStats,
  onRoll,
  onHold,
  gameEnded,
  rolling,
  onNewGame,
  turnScore
}: GameControlsProps) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between bg-tavern-parchment/70 rounded-xl p-4 border border-tavern-wood/30 shadow-md backdrop-blur-sm">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-tavern-dark/70">Your Gold</span>
          <p className="text-2xl font-medium text-tavern-dark">{playerStats.score}</p>
        </div>
        <div className="text-center">
          <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            {turnScore > 0 && `+${turnScore}`}
          </div>
        </div>
        <div className="space-y-1 text-right">
          <span className="text-xs uppercase tracking-wider text-tavern-dark/70">Opponent</span>
          <p className="text-2xl font-medium text-tavern-dark">{opponentStats.score}</p>
        </div>
      </div>
      
      {!gameEnded ? (
        <div className="space-y-4">
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onRoll}
              disabled={currentPlayer === 'opponent' || rolling || gameEnded}
              className="relative overflow-hidden bg-tavern-wood text-white hover:bg-tavern-wood/90 transition-all px-8 py-6"
            >
              <span className="relative z-10">Roll Dice</span>
              <span className="absolute inset-0 bg-gradient-to-r from-tavern-wood to-tavern-accent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            
            <Button
              onClick={onHold}
              disabled={currentPlayer === 'opponent' || rolling || gameEnded || turnScore === 0}
              className="relative overflow-hidden bg-tavern-dark text-white hover:bg-tavern-dark/90 transition-all px-8 py-6"
            >
              <span className="relative z-10">Hold</span>
              <span className="absolute inset-0 bg-gradient-to-r from-tavern-dark to-tavern-wood opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
          
          <div className="text-center text-sm">
            {currentPlayer === 'player' ? (
              <p className="text-tavern-dark font-medium animate-pulse">Your turn</p>
            ) : (
              <p className="text-tavern-dark/70">Opponent is thinking...</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-tavern-dark">
            {playerStats.score >= 30 ? "You won the fortune!" : "The tavern keeper won!"}
          </h3>
          <Button
            onClick={onNewGame}
            className="bg-tavern-accent text-white hover:bg-tavern-wood transition-colors"
          >
            New Game
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameControls;
