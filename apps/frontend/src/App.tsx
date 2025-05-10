import { useState, useEffect } from 'react'
import RizzBackground from './RizzBackground'
import { loadGameState } from './localStorage'
import './App.css'

function App() {
  const [highScore, setHighScore] = useState(0);
  
  // Load high score from localStorage on initial render
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setHighScore(savedState.highScore);
    }
  }, []);

  return (
    <div className="app-container">
      <RizzBackground />
      
      {/* Footer container for Buy Me a Coffee button and High Score panel */}
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
        {/* Buy Me a Coffee button - left side */}
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
