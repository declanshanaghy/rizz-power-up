import React, { useEffect, useRef, useState } from 'react';
import { getRandomVideoPath, getRandomAudioPath } from './MediaUtils';

interface GiveUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component that displays when user gives up
 * Shows a video and plays a sound effect
 */
const GiveUpModal: React.FC<GiveUpModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Generate random media paths when the modal opens
  const [videoPath, setVideoPath] = useState<string>('');
  const [audioPath, setAudioPath] = useState<string>('');

  // Generate new random paths when the modal opens
  useEffect(() => {
    if (isOpen) {
      // Generate random paths
      const newVideoPath = getRandomVideoPath('giveup');
      const newAudioPath = getRandomAudioPath('giveup');
      
      // Set the paths
      setVideoPath(newVideoPath);
      setAudioPath(newAudioPath);
      
      console.log('Give Up modal opened with:', { video: newVideoPath, audio: newAudioPath });
    }
  }, [isOpen]);
  
  // Handle playing media when paths are set
  useEffect(() => {
    // Only proceed if modal is open and paths are set
    if (!isOpen || !videoPath || !audioPath) return;
    
    console.log('Attempting to play give up modal media:', { video: videoPath, audio: audioPath });
    
    // Store ref values in variables to use in cleanup function
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;
    
    // Small delay to ensure elements are ready
    const playTimer = setTimeout(() => {
      // Start video and audio
      if (videoElement) {
        videoElement.play()
          .then(() => console.log('Give Up video started playing successfully'))
          .catch((err: Error) => console.error('Error playing give up video:', err));
      }
      
      if (audioElement) {
        audioElement.play()
          .then(() => console.log('Give Up audio started playing successfully'))
          .catch((err: Error) => console.error('Error playing give up audio:', err));
      }
    }, 100);
    
    return () => {
      clearTimeout(playTimer);
    };
  }, [isOpen, videoPath, audioPath]);
  
  // Handle modal close effects
  useEffect(() => {
    // Store ref values in variables to use in cleanup function
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;
    
    if (!isOpen) {
      // Stop video and audio when modal closes
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    }
    
    // Cleanup function to stop media when component unmounts
    return () => {
      if (videoElement) {
        videoElement.pause();
      }
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [isOpen]);

  // Don't render anything if modal is closed
  if (!isOpen) {
    return null;
  }

  // Modal styles
  const modalStyles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
    },
    modal: {
      width: 'min(90%, 500px)',
      height: '80vh',
      backgroundColor: 'rgba(46, 8, 84, 0.95)',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      padding: 'clamp(0.75rem, 3vmin, 1rem)',
      boxShadow: `0 0 clamp(20px, 5vmin, 30px) rgba(241, 91, 181, 0.8),
                 0 0 clamp(40px, 10vmin, 60px) rgba(0, 187, 249, 0.8),
                 inset 0 0 clamp(15px, 4vmin, 20px) rgba(255, 255, 255, 0.6)`,
      border: '4px solid var(--color-accent-3, #00F5D4)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'clamp(0.5rem, 2vmin, 0.75rem)',
    },
    videoContainer: {
      width: '100%',
      flex: '1 1 auto',
      borderRadius: 'var(--border-radius-md, 0.75rem)',
      overflow: 'hidden',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: 'auto',
      display: 'block',
      maxHeight: '100%',
    },
    button: {
      background: 'linear-gradient(90deg, var(--color-accent-1, #F15BB5), var(--color-accent-4, #9B5DE5))',
      color: 'white',
      fontWeight: 'bold',
      padding: 'clamp(0.5rem, 2vmin, 0.75rem) clamp(1rem, 4vmin, 1.5rem)',
      marginTop: 'clamp(0.5rem, 2vmin, 0.75rem)',
      marginBottom: 'clamp(0.5rem, 2vmin, 0.75rem)',
      border: 'none',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      textShadow: '0 0 5px #FFF',
      boxShadow: '0 0 clamp(10px, 3vmin, 15px) rgba(241, 91, 181, 0.7)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      fontSize: 'clamp(1rem, 3vmin, 1.2rem)',
    },
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.videoContainer}>
          <video 
            ref={videoRef}
            style={modalStyles.video}
            src={videoPath}
            loop
            muted={false}
          />
        </div>
        
        {/* Hidden audio element for sound effect */}
        <audio 
          ref={audioRef}
          src={audioPath}
          loop
        />
        
        <button 
          style={modalStyles.button}
          onClick={onClose}
        >
          I confe$$, I have no R13z
        </button>
      </div>
    </div>
  );
};

export default GiveUpModal;