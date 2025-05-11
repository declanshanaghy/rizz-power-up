import React from 'react';
import RizzButton from './RizzButton';
import BankScoreButton from './BankScoreButton';
import GiveUpButton from './GiveUpButton';

interface ButtonPanelProps {
  rizzLevel: number;
  highScore: number;
  clickCount: number;
  showCard: boolean;
  onRizzTap: () => void;
  onBankScore: () => void;
  onGiveUp: () => void;
}

/**
 * ButtonPanel component that contains the game buttons in the specified order:
 * Left: Give Up / Bank Score button
 * Right: Rizz Up button
 */
const ButtonPanel: React.FC<ButtonPanelProps> = ({
  rizzLevel,
  highScore,
  clickCount,
  showCard,
  onRizzTap,
  onBankScore,
  onGiveUp
}) => {
  return (
    <div className="flex flex-row items-center justify-center w-full" style={{
      maxWidth: 'min(calc(100% - clamp(20px, 5vw, 50px)), 1200px)',
      margin: '0 auto',
      gap: 'clamp(0.25rem, 1vmin, 0.5rem)', // Decreased gap between buttons
      flex: '0 0 auto',
      padding: 'clamp(0.25rem, 1vmin, 0.5rem)' // Decreased padding
    }}>
      {/* Left side: Bank Score Button or Give Up Button */}
      <div className="flex justify-center" style={{
        margin: 'clamp(0.1rem, 0.5vmin, 0.15rem)', // Decreased margin
        flex: '1 1 0',
        width: '50%',
        aspectRatio: '3/1', // Wider aspect ratio (was golden ratio)
      }}>
        {/* Always show a button, but make it disabled when clickCount is 0 */}
        {rizzLevel >= highScore ? (
          <BankScoreButton
            onClick={onBankScore}
            visible={true}  // Always visible
            disabled={clickCount === 0}  // Disabled when no clicks yet
          />
        ) : (
          <GiveUpButton
            onClick={onGiveUp}
            visible={true}  // Always visible
            disabled={clickCount === 0}  // Disabled when no clicks yet
          />
        )}
      </div>
      
      {/* Right side: Rizz Button */}
      <div className="flex justify-center" style={{
        margin: 'clamp(0.1rem, 0.5vmin, 0.15rem)', // Decreased margin
        flex: '1 1 0',
        width: '50%',
        aspectRatio: '3/1', // Wider aspect ratio (was golden ratio)
      }}>
        <RizzButton onClick={onRizzTap} disabled={showCard} />
      </div>
    </div>
  );
};

export default ButtonPanel;