import { useState, useEffect, useRef } from 'react'
import RizzButton from './RizzButton'
import BankScoreButton from './BankScoreButton'
import { getRandomImage, MemeImage, generateAttributes, calculateRizzLevel } from './memeImages.ts'
import attributeEmojis from './rizz_attributes_emojis.json'

// Add keyframe animations for cards
const addKeyframeStyles = () => {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes cardEntrance {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.3) rotate(-15deg);
      }
      40% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
      }
      60% {
        transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
      }
      80% {
        transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
      }
      100% {
        transform: translate(-50%, -50%) scale(1) rotate(0);
      }
    }
    
    @keyframes cardGlow {
      0% {
        box-shadow: 0 0 20px #F15BB5, 0 0 40px #00BBF9;
      }
      50% {
        box-shadow: 0 0 30px #00F5D4, 0 0 50px #9B5DE5;
      }
      100% {
        box-shadow: 0 0 20px #F15BB5, 0 0 40px #00BBF9;
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1) rotate(0);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8) rotate(5deg);
      }
    }
    
    .fadeOut {
      animation: fadeOut 0.5s ease-out forwards !important;
    }
  `;
  document.head.appendChild(styleEl);
};

// Helper function for fullscreen
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function App() {
  const [rizzLevel, setRizzLevel] = useState(0)
  // Removed unused quote state
  const [showSpecialEvent, setShowSpecialEvent] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // State to track container size
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  
  // State for card display
  const [currentCard, setCurrentCard] = useState<MemeImage | null>(null)
  const [currentAttributes, setCurrentAttributes] = useState<{
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  } | null>(null)
  const [showCard, setShowCard] = useState(false)
  const [showBankOptions, setShowBankOptions] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  
  // We're removing the complex dimension calculation function and using CSS for responsive design
  
  // Set up resize listener and fullscreen change detection
  // Use ResizeObserver for more accurate container size tracking
  useEffect(() => {
    // Add keyframe animations
    addKeyframeStyles();
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    // Add event listeners
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    // Set up ResizeObserver to monitor container size changes
    let resizeObserver: ResizeObserver | null = null
    if (containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          setContainerSize({ width, height })
          
          if (showDebug) {
            console.log(`Container observed size: ${width}x${height}`)
          }
        }
      })
      
      resizeObserver.observe(containerRef.current)
    }
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [showDebug]) // Add dependencies
  
  // Stats that increase with each tap
  
  // Stats that increase with each tap
  const [stats, setStats] = useState({
    vibeLevel: 0,
    swagger: 0,
    cringeAvoidance: 0
  })
  
  // Helper function to get emoji for attribute score
  const getEmojiForScore = (attribute: string, score: number) => {
    // Scale the score from -10 to 10 range to -500 to 500 range
    const scaledScore = Math.round(score * 50);
    
    // Get the appropriate attribute mapping
    const attributeMap = attributeEmojis[attribute as keyof typeof attributeEmojis];
    if (!attributeMap) return '❓'; // Fallback emoji if attribute not found
    
    // Find the closest available score in the emoji mapping
    const availableScores = Object.keys(attributeMap)
      .map(Number)
      .sort((a, b) => a - b);
    
    let closestScore = availableScores[0];
    for (const availableScore of availableScores) {
      if (Math.abs(availableScore - scaledScore) < Math.abs(closestScore - scaledScore)) {
        closestScore = availableScore;
      }
    }
    
    // Safely access the emoji with the closest score
    const emoji = attributeMap[closestScore.toString() as keyof typeof attributeMap];
    return emoji || '❓'; // Fallback emoji if not found
  };
  
  // Handle button tap
  const handleRizzTap = () => {
    if (showCard) return; // Don't allow new cards while one is showing
    
    // Increment click count
    setClickCount(prevCount => prevCount + 1);
    
    // Deal a random card
    const card = getRandomImage();
    
    // Generate random attributes based on the card's bias
    const attributes = generateAttributes(card.bias);
    setCurrentAttributes(attributes);
    
    setCurrentCard(card);
    setShowCard(true);
    
    // Update stats based on generated attributes
    const newStats = {
      vibeLevel: stats.vibeLevel + attributes.vibeLevel,
      swagger: stats.swagger + attributes.swagger,
      cringeAvoidance: stats.cringeAvoidance + attributes.cringeAvoidance
    };
    setStats(newStats);
    
    // Calculate the new Rizz level as the sum of all attributes
    const calculatedRizzLevel = newStats.vibeLevel + newStats.swagger + newStats.cringeAvoidance;
    setRizzLevel(calculatedRizzLevel);
    
    // Calculate delay time inversely proportional to click count
    // More clicks = slower return (up to max 8 seconds)
    // Minimum delay is 3 seconds, maximum is 8 seconds
    const baseDelay = 3000; // 3 second base delay
    const clickFactor = Math.min(clickCount * 250, 5000); // 250ms per click, max 5000ms additional
    const totalDelay = baseDelay + clickFactor; // Between 3000ms and 8000ms
    
    // Make card disappear after calculated delay
    setTimeout(() => {
      // Add fadeOut class to the card
      const cardElement = document.querySelector('.card-display');
      if (cardElement) {
        cardElement.classList.add('fadeOut');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
          setShowCard(false);
          // Don't show bank options modal, instead show bank button in main display
        }, 500); // Match this to the fadeOut animation duration
      } else {
        setShowCard(false);
      }
    }, totalDelay); // Show card for calculated delay before starting fadeOut
    
    // Check for special event (every 10 taps)
    if (calculatedRizzLevel % 10 === 0) {
      setShowSpecialEvent(true);
      setTimeout(() => setShowSpecialEvent(false), 3000);
    }
  };
  
  // Handle banking the score
  const handleBankScore = () => {
    if (rizzLevel > highScore) {
      setHighScore(rizzLevel);
    }
    // Reset game
    setRizzLevel(0);
    setStats({
      vibeLevel: 0,
      swagger: 0,
      cringeAvoidance: 0
    });
    setClickCount(0); // Reset click count when banking score
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative" style={{
      background: 'linear-gradient(135deg, var(--color-bg-primary, #2E0854) 0%, #5B0E91 50%, #FF1B6B 100%)',
      color: 'var(--color-text-primary, #FFFFFF)',
      overflowX: 'hidden',
      overflowY: 'auto'
    }}>
      {/* Buy Me a Coffee button - fixed in bottom right corner */}
      <a
        href="https://www.buymeacoffee.com/firemandecko"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 'clamp(5px, 1.5vmin, 10px)',
          right: 'clamp(5px, 1.5vmin, 10px)',
          zIndex: 9999,
          display: 'inline-block',
          backgroundColor: '#FFDD00',
          color: '#000000',
          padding: 'clamp(3px, 1vmin, 5px) clamp(10px, 3vmin, 15px)',
          borderRadius: 'var(--border-radius-sm, 0.5rem)',
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
      {/* Stars/sparkles background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            background: `radial-gradient(circle, ${
              ['#00F5D4', '#FEE440', '#F15BB5', '#00BBF9'][Math.floor(Math.random() * 4)]
            } 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: Math.random() * 0.5 + 0.5,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
          }} />
        ))}
      </div>

      {/* Main content container */}
      <div
        ref={containerRef}
        className="aspect-container aspect-ratio aspect-ratio-9-16"
        style={{
          position: 'relative',
          width: 'auto',
          height: 'min(95vh, calc(100vh - 20px))',
          maxHeight: '100vh',
          margin: '0 auto',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.5rem, 2vmin, 1rem)',
          overflowX: 'hidden',
          overflowY: 'auto', // Allow vertical scrolling when needed
          aspectRatio: '9/16'
        }}
      >
        {/* Debug overlay */}
        {showDebug && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'rgba(0,0,0,0.7)',
            color: 'var(--color-accent-3, #00F5D4)',
            padding: '4px 8px',
            fontSize: '10px',
            zIndex: 1000,
            fontFamily: 'monospace',
            borderRadius: '0 0 4px 0'
          }}>
            <div>Mode: {window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape'}</div>
            <div>Device: {window.innerWidth <= 768 ? 'Mobile' : 'Desktop'}</div>
            <div>Window: {window.innerWidth}x{window.innerHeight}</div>
            <div>Observed: {containerSize.width.toFixed(0)}x{containerSize.height.toFixed(0)}</div>
            <div>CSS Variables: {getComputedStyle(document.documentElement).getPropertyValue('--font-size-base')}</div>
          </div>
        )}

        {/* Game content */}
        <div className="flex flex-col items-center justify-center w-full h-full" style={{
          maxWidth: 'min(100%, 500px)',
          width: '100%',
          height: '100%',
          gap: 'clamp(0.5rem, 2vmin, 0.75rem)',
          transition: 'all 0.3s ease',
          overflowY: 'auto',
          padding: 'clamp(0.5rem, 2vmin, 1rem)',
          boxSizing: 'border-box'
        }}>
          {/* Header space - title removed */}
          <div style={{ height: '1rem' }}></div>
          
          {/* Horizontal line */}
          <div style={{
            width: '90%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #00F5D4 50%, transparent 100%)',
            boxShadow: '0 0 10px #00F5D4, 0 0 20px #00F5D4',
            margin: '0.25rem 0'
          }}></div>
          
          {/* Buttons Container - Both buttons in one component */}
          <div className="flex flex-col items-center justify-center w-full" style={{
            maxWidth: 'min(calc(100% - clamp(20px, 5vw, 50px)), 400px)',
            margin: 'clamp(0.25rem, 1.5vmin, 0.5rem) auto',
            gap: 'clamp(0.5rem, 2vmin, 0.75rem)', // Consistent spacing between buttons
            flex: '0 0 auto' // Prevent flex growth/shrink
          }}>
            {/* Rizz Button */}
            <div className="flex justify-center w-full" style={{
              margin: 'clamp(0.15rem, 1vmin, 0.25rem) 0'
            }}>
              <RizzButton onClick={handleRizzTap} disabled={showCard} />
            </div>
            
            {/* Bank Score Button - Only visible after first Rizz Up click */}
            <BankScoreButton
              onClick={handleBankScore}
              visible={!showCard && clickCount > 0}
            />
          </div>
          
          {/* Quote Display removed */}
          
          {/* Stats Panel */}
          <div className="flex flex-col w-[90%]" style={{
            padding: 'clamp(0.75rem, 3vmin, 1.25rem)',
            borderRadius: 'var(--border-radius-lg, 1rem)',
            background: 'rgba(46, 8, 84, 0.7)',
            boxShadow: `0 0 clamp(10px, 3vmin, 15px) rgba(0, 187, 249, 0.5),
                       inset 0 0 clamp(15px, 4vmin, 20px) rgba(0, 187, 249, 0.3)`,
            gap: 'clamp(0.3rem, 1.2vmin, 0.4rem)',
            flex: '0 0 auto' // Prevent flex growth/shrink
          }}>
            <h2 style={{
              fontSize: 'clamp(1rem, 3vmin, 1.1rem)',
              color: 'var(--color-accent-3, #00F5D4)',
              textAlign: 'center',
              marginBottom: 'clamp(0.15rem, 0.75vmin, 0.25rem)',
              textShadow: '0 0 5px var(--color-accent-3, #00F5D4)'
            }}>STATS PANEL</h2>
            
            <div className="flex justify-between items-center">
              <span style={{
                color: 'var(--color-accent-3, #00F5D4)',
                fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
                flex: 1,
                textAlign: 'left'
              }}>Vibe Level</span>
              <span style={{
                color: stats.vibeLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
                fontSize: 'clamp(0.95rem, 3vmin, 1.1rem)',
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }}>{stats.vibeLevel}</span>
              <span style={{
                fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
                flex: 1,
                textAlign: 'right'
              }}>{getEmojiForScore("Vibe Level", stats.vibeLevel)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span style={{
                color: 'var(--color-accent-3, #00F5D4)',
                fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
                flex: 1,
                textAlign: 'left'
              }}>Swagger</span>
              <span style={{
                color: stats.swagger >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
                fontSize: 'clamp(0.95rem, 3vmin, 1.1rem)',
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }}>{stats.swagger}</span>
              <span style={{
                fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
                flex: 1,
                textAlign: 'right'
              }}>{getEmojiForScore("Swagger", stats.swagger)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span style={{
                color: 'var(--color-accent-3, #00F5D4)',
                fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
                flex: 1,
                textAlign: 'left'
              }}>Cringe Avoidance</span>
              <span style={{
                color: stats.cringeAvoidance >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
                fontSize: 'clamp(0.95rem, 3vmin, 1.1rem)',
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }}>{stats.cringeAvoidance}</span>
              <span style={{
                fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
                flex: 1,
                textAlign: 'right'
              }}>{getEmojiForScore("Cringe Avoidance", stats.cringeAvoidance)}</span>
            </div>
          </div>
          
          {/* Rizz Level Panel - Separated for emphasis */}
          <div className="flex flex-col items-center w-[90%]" style={{
            padding: 'clamp(0.5rem, 2.5vmin, 1rem)',
            borderRadius: 'var(--border-radius-lg, 1rem)',
            background: 'rgba(46, 8, 84, 0.8)',
            boxShadow: `0 0 clamp(15px, 4vmin, 20px) rgba(241, 91, 181, 0.6),
                       inset 0 0 clamp(20px, 5vmin, 25px) rgba(241, 91, 181, 0.4)`,
            marginTop: 'clamp(0.25rem, 1.5vmin, 0.5rem)',
            flex: '0 0 auto' // Prevent flex growth/shrink
          }}>
            <h2 style={{
              fontSize: 'clamp(1.1rem, 3.5vmin, 1.2rem)',
              color: 'var(--color-accent-1, #F15BB5)',
              textAlign: 'center',
              marginBottom: 'clamp(0.15rem, 0.75vmin, 0.25rem)',
              textShadow: '0 0 8px var(--color-accent-1, #F15BB5)'
            }}>RIZZ LEVEL</h2>
            
            <div className="flex justify-center items-center" style={{
              gap: 'clamp(0.5rem, 3vmin, 1rem)'
            }}>
              <span style={{
                color: rizzLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
                fontSize: 'clamp(1.5rem, 6vmin, 2rem)',
                fontWeight: 'bold',
                textShadow: rizzLevel >= 0 ?
                  '0 0 clamp(5px, 2vmin, 10px) var(--color-accent-3, #00F5D4)' :
                  '0 0 clamp(5px, 2vmin, 10px) var(--color-accent-1, #F15BB5)'
              }}>{rizzLevel}</span>
              <span style={{
                fontSize: 'clamp(1.5rem, 6vmin, 2rem)'
              }}>{getEmojiForScore("Rizz Level", rizzLevel)}</span>
            </div>
          </div>
          
          {/* Card Display */}
          {showCard && currentCard && (
            <div
              className="card-display"
              style={{
                position: 'fixed', // Fixed positioning relative to viewport
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(85%, 300px)',
                height: 'auto',
                maxHeight: '80vh',
                padding: 'clamp(0.75rem, 3vmin, 1rem)',
                borderRadius: 'var(--border-radius-lg, 1rem)',
                background: 'rgba(46, 8, 84, 0.95)', // More opaque background
                boxShadow: `0 0 clamp(20px, 5vmin, 30px) rgba(241, 91, 181, 0.8),
                           0 0 clamp(40px, 10vmin, 60px) rgba(0, 187, 249, 0.8),
                           inset 0 0 clamp(15px, 4vmin, 20px) rgba(255, 255, 255, 0.6)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vmin, 0.75rem)',
                zIndex: 9999, // Highest z-index to ensure it appears above everything
                animation: 'cardEntrance 0.7s ease-out forwards, cardGlow 3s infinite',
                border: `4px solid var(--color-accent-3, #00F5D4)`,
                overflowY: 'auto'
              }}
            >
              <h3 style={{
                color: 'var(--color-accent-5, #FEE440)',
                fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
                textAlign: 'center',
                textShadow: `0 0 5px var(--color-accent-5, #FEE440)`,
                margin: 0
              }}>
                {currentCard.name}
              </h3>
              
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundImage: `url(${currentCard.path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                borderRadius: 'var(--border-radius-md, 0.75rem)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                marginTop: 'clamp(-5px, -1vmin, -2px)'
              }} />
              
              <p style={{
                color: 'white',
                fontSize: 'clamp(0.8rem, 2.5vmin, 0.9rem)',
                textAlign: 'center',
                margin: 'clamp(0.25rem, 1.5vmin, 0.5rem) 0'
              }}>
                {currentCard.description}
              </p>
              
              {currentAttributes && (
                <div style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
                  fontSize: 'clamp(0.7rem, 2.2vmin, 0.8rem)',
                  padding: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 'var(--border-radius-sm, 0.5rem)'
                }}>
                  <div style={{
                    color: currentAttributes.vibeLevel >= 0 ?
                      'var(--color-accent-3, #00F5D4)' :
                      'var(--color-accent-1, #F15BB5)'
                  }}>
                    Vibe Level: {currentAttributes.vibeLevel > 0 ? '+' : ''}{currentAttributes.vibeLevel}
                  </div>
                  <div style={{
                    color: currentAttributes.swagger >= 0 ?
                      'var(--color-accent-3, #00F5D4)' :
                      'var(--color-accent-1, #F15BB5)'
                  }}>
                    Swagger: {currentAttributes.swagger > 0 ? '+' : ''}{currentAttributes.swagger}
                  </div>
                  <div style={{
                    color: currentAttributes.cringeAvoidance >= 0 ?
                      'var(--color-accent-3, #00F5D4)' :
                      'var(--color-accent-1, #F15BB5)'
                  }}>
                    Cringe: {currentAttributes.cringeAvoidance > 0 ? '+' : ''}{currentAttributes.cringeAvoidance}
                  </div>
                  <div style={{
                    color: calculateRizzLevel(currentAttributes) >= 0 ?
                      'var(--color-accent-3, #00F5D4)' :
                      'var(--color-accent-1, #F15BB5)',
                    fontSize: 'clamp(0.9rem, 2.8vmin, 1rem)',
                    fontWeight: 'bold',
                    textShadow: calculateRizzLevel(currentAttributes) >= 0 ?
                      '0 0 5px var(--color-accent-3, #00F5D4)' :
                      '0 0 5px var(--color-accent-1, #F15BB5)',
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    marginTop: 'clamp(0.15rem, 0.75vmin, 0.25rem)'
                  }}>
                    Rizz: {calculateRizzLevel(currentAttributes) > 0 ? '+' : ''}{calculateRizzLevel(currentAttributes)}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* High Score Display */}
          <div className="flex justify-center items-center w-[90%]" style={{
            padding: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
            borderRadius: 'var(--border-radius-md, 0.75rem)',
            background: 'rgba(46, 8, 84, 0.5)',
            textAlign: 'center',
            marginTop: 'clamp(0.25rem, 1.5vmin, 0.5rem)',
            display: !showCard ? 'flex' : 'none',
            gap: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
            flex: '0 0 auto' // Prevent flex growth/shrink
          }}>
            <span style={{
              color: 'var(--color-accent-3, #00F5D4)',
              fontSize: 'clamp(0.8rem, 2.5vmin, 0.9rem)'
            }}>High Score:</span>
            <span style={{
              color: 'var(--color-accent-5, #FEE440)',
              fontSize: 'clamp(0.9rem, 3vmin, 1.1rem)',
              fontWeight: 'bold',
              textShadow: '0 0 5px var(--color-accent-5, #FEE440)'
            }}>{highScore}</span>
          </div>
          
          {/* Special Event */}
          {showSpecialEvent && (
            <div className="w-[90%] text-center" style={{
              padding: 'clamp(0.5rem, 2vmin, 0.75rem)',
              borderRadius: 'var(--border-radius-lg, 1rem)',
              background: 'rgba(155, 93, 229, 0.7)',
              boxShadow: '0 0 clamp(10px, 3vmin, 15px) rgba(155, 93, 229, 0.7)',
              animation: 'glitch 0.5s infinite',
              color: 'var(--color-accent-5, #FEE440)',
              fontWeight: 'bold',
              fontSize: 'clamp(0.9rem, 2.8vmin, 1rem)',
              textShadow: '0 0 5px var(--color-accent-5, #FEE440)',
              flex: '0 0 auto' // Prevent flex growth/shrink
            }}>
              ✨ Sigma Surge Activated! ✨
            </div>
          )}
          
          {/* Click Counter (for debugging) */}
          {showDebug && (
            <div className="w-[90%] text-center" style={{
              padding: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
              borderRadius: 'var(--border-radius-md, 0.75rem)',
              background: 'rgba(46, 8, 84, 0.5)',
              marginTop: 'clamp(0.25rem, 1.5vmin, 0.5rem)'
            }}>
              <span style={{
                color: 'var(--color-accent-3, #00F5D4)',
                fontSize: 'clamp(0.8rem, 2.5vmin, 0.9rem)'
              }}>Click Count: {clickCount}</span>
              <span style={{
                color: 'var(--color-accent-5, #FEE440)',
                fontSize: 'clamp(0.8rem, 2.5vmin, 0.9rem)',
                marginLeft: 'clamp(0.5rem, 2vmin, 1rem)'
              }}>
                Delay: {Math.min(1 + (clickCount * 0.2), 5).toFixed(1)}s
              </span>
            </div>
          )}
          
          {/* Footer with controls */}
          <div className="mt-auto text-center flex flex-col items-center w-full" style={{
            flex: '0 0 auto' // Prevent flex growth/shrink
          }}>
            
            {/* Controls row - hidden in small buttons */}
            <div className="w-full flex justify-between items-center" style={{
              marginTop: 'clamp(0.5rem, 3vmin, 1rem)',
              opacity: 0.5,
              fontSize: 'clamp(0.6rem, 2vmin, 0.7rem)'
            }}>
              <button style={{
                color: '#7E7E7E',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'clamp(0.2rem, 1vmin, 0.3rem)'
              }}>☰</button>
              
              <div
                style={{
                  color: '#7E7E7E',
                  cursor: 'pointer',
                  padding: 'clamp(0.2rem, 1vmin, 0.3rem)'
                }}
                onClick={() => setShowDebug(!showDebug)}
              >
                {showDebug ? '🔍' : '⚙️'}
              </div>
              
              <button
                onClick={toggleFullScreen}
                style={{
                  color: isFullscreen ? 'var(--color-accent-1, #F15BB5)' : '#7E7E7E',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 'clamp(0.2rem, 1vmin, 0.3rem)'
                }}
              >
                {isFullscreen ? '⤓' : '⤢'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
