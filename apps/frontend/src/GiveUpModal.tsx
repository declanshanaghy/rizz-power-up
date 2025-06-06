import React, { useEffect, useRef, useState } from 'react';
import { getRandomVideoPath, getRandomAudioPath } from './MediaUtils';
import { modalAnimations } from './Animations';

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
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Generate random media paths when the modal opens
  const [videoPath, setVideoPath] = useState<string>('');
  const [audioPath, setAudioPath] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add animations to the document
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = modalAnimations;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Generate new random paths when the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsLoading(true);
      
      // Generate random paths
      const newVideoPath = getRandomVideoPath('giveup');
      const newAudioPath = getRandomAudioPath('giveup');
      
      // Set the paths
      setVideoPath(newVideoPath);
      setAudioPath(newAudioPath);
      
      console.log('Give Up modal opened with media:', { 
        video: newVideoPath, 
        audio: newAudioPath 
      });
      
      // Automatically hide loading spinner after a short delay
      // This ensures the UI doesn't get stuck in loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
          .then(() => {
            console.log('Give Up video started playing successfully');
            setIsLoading(false);
          })
          .catch((err: Error) => {
            console.error('Error playing give up video:', err);
            setIsLoading(false);
          });
      }
      
      if (audioElement) {
        audioElement.play()
          .then(() => console.log('Give Up audio started playing successfully'))
          .catch((err: Error) => console.error('Error playing give up audio:', err));
      }
    }, 300);
    
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

  // Handle the close animation
  const handleClose = () => {
    setIsClosing(true);
    
    // Add exit animation and wait for it to complete before actually closing
    if (modalRef.current) {
      modalRef.current.style.animation = 'modalExit 0.5s forwards';
      
      setTimeout(() => {
        onClose();
      }, 500); // Match this to the modalExit animation duration
    } else {
      onClose();
    }
  };

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
      animation: isClosing ? 'modalExit 0.5s forwards' : 'modalEntrance 0.7s forwards, modalGlow 3s infinite',
    },
    videoContainer: {
      width: '100%',
      flex: '1 1 auto',
      borderRadius: 'var(--border-radius-md, 0.75rem)',
      overflow: 'hidden',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative' as const,
    },
    video: {
      width: '100%',
      height: 'auto',
      display: 'block',
      maxHeight: '100%',
    },
    loadingOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: '5px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTop: '5px solid var(--color-accent-3, #00F5D4)',
      animation: 'spin 1s linear infinite',
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
      animation: 'buttonPulse 2s infinite',
    },
  };

  return (
    <div style={modalStyles.overlay}>
      <div ref={modalRef} style={modalStyles.modal}>
        <div style={modalStyles.videoContainer}>
          {isLoading && (
            <div style={modalStyles.loadingOverlay}>
              <div style={modalStyles.loadingSpinner}></div>
            </div>
          )}
          <video
            ref={videoRef}
            style={modalStyles.video}
            src={videoPath}
            loop
            muted={false}
            preload="auto"
          />
        </div>
        
        {/* Hidden audio element for sound effect */}
        <audio
          ref={audioRef}
          src={audioPath}
          loop
          preload="auto"
        />
        
        <button
          style={modalStyles.button}
          onClick={handleClose}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(241, 91, 181, 0.9), 0 0 30px rgba(0, 187, 249, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 clamp(10px, 3vmin, 15px) rgba(241, 91, 181, 0.7)';
          }}
        >
          I confe$$, I have no R13z
        </button>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default GiveUpModal;