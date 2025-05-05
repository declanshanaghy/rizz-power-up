import { useState, useEffect, useRef } from 'react'

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
  const [quote, setQuote] = useState('Tap the button to increase your Rizz!')
  const [showSpecialEvent, setShowSpecialEvent] = useState(false)
  const [containerDimensions, setContainerDimensions] = useState({ width: '95vw', height: 'auto' })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // State to track content scaling factor and screen size
  const [contentScale, setContentScale] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  
  // Function to calculate optimal dimensions for 18:9 aspect ratio
  const calculateOptimalDimensions = () => {
    try {
      const aspectRatio = 18 / 9 // 2:1 ratio
      const maxWidth = window.innerWidth * 0.95
      const maxHeight = window.innerHeight * 0.95
      
      // Calculate dimensions based on available space
      let width, height
      
      if (maxWidth / maxHeight > aspectRatio) {
        // Window is wider than our target aspect ratio
        height = maxHeight
        width = height * aspectRatio
      } else {
        // Window is taller than our target aspect ratio
        width = maxWidth
        height = width / aspectRatio
      }
      
      // Calculate content scaling factor based on container size
      // This helps ensure text and UI elements scale appropriately
      const baseWidth = 500 // Base design width
      const scaleFactor = Math.max(0.75, Math.min(1.25, width / baseWidth))
      
      setContentScale(scaleFactor)
      setContainerDimensions({
        width: `${width}px`,
        height: `${height}px`
      })
    } catch (error) {
      // Fallback for browsers with issues
      console.warn('Error calculating dimensions, using fallback', error)
      setContainerDimensions({
        width: '95vw',
        height: '47.5vw' // 95vw ÷ 2 for 18:9 ratio
      })
    }
  }
  
  // Set up resize listener and fullscreen change detection
  useEffect(() => {
    calculateOptimalDimensions()
    
    const handleResize = () => {
      calculateOptimalDimensions()
      // Check if screen is mobile size
      setIsMobile(window.innerWidth <= 768)
    }
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    // Initial check for mobile
    setIsMobile(window.innerWidth <= 768)
    
    window.addEventListener('resize', handleResize)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])
  
  // Sample quotes - in a real app, this would be a larger database
  const quotes = [
    "Your vibe just went up by 10 points!",
    "That's some serious swagger right there!",
    "Cringe levels decreasing... Rizz increasing!",
    "You're radiating pure charisma now!",
    "Your Rizz power is growing stronger!",
    "Your aura just disrupted the algorithm."
  ]
  
  // Stats that increase with each tap
  const [stats, setStats] = useState({
    vibeLevel: 0,
    swagger: 0,
    cringeAvoidance: 0
  })
  
  // Handle button tap
  const handleRizzTap = () => {
    // Increase Rizz level
    const newRizzLevel = rizzLevel + 1
    setRizzLevel(newRizzLevel)
    
    // Update stats
    setStats({
      vibeLevel: stats.vibeLevel + Math.floor(Math.random() * 3) + 1,
      swagger: stats.swagger + Math.floor(Math.random() * 3) + 1,
      cringeAvoidance: stats.cringeAvoidance + Math.floor(Math.random() * 3) + 1
    })
    
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    
    // Check for special event (every 10 taps)
    if (newRizzLevel % 10 === 0) {
      setShowSpecialEvent(true)
      setTimeout(() => setShowSpecialEvent(false), 3000)
    }
  }

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
          padding: '1rem'
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
            <div>Aspect: 18:9 (2:1)</div>
            <div>Width: {containerDimensions.width}</div>
            <div>Height: {containerDimensions.height}</div>
            <div>Scale: {contentScale.toFixed(2)}x</div>
          </div>
        )}

        {/* Game content */}
        <div style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          transform: `scale(${contentScale})`,
          transformOrigin: 'center top',
          transition: 'transform 0.2s ease'
        }}>
          {/* Header */}
          <h1 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            fontFamily: '"Playfair Display", serif',
            color: '#FF1B6B',
            textShadow: '0 0 10px #FF1B6B, 0 0 20px #FF1B6B, 0 0 30px #FF1B6B',
            marginBottom: '0.5rem',
            lineHeight: '1.2',
            letterSpacing: '2px'
          }}>
            RIZZ POWER-UP<br/>SIMULATOR
          </h1>
          
          {/* Horizontal line */}
          <div style={{
            width: '90%',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #00F5D4 50%, transparent 100%)',
            boxShadow: '0 0 10px #00F5D4, 0 0 20px #00F5D4',
            margin: '0.5rem 0'
          }}></div>
          
          {/* Rizz Button */}
          <button
            onClick={handleRizzTap}
            style={{
              background: 'linear-gradient(90deg, #FF1B6B, #FFA07A)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              padding: '1rem 3rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 0 15px #FF1B6B, 0 0 25px rgba(255, 27, 107, 0.5)',
              textShadow: '0 0 5px #FFF',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          >
            RIZZ UP
          </button>
          
          {/* Quote Display */}
          <div style={{
            width: '90%',
            padding: '1.5rem',
            borderRadius: '20px',
            background: 'rgba(46, 8, 84, 0.7)',
            boxShadow: '0 0 10px #9B5DE5, inset 0 0 20px rgba(155, 93, 229, 0.3)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              left: '30px',
              width: '30px',
              height: '30px',
              background: 'rgba(46, 8, 84, 0.7)',
              transform: 'rotate(45deg)',
              zIndex: -1
            }}></div>
            <p style={{
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'white'
            }}>{quote}</p>
          </div>
          
          {/* Stats Panel */}
          <div style={{
            width: '90%',
            padding: '1.5rem',
            borderRadius: '20px',
            background: 'rgba(46, 8, 84, 0.7)',
            boxShadow: '0 0 10px #00BBF9, inset 0 0 20px rgba(0, 187, 249, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <h2 style={{
              fontSize: '1.2rem',
              color: '#00F5D4',
              textAlign: 'center',
              marginBottom: '0.5rem',
              textShadow: '0 0 5px #00F5D4'
            }}>STATS PANEL</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '1.1rem' }}>Vibe Level</span>
              <span style={{ fontSize: '1.1rem' }}>🌊</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '1.1rem' }}>Swagger</span>
              <span style={{ fontSize: '1.1rem' }}>😎</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '1.1rem' }}>Cringe Avoidance</span>
              <span style={{ fontSize: '1.1rem' }}>🧠</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#00F5D4', fontSize: '1.1rem' }}>Rizz Level</span>
              <span style={{ color: '#00F5D4', fontSize: '1.5rem', fontWeight: 'bold' }}>{rizzLevel}</span>
            </div>
          </div>
          
          {/* Special Event */}
          {showSpecialEvent && (
            <div style={{
              width: '90%',
              padding: '1rem',
              borderRadius: '20px',
              background: 'rgba(155, 93, 229, 0.7)',
              boxShadow: '0 0 15px #9B5DE5',
              textAlign: 'center',
              animation: 'glitch 0.5s infinite',
              color: '#FEE440',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textShadow: '0 0 5px #FEE440'
            }}>
              ✨ Sigma Surge Activated! ✨
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
