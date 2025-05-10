import { useState, useEffect, useRef } from 'react'
import RizzButton from './RizzButton'
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
  const [containerDimensions, setContainerDimensions] = useState({ width: '95vw', height: 'auto' })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // State to track content scaling factor and screen size
  const [contentScale, setContentScale] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth)
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
  
  // Function to calculate optimal dimensions for 18:9 aspect ratio
  const calculateOptimalDimensions = () => {
    try {
      // Get current window dimensions
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const isPortrait = windowHeight > windowWidth
      
      // Determine if we're on a mobile device
      const isMobileDevice = windowWidth <= 768
      setIsMobile(isMobileDevice)
      
      // Use a more flexible approach to aspect ratio
      // Default target is 18:9 (2:1) but we'll adjust based on device orientation
      let targetAspectRatio = 18 / 9 // Default 2:1 ratio
      
      // Adjust aspect ratio based on orientation for better fit
      if (isPortrait) {
        // In portrait, use a taller container (less wide)
        targetAspectRatio = isMobileDevice ? 9 / 16 : 9 / 14
      }
      
      // Calculate available space (with margins)
      const maxWidth = windowWidth * (isMobileDevice ? 0.98 : 0.95)
      const maxHeight = windowHeight * (isMobileDevice ? 0.98 : 0.95)
      
      // Calculate dimensions based on available space and target aspect ratio
      let width, height
      
      if (maxWidth / maxHeight > targetAspectRatio) {
        // Window is wider than our target aspect ratio
        height = maxHeight
        width = height * targetAspectRatio
      } else {
        // Window is taller than our target aspect ratio
        width = maxWidth
        height = width / targetAspectRatio
      }
      
      // Calculate content scaling factor based on container size
      // Base design width varies based on orientation
      const baseWidth = isPortrait ? 400 : 500
      
      // Adjust scaling limits based on device type
      const minScale = isMobileDevice ? 0.65 : 0.75
      const maxScale = isMobileDevice ? 1.35 : 1.25
      
      const scaleFactor = Math.max(minScale, Math.min(maxScale, width / baseWidth))
      
      setContentScale(scaleFactor)
      setContainerDimensions({
        width: `${width}px`,
        height: `${height}px`
      })
      
      // Log dimensions for debugging
      if (showDebug) {
        console.log(`Window: ${windowWidth}x${windowHeight}, Container: ${width}x${height}, Scale: ${scaleFactor}`)
      }
    } catch (error) {
      // Fallback for browsers with issues
      console.warn('Error calculating dimensions, using fallback', error)
      const isPortrait = window.innerHeight > window.innerWidth
      
      if (isPortrait) {
        setContainerDimensions({
          width: '95vw',
          height: '170vw' // Taller in portrait
        })
      } else {
        setContainerDimensions({
          width: '95vw',
          height: '47.5vw' // 95vw ÷ 2 for 18:9 ratio in landscape
        })
      }
    }
  }
  
  // Set up resize listener and fullscreen change detection
  // Use ResizeObserver for more accurate container size tracking
  useEffect(() => {
    // Add keyframe animations
    addKeyframeStyles();
    
    calculateOptimalDimensions()
    
    const handleResize = () => {
      const newIsPortrait = window.innerHeight > window.innerWidth
      if (isPortrait !== newIsPortrait) {
        setIsPortrait(newIsPortrait)
      }
      calculateOptimalDimensions()
    }
    
    const handleOrientationChange = () => {
      // Add a small delay to ensure dimensions are calculated after orientation change completes
      setTimeout(() => {
        setIsPortrait(window.innerHeight > window.innerWidth)
        calculateOptimalDimensions()
      }, 100)
    }
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      // Recalculate dimensions after fullscreen change
      setTimeout(calculateOptimalDimensions, 100)
    }
    
    // Initial check for mobile
    setIsMobile(window.innerWidth <= 768)
    
    // Add event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)
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
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [showDebug, isPortrait]) // Add dependencies
  
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
    // More clicks = slower return (up to max 5 seconds)
    // Minimum delay is 1 second, maximum is 5 seconds
    const baseDelay = 1000; // 1 second base delay
    const clickFactor = Math.min(clickCount * 200, 4000); // 200ms per click, max 4000ms additional
    const totalDelay = baseDelay + clickFactor; // Between 1000ms and 5000ms
    
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2E0854 0%, #5B0E91 50%, #FF1B6B 100%)',
      color: '#FFFFFF',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Buy Me a Coffee button - fixed in bottom right corner */}
      <a
        href="https://www.buymeacoffee.com/firemandecko"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: isMobile ? '5px' : '10px',
          right: isMobile ? '5px' : '10px',
          zIndex: 9999,
          display: 'inline-block',
          backgroundColor: '#FFDD00',
          color: '#000000',
          padding: isMobile ? '3px 10px' : '5px 15px',
          borderRadius: '5px',
          fontFamily: 'Cookie, cursive',
          fontSize: isMobile ? '16px' : '18px',
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
        className="aspect-container"
        style={{
          position: 'relative',
          width: containerDimensions.width,
          height: containerDimensions.height,
          margin: '0 auto',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '0.5rem' : '1rem',
          overflow: 'hidden' // Ensure content stays within container
        }}
      >
        {/* Debug overlay */}
        {showDebug && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'rgba(0,0,0,0.7)',
            color: '#00F5D4',
            padding: '4px 8px',
            fontSize: '10px',
            zIndex: 1000,
            fontFamily: 'monospace',
            borderRadius: '0 0 4px 0'
          }}>
            <div>Mode: {isPortrait ? 'Portrait' : 'Landscape'}</div>
            <div>Device: {isMobile ? 'Mobile' : 'Desktop'}</div>
            <div>Window: {window.innerWidth}x{window.innerHeight}</div>
            <div>Container: {containerDimensions.width}x{containerDimensions.height}</div>
            <div>Observed: {containerSize.width.toFixed(0)}x{containerSize.height.toFixed(0)}</div>
            <div>Scale: {contentScale.toFixed(2)}x</div>
          </div>
        )}

        {/* Game content */}
        <div style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? '0.5rem' : '0.75rem', // Reduced gap between elements
          transform: `scale(${contentScale})`,
          transformOrigin: 'center center', // Center origin for better scaling
          transition: 'transform 0.3s ease',
          height: '100%',
          justifyContent: 'center', // Center content vertically
          // Prevent content from overflowing during scaling
          maxHeight: isPortrait ? '170vh' : '80vh',
          overflowY: 'hidden'
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
          
          {/* Rizz Button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.25rem 0' }}>
            <RizzButton onClick={handleRizzTap} disabled={showCard} />
          </div>
          
          {/* Bank Score Button - Always visible */}
          {!showCard && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
              <button
                onClick={handleBankScore}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #F15BB5, #9B5DE5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(241, 91, 181, 0.7)',
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.7)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(241, 91, 181, 0.9)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(241, 91, 181, 0.7)';
                }}
              >
                💰 Bank Your Score
              </button>
            </div>
          )}
          
          {/* Quote Display removed */}
          
          {/* Stats Panel */}
          <div style={{
            width: '90%',
            padding: isMobile ? '1rem' : '1.25rem',
            borderRadius: '20px',
            background: 'rgba(46, 8, 84, 0.7)',
            boxShadow: '0 0 15px rgba(0, 187, 249, 0.5), inset 0 0 20px rgba(0, 187, 249, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            <h2 style={{
              fontSize: '1.1rem',
              color: '#00F5D4',
              textAlign: 'center',
              marginBottom: '0.25rem',
              textShadow: '0 0 5px #00F5D4'
            }}>STATS PANEL</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '0.95rem', flex: 1, textAlign: 'left' }}>Vibe Level</span>
              <span style={{
                color: stats.vibeLevel >= 0 ? '#00F5D4' : '#F15BB5',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }}>{stats.vibeLevel}</span>
              <span style={{ fontSize: '1.2rem', flex: 1, textAlign: 'right' }}>{getEmojiForScore("Vibe Level", stats.vibeLevel)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '0.95rem', flex: 1, textAlign: 'left' }}>Swagger</span>
              <span style={{
                color: stats.swagger >= 0 ? '#00F5D4' : '#F15BB5',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }}>{stats.swagger}</span>
              <span style={{ fontSize: '1.2rem', flex: 1, textAlign: 'right' }}>{getEmojiForScore("Swagger", stats.swagger)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '0.95rem', flex: 1, textAlign: 'left' }}>Cringe Avoidance</span>
              <span style={{
                color: stats.cringeAvoidance >= 0 ? '#00F5D4' : '#F15BB5',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }}>{stats.cringeAvoidance}</span>
              <span style={{ fontSize: '1.2rem', flex: 1, textAlign: 'right' }}>{getEmojiForScore("Cringe Avoidance", stats.cringeAvoidance)}</span>
            </div>
          </div>
          
          {/* Rizz Level Panel - Separated for emphasis */}
          <div style={{
            width: '90%',
            padding: isMobile ? '0.75rem' : '1rem',
            borderRadius: '20px',
            background: 'rgba(46, 8, 84, 0.8)',
            boxShadow: '0 0 20px rgba(241, 91, 181, 0.6), inset 0 0 25px rgba(241, 91, 181, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '0.5rem'
          }}>
            <h2 style={{
              fontSize: '1.2rem',
              color: '#F15BB5',
              textAlign: 'center',
              marginBottom: '0.25rem',
              textShadow: '0 0 8px #F15BB5'
            }}>RIZZ LEVEL</h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                color: rizzLevel >= 0 ? '#00F5D4' : '#F15BB5',
                fontSize: '2rem',
                fontWeight: 'bold',
                textShadow: rizzLevel >= 0 ? '0 0 10px #00F5D4' : '0 0 10px #F15BB5'
              }}>{rizzLevel}</span>
              <span style={{
                fontSize: '2rem'
              }}>{getEmojiForScore("Rizz Level", rizzLevel)}</span>
            </div>
          </div>
          
          {/* Card Display */}
          {showCard && currentCard && (
            <div
              className="card-display"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.9)',
                width: '80%',
                maxWidth: '350px',
                padding: '1rem',
                borderRadius: '15px',
                background: 'rgba(46, 8, 84, 0.9)',
                boxShadow: '0 0 20px rgba(241, 91, 181, 0.7), 0 0 40px rgba(0, 187, 249, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                zIndex: 100,
                animation: 'cardEntrance 0.7s ease-out forwards, cardGlow 3s infinite',
                border: '3px solid #00F5D4'
              }}
            >
              <h3 style={{
                color: '#FEE440',
                fontSize: '1.2rem',
                textAlign: 'center',
                textShadow: '0 0 5px #FEE440',
                margin: 0
              }}>
                {currentCard.name}
              </h3>
              
              <div style={{
                width: '100%',
                height: '220px',
                backgroundImage: `url(${currentCard.path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                marginTop: '-5px'
              }} />
              
              <p style={{
                color: 'white',
                fontSize: '0.9rem',
                textAlign: 'center',
                margin: '0.5rem 0'
              }}>
                {currentCard.description}
              </p>
              
              {currentAttributes && (
                <div style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px'
                }}>
                  <div style={{ color: currentAttributes.vibeLevel >= 0 ? '#00F5D4' : '#F15BB5' }}>
                    Vibe Level: {currentAttributes.vibeLevel > 0 ? '+' : ''}{currentAttributes.vibeLevel}
                  </div>
                  <div style={{ color: currentAttributes.swagger >= 0 ? '#00F5D4' : '#F15BB5' }}>
                    Swagger: {currentAttributes.swagger > 0 ? '+' : ''}{currentAttributes.swagger}
                  </div>
                  <div style={{ color: currentAttributes.cringeAvoidance >= 0 ? '#00F5D4' : '#F15BB5' }}>
                    Cringe: {currentAttributes.cringeAvoidance > 0 ? '+' : ''}{currentAttributes.cringeAvoidance}
                  </div>
                  <div style={{
                    color: calculateRizzLevel(currentAttributes) >= 0 ? '#00F5D4' : '#F15BB5',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textShadow: calculateRizzLevel(currentAttributes) >= 0 ? '0 0 5px #00F5D4' : '0 0 5px #F15BB5',
                    gridColumn: '1 / span 2',
                    textAlign: 'center',
                    marginTop: '0.25rem'
                  }}>
                    Rizz: {calculateRizzLevel(currentAttributes) > 0 ? '+' : ''}{calculateRizzLevel(currentAttributes)}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* High Score Display */}
          <div style={{
            width: '90%',
            padding: '0.5rem',
            borderRadius: '10px',
            background: 'rgba(46, 8, 84, 0.5)',
            textAlign: 'center',
            marginTop: '0.5rem',
            display: !showCard ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: '#00F5D4', fontSize: '0.9rem' }}>High Score:</span>
            <span style={{
              color: '#FEE440',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textShadow: '0 0 5px #FEE440'
            }}>{highScore}</span>
          </div>
          
          {/* Special Event */}
          {showSpecialEvent && (
            <div style={{
              width: '90%',
              padding: '0.75rem',
              borderRadius: '20px',
              background: 'rgba(155, 93, 229, 0.7)',
              boxShadow: '0 0 15px rgba(155, 93, 229, 0.7)',
              textAlign: 'center',
              animation: 'glitch 0.5s infinite',
              color: '#FEE440',
              fontWeight: 'bold',
              fontSize: '1rem',
              textShadow: '0 0 5px #FEE440'
            }}>
              ✨ Sigma Surge Activated! ✨
            </div>
          )}
          
          {/* Click Counter (for debugging) */}
          {showDebug && (
            <div style={{
              width: '90%',
              padding: '0.5rem',
              borderRadius: '10px',
              background: 'rgba(46, 8, 84, 0.5)',
              textAlign: 'center',
              marginTop: '0.5rem'
            }}>
              <span style={{ color: '#00F5D4', fontSize: '0.9rem' }}>Click Count: {clickCount}</span>
              <span style={{ color: '#FEE440', fontSize: '0.9rem', marginLeft: '1rem' }}>
                Delay: {Math.min(1 + (clickCount * 0.2), 5).toFixed(1)}s
              </span>
            </div>
          )}
          
          {/* Footer with controls */}
          <div style={{
            marginTop: 'auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            
            {/* Controls row - hidden in small buttons */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
              opacity: 0.5,
              fontSize: '0.7rem'
            }}>
              <button style={{
                color: '#7E7E7E',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}>☰</button>
              
              <div
                style={{ color: '#7E7E7E', cursor: 'pointer' }}
                onClick={() => setShowDebug(!showDebug)}
              >
                {showDebug ? '🔍' : '⚙️'}
              </div>
              
              <button
                onClick={toggleFullScreen}
                style={{
                  color: isFullscreen ? '#F15BB5' : '#7E7E7E',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
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
