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
      gap: 'clamp(0.5rem, 2vmin, 0.75rem)',
      flex: '0 0 auto',
      padding: 'clamp(0.5rem, 2vmin, 1rem)'
    }}>
      {/* Left side: Bank Score Button or Give Up Button */}
      <div className="flex justify-center" style={{
        margin: 'clamp(0.15rem, 1vmin, 0.25rem)',
        flex: '1 1 0',
        width: '50%',
        aspectRatio: '1.61803398875/1', // Golden ratio
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
        margin: 'clamp(0.15rem, 1vmin, 0.25rem)',
        flex: '1 1 0',
        width: '50%',
        aspectRatio: '1.61803398875/1', // Golden ratio
      }}>
        <RizzButton onClick={onRizzTap} disabled={showCard} />
      </div>
    </div>
  );
};

export default ButtonPanel;