
import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import GameControls from './GameControls';
import { PlayerStats } from '@/types/game';
import { useToast } from '@/components/ui/use-toast';

const winningScore = 30;

const GameBoard: React.FC = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [turnScore, setTurnScore] = useState(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ score: 0, wins: 0 });
  const [opponentStats, setOpponentStats] = useState<PlayerStats>({ score: 0, wins: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'opponent'>('player');
  const [gameEnded, setGameEnded] = useState(false);
  const [rolling, setRolling] = useState(false);
  const { toast } = useToast();

  // Handle rolling the dice
  const handleRoll = () => {
    if (rolling || gameEnded) return;
    
    setRolling(true);
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
    
    // Audio feedback
    const audio = new Audio(`/sounds/dice-roll.mp3`);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  // Handle roll completion
  const handleRollComplete = () => {
    setRolling(false);
    
    if (diceValue === 1) {
      // Player loses turn score
      toast({
        title: "Bad luck!",
        description: "You rolled a 1 and lost your turn",
        variant: "destructive",
      });
      setTurnScore(0);
      switchPlayer();
    } else {
      // Add to turn score
      setTurnScore(prev => prev + diceValue);
    }
  };

  // Handle holding current score
  const handleHold = () => {
    if (currentPlayer === 'player') {
      const newScore = playerStats.score + turnScore;
      setPlayerStats(prev => ({ ...prev, score: newScore }));
      
      toast({
        title: "Score added!",
        description: `You added ${turnScore} to your score`,
      });
      
      if (newScore >= winningScore) {
        endGame('player');
      } else {
        setTurnScore(0);
        switchPlayer();
      }
    }
  };

  // Switch players
  const switchPlayer = () => {
    setCurrentPlayer(prev => prev === 'player' ? 'opponent' : 'player');
    setTurnScore(0);
  };

  // End the game
  const endGame = (winner: 'player' | 'opponent') => {
    setGameEnded(true);
    
    if (winner === 'player') {
      setPlayerStats(prev => ({ ...prev, wins: prev.wins + 1 }));
      toast({
        title: "Victory!",
        description: "You've won the game!",
        variant: "default",
      });
    } else {
      setOpponentStats(prev => ({ ...prev, wins: prev.wins + 1 }));
      toast({
        title: "You lost",
        description: "The tavern keeper won this round",
        variant: "destructive",
      });
    }
  };

  // Start a new game
  const handleNewGame = () => {
    setDiceValue(1);
    setTurnScore(0);
    setPlayerStats(prev => ({ ...prev, score: 0 }));
    setOpponentStats(prev => ({ ...prev, score: 0 }));
    setCurrentPlayer('player');
    setGameEnded(false);
    setRolling(false);
    
    toast({
      title: "New game started",
      description: "The fortune awaits!",
    });
  };

  // AI opponent logic
  useEffect(() => {
    if (currentPlayer === 'opponent' && !gameEnded) {
      const opponentDelay = setTimeout(() => {
        // Decision making (simplified strategy)
        let keepRolling = true;
        
        // If opponent has a good turn score or is close to winning, hold
        if ((turnScore >= 10) || (opponentStats.score + turnScore >= winningScore)) {
          keepRolling = false;
        }
        
        if (keepRolling && turnScore < 10) {
          handleRoll();
        } else {
          // Hold current score
          const newScore = opponentStats.score + turnScore;
          setOpponentStats(prev => ({ ...prev, score: newScore }));
          
          toast({
            title: "Opponent holds",
            description: `Opponent added ${turnScore} to their score`,
          });
          
          if (newScore >= winningScore) {
            endGame('opponent');
          } else {
            setTurnScore(0);
            switchPlayer();
          }
        }
      }, 1500);
      
      return () => clearTimeout(opponentDelay);
    }
  }, [currentPlayer, turnScore, rolling]);

  // Audio feedback for important events
  useEffect(() => {
    if (gameEnded) {
      const audio = new Audio(playerStats.score >= winningScore ? '/sounds/win.mp3' : '/sounds/lose.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [gameEnded]);

  return (
    <div className="game-board w-full max-w-3xl mx-auto bg-tavern-parchment/40 rounded-2xl p-6 border border-tavern-wood/20 shadow-xl backdrop-blur-md animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-medium text-tavern-dark">First to {winningScore} gold wins the fortune!</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center perspective-1000">
          <div className="relative perspective-1000 w-32 h-32 flex items-center justify-center">
            <Dice value={diceValue} rolling={rolling} onRollComplete={handleRollComplete} />
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              {rolling ? (
                <span className="text-sm text-tavern-dark/60 animate-pulse">Rolling...</span>
              ) : (
                <span className="text-sm font-medium text-tavern-dark">{diceValue}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <GameControls
            currentPlayer={currentPlayer}
            playerStats={playerStats}
            opponentStats={opponentStats}
            onRoll={handleRoll}
            onHold={handleHold}
            gameEnded={gameEnded}
            rolling={rolling}
            onNewGame={handleNewGame}
            turnScore={turnScore}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
