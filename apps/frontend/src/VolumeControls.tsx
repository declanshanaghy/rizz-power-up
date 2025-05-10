import React, { useState, useEffect } from 'react';
import { 
  setSoundEffectsVolume, 
  getSoundEffectsVolume, 
  setMuted as setSoundMuted, 
  isSoundMuted 
} from './SoundEffects';
import {
  setBackgroundMusicVolume,
  getBackgroundMusicVolume,
  setMusicMuted,
  isMusicMuted,
  toggleBackgroundMusic,
  isBackgroundMusicPlaying
} from './BackgroundMusic';

interface VolumeControlsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * VolumeControls component for controlling sound effects and background music volume
 */
const VolumeControls: React.FC<VolumeControlsProps> = ({ position = 'bottom-left' }) => {
  // Sound effects state
  const [soundVolume, setSoundVolume] = useState(getSoundEffectsVolume());
  const [soundMuted, setSoundMutedState] = useState(isSoundMuted());
  
  // Background music state
  const [musicVolume, setMusicVolume] = useState(getBackgroundMusicVolume());
  const [musicMuted, setMusicMutedState] = useState(isMusicMuted());
  const [musicPlaying, setMusicPlaying] = useState(isBackgroundMusicPlaying());

  // Position styles based on the position prop
  const positionStyles = {
    'top-left': { top: 'clamp(10px, 2vmin, 20px)', left: 'clamp(10px, 2vmin, 20px)' },
    'top-right': { top: 'clamp(10px, 2vmin, 20px)', right: 'clamp(10px, 2vmin, 20px)' },
    'bottom-left': { bottom: 'clamp(10px, 2vmin, 20px)', left: 'clamp(10px, 2vmin, 20px)' },
    'bottom-right': { bottom: 'clamp(10px, 2vmin, 20px)', right: 'clamp(10px, 2vmin, 20px)' }
  };

  // Update the sound effects volume when the volume state changes
  useEffect(() => {
    setSoundEffectsVolume(soundVolume);
  }, [soundVolume]);

  // Update the sound effects muted state when the muted state changes
  useEffect(() => {
    setSoundMuted(soundMuted);
  }, [soundMuted]);

  // Update the background music volume when the volume state changes
  useEffect(() => {
    setBackgroundMusicVolume(musicVolume);
  }, [musicVolume]);

  // Update the background music muted state when the muted state changes
  useEffect(() => {
    setMusicMuted(musicMuted);
  }, [musicMuted]);

  // Handle sound effects volume change
  const handleSoundVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setSoundVolume(newVolume);
    
    // If volume is set to 0, mute the sound
    if (newVolume === 0) {
      setSoundMutedState(true);
    } else if (soundMuted) {
      // If volume is increased from 0 and was muted, unmute
      setSoundMutedState(false);
    }
  };

  // Handle sound effects mute toggle
  const handleSoundMuteToggle = () => {
    setSoundMutedState(!soundMuted);
  };

  // Handle background music volume change
  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setMusicVolume(newVolume);
    
    // If volume is set to 0, mute the music
    if (newVolume === 0) {
      setMusicMutedState(true);
    } else if (musicMuted) {
      // If volume is increased from 0 and was muted, unmute
      setMusicMutedState(false);
    }
  };

  // Handle background music mute toggle
  const handleMusicMuteToggle = () => {
    setMusicMutedState(!musicMuted);
  };

  // Handle background music play/pause toggle
  const handleMusicPlayPauseToggle = () => {
    const isPlaying = toggleBackgroundMusic();
    setMusicPlaying(isPlaying);
  };

  // Handle volume up for sound effects
  const handleSoundVolumeUp = () => {
    const newVolume = Math.min(1, soundVolume + 0.1);
    setSoundVolume(newVolume);
    if (soundMuted && newVolume > 0) {
      setSoundMutedState(false);
    }
  };

  // Handle volume down for sound effects
  const handleSoundVolumeDown = () => {
    const newVolume = Math.max(0, soundVolume - 0.1);
    setSoundVolume(newVolume);
    if (newVolume === 0) {
      setSoundMutedState(true);
    }
  };

  // Handle volume up for background music
  const handleMusicVolumeUp = () => {
    const newVolume = Math.min(1, musicVolume + 0.1);
    setMusicVolume(newVolume);
    if (musicMuted && newVolume > 0) {
      setMusicMutedState(false);
    }
  };

  // Handle volume down for background music
  const handleMusicVolumeDown = () => {
    const newVolume = Math.max(0, musicVolume - 0.1);
    setMusicVolume(newVolume);
    if (newVolume === 0) {
      setMusicMutedState(true);
    }
  };

  // Common styles for control buttons
  const controlButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: 'clamp(16px, 4vmin, 20px)',
    cursor: 'pointer',
    padding: 'clamp(2px, 0.5vmin, 5px)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'clamp(30px, 8vmin, 40px)',
    height: 'clamp(30px, 8vmin, 40px)',
    transition: 'all 0.2s ease'
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
        gap: 'clamp(10px, 2vmin, 15px)',
        boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)',
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Sound Effects Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(5px, 1vmin, 8px)',
          width: '100%',
          padding: 'clamp(5px, 1vmin, 8px)',
          borderRadius: 'var(--border-radius-sm, 0.5rem)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <div style={{ fontSize: 'clamp(12px, 3vmin, 14px)', color: 'var(--color-accent-3, #00F5D4)' }}>
          Sound Effects
        </div>
        
        {/* Sound icon button */}
        <button
          onClick={handleSoundMuteToggle}
          style={{
            ...controlButtonStyle,
            color: soundMuted ? 'var(--color-accent-1, #F15BB5)' : 'var(--color-accent-3, #00F5D4)'
          }}
          aria-label={soundMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        >
          {soundMuted ? '🔇' : soundVolume > 0.5 ? '🔊' : '🔉'}
        </button>
        
        {/* Sound volume controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(5px, 1vmin, 8px)' }}>
          <button
            onClick={handleSoundVolumeDown}
            style={{
              ...controlButtonStyle,
              color: 'var(--color-accent-5, #FEE440)',
              fontSize: 'clamp(14px, 3.5vmin, 18px)'
            }}
            aria-label="Decrease sound effects volume"
          >
            -
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={soundVolume}
            onChange={handleSoundVolumeChange}
            style={{
              width: 'clamp(60px, 15vmin, 80px)',
              accentColor: 'var(--color-accent-5, #FEE440)',
              cursor: 'pointer'
            }}
            aria-label="Sound effects volume control"
          />
          
          <button
            onClick={handleSoundVolumeUp}
            style={{
              ...controlButtonStyle,
              color: 'var(--color-accent-5, #FEE440)',
              fontSize: 'clamp(14px, 3.5vmin, 18px)'
            }}
            aria-label="Increase sound effects volume"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Background Music Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(5px, 1vmin, 8px)',
          width: '100%',
          padding: 'clamp(5px, 1vmin, 8px)',
          borderRadius: 'var(--border-radius-sm, 0.5rem)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <div style={{ fontSize: 'clamp(12px, 3vmin, 14px)', color: 'var(--color-accent-3, #00F5D4)' }}>
          Background Music
        </div>
        
        {/* Music icon button */}
        <button
          onClick={handleMusicMuteToggle}
          style={{
            ...controlButtonStyle,
            color: musicMuted ? 'var(--color-accent-1, #F15BB5)' : 'var(--color-accent-3, #00F5D4)'
          }}
          aria-label={musicMuted ? 'Unmute background music' : 'Mute background music'}
        >
          {musicMuted ? '🔇' : musicVolume > 0.5 ? '🎵' : '🎵'}
        </button>
        
        {/* Music volume controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(5px, 1vmin, 8px)' }}>
          <button
            onClick={handleMusicVolumeDown}
            style={{
              ...controlButtonStyle,
              color: 'var(--color-accent-5, #FEE440)',
              fontSize: 'clamp(14px, 3.5vmin, 18px)'
            }}
            aria-label="Decrease background music volume"
          >
            -
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={musicVolume}
            onChange={handleMusicVolumeChange}
            style={{
              width: 'clamp(60px, 15vmin, 80px)',
              accentColor: 'var(--color-accent-5, #FEE440)',
              cursor: 'pointer'
            }}
            aria-label="Background music volume control"
          />
          
          <button
            onClick={handleMusicVolumeUp}
            style={{
              ...controlButtonStyle,
              color: 'var(--color-accent-5, #FEE440)',
              fontSize: 'clamp(14px, 3.5vmin, 18px)'
            }}
            aria-label="Increase background music volume"
          >
            +
          </button>
        </div>
        
        {/* Play/Pause button */}
        <button
          onClick={handleMusicPlayPauseToggle}
          style={{
            ...controlButtonStyle,
            color: 'var(--color-accent-2, #00BBF9)'
          }}
          aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}
        >
          {musicPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
    </div>
  );
};

export default VolumeControls;