
import { useEffect, useState } from 'react';

interface DiceProps {
  value: number;
  rolling: boolean;
  onRollComplete?: () => void;
}

const Dice = ({ value, rolling, onRollComplete }: DiceProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (rolling) {
      const rotations = {
        1: { x: 0, y: 0, z: 0 },
        2: { x: 0, y: -90, z: 0 },
        3: { x: 90, y: 0, z: 0 },
        4: { x: -90, y: 0, z: 0 },
        5: { x: 0, y: 90, z: 0 },
        6: { x: 180, y: 0, z: 0 }
      };
      
      // Add random extra rotations for animation effect
      const randomX = Math.floor(Math.random() * 2) * 360;
      const randomY = Math.floor(Math.random() * 2) * 360;
      const randomZ = Math.floor(Math.random() * 2) * 360;
      
      setTimeout(() => {
        setRotation({
          x: rotations[value as keyof typeof rotations].x + randomX,
          y: rotations[value as keyof typeof rotations].y + randomY,
          z: rotations[value as keyof typeof rotations].z + randomZ
        });
        
        setTimeout(() => {
          onRollComplete?.();
        }, 1200);
      }, 50);
    }
  }, [rolling, value, onRollComplete]);

  const renderDiceFace = (num: number) => {
    return (
      <div className="dice-face border-2 border-tavern-wood/30 rounded-lg">
        {num === 1 && <div className="dice-dot dot-7"></div>}
        
        {num === 2 && (
          <>
            <div className="dice-dot dot-1"></div>
            <div className="dice-dot dot-6"></div>
          </>
        )}
        
        {num === 3 && (
          <>
            <div className="dice-dot dot-1"></div>
            <div className="dice-dot dot-7"></div>
            <div className="dice-dot dot-6"></div>
          </>
        )}
        
        {num === 4 && (
          <>
            <div className="dice-dot dot-1"></div>
            <div className="dice-dot dot-2"></div>
            <div className="dice-dot dot-5"></div>
            <div className="dice-dot dot-6"></div>
          </>
        )}
        
        {num === 5 && (
          <>
            <div className="dice-dot dot-1"></div>
            <div className="dice-dot dot-2"></div>
            <div className="dice-dot dot-7"></div>
            <div className="dice-dot dot-5"></div>
            <div className="dice-dot dot-6"></div>
          </>
        )}
        
        {num === 6 && (
          <>
            <div className="dice-dot dot-1"></div>
            <div className="dice-dot dot-2"></div>
            <div className="dice-dot dot-3"></div>
            <div className="dice-dot dot-4"></div>
            <div className="dice-dot dot-5"></div>
            <div className="dice-dot dot-6"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`dice-3d group ${rolling ? 'animate-roll-dice' : ''}`}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
        transition: rolling ? 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.6s ease'
      }}
    >
      <div className="face-front">{renderDiceFace(1)}</div>
      <div className="face-back">{renderDiceFace(6)}</div>
      <div className="face-right">{renderDiceFace(2)}</div>
      <div className="face-left">{renderDiceFace(5)}</div>
      <div className="face-top">{renderDiceFace(3)}</div>
      <div className="face-bottom">{renderDiceFace(4)}</div>
    </div>
  );
};

export default Dice;
