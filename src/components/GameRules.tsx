
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const GameRules: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent border-tavern-wood/30 text-tavern-wood hover:bg-tavern-wood/10">
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md backdrop-blur-md bg-tavern-parchment/90 border-tavern-wood/30">
        <DialogHeader>
          <DialogTitle className="text-tavern-dark text-xl">Adventurer's Fortune</DialogTitle>
          <DialogDescription className="text-tavern-dark/70">
            A game of luck and strategy for tavern patrons
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-tavern-dark/90">
          <div>
            <h3 className="font-medium mb-1">Goal</h3>
            <p className="text-sm">Be the first player to reach 30 gold coins to win the fortune.</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Rules</h3>
            <ul className="text-sm list-disc list-inside space-y-2">
              <li>On your turn, roll the dice as many times as you wish.</li>
              <li>Each roll adds to your <strong>turn score</strong>.</li>
              <li>If you roll a <strong>1</strong>, you lose all points for the current turn and it becomes the tavern keeper's turn.</li>
              <li>You can choose to <strong>Hold</strong> at any time, which adds your turn score to your total score and passes the turn.</li>
              <li>The tavern keeper (AI) plays strategically after your turn.</li>
              <li>First to reach 30 gold coins wins!</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Strategy</h3>
            <p className="text-sm">Decide whether to risk rolling again for more points or to hold and secure your current gains. The longer you push your luck, the more you might lose!</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            className="bg-tavern-wood text-white hover:bg-tavern-wood/90"
          >
            Let's Play
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameRules;
