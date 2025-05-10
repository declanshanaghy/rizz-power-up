import React, { useState, useEffect } from 'react';
import { setSoundEffectsVolume, getSoundEffectsVolume, setMuted, isSoundMuted } from './SoundEffects';

interface SoundControlProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * SoundControl component for controlling sound effects volume
 */
const SoundControl: React.FC<SoundControlProps> = ({ position = 'bottom-left' }) => {
  const [volume, setVolume] = useState(getSoundEffectsVolume());
  const [muted, setMutedState] = useState(isSoundMuted());

  // Position styles based on the position prop
  const positionStyles = {
    'top-left': { top: 'clamp(10px, 2vmin, 20px)', left: 'clamp(10px, 2vmin, 20px)' },
    'top-right': { top: 'clamp(10px, 2vmin, 20px)', right: 'clamp(10px, 2vmin, 20px)' },
    'bottom-left': { bottom: 'clamp(10px, 2vmin, 20px)', left: 'clamp(10px, 2vmin, 20px)' },
    'bottom-right': { bottom: 'clamp(10px, 2vmin, 20px)', right: 'clamp(10px, 2vmin, 20px)' }
  };

  // Update the sound effects volume when the volume state changes
  useEffect(() => {
    setSoundEffectsVolume(volume);
  }, [volume]);

  // Update the muted state when the muted state changes
  useEffect(() => {
    setMuted(muted);
  }, [muted]);

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // If volume is set to 0, mute the sound
    if (newVolume === 0) {
      setMutedState(true);
    } else if (muted) {
      // If volume is increased from 0 and was muted, unmute
      setMutedState(false);
    }
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    setMutedState(!muted);
  };

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        backgroundColor: 'rgba(46, 8, 84, 0.7)',
        padding: 'clamp(5px, 1vmin, 10px)',
        borderRadius: 'var(--border-radius-md, 0.75rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(5px, 1vmin, 8px)',
        boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)',
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Sound icon button */}
      <button
        onClick={handleMuteToggle}
        style={{
          background: 'none',
          border: 'none',
          color: muted ? 'var(--color-accent-1, #F15BB5)' : 'var(--color-accent-3, #00F5D4)',
          fontSize: 'clamp(18px, 5vmin, 24px)',
          cursor: 'pointer',
          padding: 'clamp(2px, 0.5vmin, 5px)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'clamp(30px, 8vmin, 40px)',
          height: 'clamp(30px, 8vmin, 40px)',
          transition: 'all 0.2s ease'
        }}
        aria-label={muted ? 'Unmute sound' : 'Mute sound'}
      >
        {muted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
      </button>

      {/* Volume slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        style={{
          width: 'clamp(60px, 15vmin, 80px)',
          accentColor: 'var(--color-accent-5, #FEE440)',
          cursor: 'pointer'
        }}
        aria-label="Volume control"
      />
    </div>
  );
};

export default SoundControl;