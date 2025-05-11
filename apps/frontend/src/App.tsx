import { useState, useEffect } from 'react'
import RizzBackground from './RizzBackground'
import SoundControl from './SoundControl'
import { loadGameState } from './localStorage'
import { initializePerformanceMode, setReducedAnimations } from './Animations'
import './App.css'

function App() {
  const [highScore, setHighScore] = useState(0);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(true);
  
  // Initialize performance mode and load high score from localStorage on initial render
  useEffect(() => {
    // Initialize performance mode - always starts in performance mode
    initializePerformanceMode();
    
    // Load high score from localStorage
    const savedState = loadGameState();
    if (savedState) {
      setHighScore(savedState.highScore);
    }
  }, []);
  
  // Toggle performance mode
  const togglePerformanceMode = () => {
    const newMode = !isLowPerformanceMode;
    setIsLowPerformanceMode(newMode);
    setReducedAnimations(newMode);
  };

  return (
    <div className="app-container">
      <RizzBackground />
      
      {/* Sound Control component */}
      <SoundControl position="bottom-left" />
      
      {/* Performance mode toggle */}
      <button
        onClick={togglePerformanceMode}
        style={{
          position: 'fixed',
          top: 'clamp(5px, 1.5vmin, 10px)',
          right: 'clamp(5px, 1.5vmin, 10px)',
          background: isLowPerformanceMode ? 'rgba(0, 245, 212, 0.7)' : 'rgba(241, 91, 181, 0.7)',
          color: isLowPerformanceMode ? '#1A1A1A' : '#FFFFFF',
          border: 'none',
          borderRadius: '0.5rem',
          padding: 'clamp(3px, 1vmin, 5px) clamp(10px, 3vmin, 15px)',
          fontSize: 'clamp(12px, 3vmin, 14px)',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        {isLowPerformanceMode ? '🚀 Performance Mode (Default)' : '✨ Full Animations (May Slow Game)'}
      </button>
      
      {/* Footer container for Buy Me a Coffee button, GitHub link, and High Score panel */}
      <div className="footer-container" style={{
        position: 'fixed',
        bottom: 'clamp(5px, 1.5vmin, 10px)',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 clamp(5px, 1.5vmin, 10px)',
        zIndex: 9999
      }}>
        {/* Left side container for buttons */}
        <div style={{
          display: 'flex',
          gap: 'clamp(8px, 2vmin, 15px)',
          alignItems: 'center'
        }}>
          {/* Buy Me a Coffee button */}
          <a
            href="https://www.buymeacoffee.com/firemandecko"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#FFDD00',
              color: '#000000',
              padding: 'clamp(3px, 1vmin, 5px) clamp(10px, 3vmin, 15px)',
              borderRadius: '0.5rem',
              fontFamily: 'Cookie, cursive',
              fontSize: 'clamp(16px, 4vmin, 18px)',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 0 10px rgba(255, 221, 0, 0.5)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 221, 0, 0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 221, 0, 0.5)';
            }}
          >
            ☕ Buy me a coffee
          </a>
          
          {/* GitHub Link */}
          <a
            href="https://github.com/declanshanaghy/rizz-power-up"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #00F5D4 0%, #00BBF9 100%)',
              color: '#ffffff',
              padding: 'clamp(3px, 1vmin, 5px) clamp(10px, 3vmin, 15px)',
              borderRadius: '0.5rem',
              fontSize: 'clamp(16px, 4vmin, 18px)',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 0 10px rgba(0, 245, 212, 0.7)',
              textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 212, 0.9)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 245, 212, 0.7)';
            }}
          >
            💻 GitHub
          </a>
        </div>
        
        {/* Custom High Score display - right side */}
        <div style={{
          padding: 'clamp(3px, 1vmin, 5px) clamp(10px, 3vmin, 15px)',
          borderRadius: '0.5rem',
          background: 'rgba(46, 8, 84, 0.7)',
          boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(5px, 1vmin, 10px)'
        }}>
          <span style={{
            color: '#00F5D4',
            fontSize: 'clamp(14px, 3.5vmin, 16px)'
          }}>High Score:</span>
          <span style={{
            color: '#FEE440',
            fontSize: 'clamp(16px, 4vmin, 18px)',
            fontWeight: 'bold',
            textShadow: '0 0 5px #FEE440'
          }}>{highScore}</span>
        </div>
      </div>
    </div>
  )
}

export default App
