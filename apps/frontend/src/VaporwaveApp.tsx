import { useState } from 'react'

function VaporwaveApp() {
  const [rizzLevel, setRizzLevel] = useState(0)
  const [quote, setQuote] = useState('Tap the button to increase your Rizz!')
  const [showSpecialEvent, setShowSpecialEvent] = useState(false)
  
  // Sample quotes - expnand this list to at least 1000 later.
  // Ensure the final deployed build is compacted for efficiency.
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

  // Vaporwave-inspired styles using CSS variables for responsive design
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'clamp(1rem, 5vmin, 2rem)',
      backgroundColor: 'var(--color-bg-primary, #1A1A1A)',
      color: 'var(--color-text-primary, #FFFFFF)',
      fontFamily: '"Source Sans Pro", sans-serif',
      overflowX: 'hidden' as const
    },
    content: {
      maxWidth: 'min(90vw, 500px)',
      width: '100%'
    },
    title: {
      fontSize: 'clamp(1.25rem, 5vmin, 1.875rem)',
      textAlign: 'center' as const,
      fontFamily: '"Playfair Display", serif',
      color: 'var(--color-accent-1, #F15BB5)',
      marginBottom: 'clamp(0.5rem, 2vmin, 1rem)',
      textShadow: '0 0 5px #FFF'
    },
    quoteBox: {
      fontStyle: 'italic',
      padding: 'clamp(0.75rem, 3vmin, 1rem)',
      borderLeft: '4px solid var(--color-accent-2, #00BBF9)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      marginBottom: 'clamp(1rem, 4vmin, 1.5rem)',
      color: 'var(--color-accent-3, #00F5D4)',
      borderRadius: '0 var(--border-radius-sm, 0.5rem) var(--border-radius-sm, 0.5rem) 0'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: 'clamp(1rem, 4vmin, 1.5rem) 0',
      width: '100%'
    },
    neonButton: {
      background: 'linear-gradient(90deg, var(--color-accent-1, #F15BB5), var(--color-accent-2, #00BBF9))',
      color: 'white',
      fontWeight: 'bold',
      padding: 'clamp(0.75rem, 3vmin, 1rem) clamp(1.5rem, 6vmin, 2rem)',
      border: 'none',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      textShadow: '0 0 5px #FFF',
      boxShadow: '0 0 clamp(10px, 3vmin, 15px) var(--color-accent-1, #F15BB5)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      width: 'min(100%, 300px)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 'clamp(0.5rem, 2vmin, 0.75rem)',
      fontSize: 'clamp(0.8rem, 2.5vmin, 0.875rem)',
      backgroundColor: 'var(--color-bg-secondary, #2D2D2D)',
      padding: 'clamp(0.75rem, 3vmin, 1rem)',
      borderRadius: 'var(--border-radius-md, 0.75rem)',
      width: '100%'
    },
    rizzValue: { color: 'var(--color-accent-5, #FEE440)' },
    vibeValue: { color: 'var(--color-accent-3, #00F5D4)' },
    swaggerValue: { color: 'var(--color-accent-2, #00BBF9)' },
    cringeValue: { color: 'var(--color-accent-4, #9B5DE5)' },
    specialEvent: {
      marginTop: 'clamp(0.75rem, 3vmin, 1rem)',
      backgroundColor: 'rgba(155, 93, 229, 0.7)',
      textAlign: 'center' as const,
      color: 'var(--color-accent-5, #FEE440)',
      padding: 'clamp(0.5rem, 2vmin, 0.75rem)',
      borderRadius: 'var(--border-radius-md, 0.75rem)',
      animation: 'glitch 0.5s infinite',
      width: '100%'
    },
    footer: {
      marginTop: 'clamp(1rem, 4vmin, 1.5rem)',
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: 'clamp(0.75rem, 3vmin, 1rem)',
      width: '100%'
    },
    menuButton: {
      fontSize: 'clamp(0.75rem, 2.5vmin, 0.875rem)',
      color: '#7E7E7E',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 'clamp(0.25rem, 1vmin, 0.5rem)'
    },
    bmcContainer: {
      marginTop: 'clamp(0.75rem, 3vmin, 1rem)'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <h1 style={styles.title}>
          ⚡ RIZZ POWER-UP SIMULATOR
        </h1>
        
        {/* Quote Display */}
        <div style={styles.quoteBox}>
          <p>{quote}</p>
        </div>
        
        {/* Rizz Button */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.neonButton}
            onClick={handleRizzTap}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 0 clamp(15px, 4vmin, 20px) var(--color-accent-1, #F15BB5)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 0 clamp(10px, 3vmin, 15px) var(--color-accent-1, #F15BB5)`;
            }}
          >
            🔥 TAP TO RIZZ UP 🔥
          </button>
        </div>
        
        {/* Stats Panel */}
        <div style={styles.statsGrid}>
          <div>🚀 <strong>Rizz Level:</strong> <span style={styles.rizzValue}>{rizzLevel}</span></div>
          <div>🌊 <strong>Vibe Level:</strong> <span style={styles.vibeValue}>{stats.vibeLevel}</span></div>
          <div>😎 <strong>Swagger:</strong> <span style={styles.swaggerValue}>{stats.swagger}</span></div>
          <div>🧠 <strong>Cringe Avoidance:</strong> <span style={styles.cringeValue}>{stats.cringeAvoidance}</span></div>
        </div>
        
        {/* Special Event */}
        {showSpecialEvent && (
          <div style={styles.specialEvent}>
            ✨ Sigma Surge Activated! ✨
          </div>
        )}
        
        {/* Footer */}
        <div style={styles.footer}>
          <button style={styles.menuButton}>☰ Open Menu</button>
          <div style={styles.bmcContainer}>
            <a
              href="https://www.buymeacoffee.com/firemandecko"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '10px',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{
                  height: 'clamp(30px, 8vmin, 40px)',
                  width: 'auto',
                  maxWidth: '100%'
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaporwaveApp