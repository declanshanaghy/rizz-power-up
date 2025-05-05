import { useState } from 'react'

function VaporwaveApp() {
  const [rizzLevel, setRizzLevel] = useState(0)
  const [quote, setQuote] = useState('Tap the button to increase your Rizz!')
  const [showSpecialEvent, setShowSpecialEvent] = useState(false)
  
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

  // Vaporwave-inspired styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#1A1A1A',
      color: '#FFFFFF',
      fontFamily: '"Source Sans Pro", sans-serif'
    },
    content: {
      maxWidth: '500px',
      width: '100%'
    },
    title: {
      fontSize: '1.875rem',
      textAlign: 'center' as const,
      fontFamily: '"Playfair Display", serif',
      color: '#F15BB5',
      marginBottom: '0.5rem',
      textShadow: '0 0 5px #FFF'
    },
    quoteBox: {
      fontStyle: 'italic',
      padding: '1rem',
      borderLeft: '4px solid #00BBF9',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      marginBottom: '1.5rem',
      color: '#00F5D4'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '1.5rem 0'
    },
    neonButton: {
      background: 'linear-gradient(90deg, #F15BB5, #00BBF9)',
      color: 'white',
      fontWeight: 'bold',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '9999px',
      textShadow: '0 0 5px #FFF',
      boxShadow: '0 0 15px #F15BB5',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      fontSize: '0.875rem',
      backgroundColor: '#2D2D2D',
      padding: '1rem',
      borderRadius: '0.5rem'
    },
    rizzValue: { color: '#FEE440' },
    vibeValue: { color: '#00F5D4' },
    swaggerValue: { color: '#00BBF9' },
    cringeValue: { color: '#9B5DE5' },
    specialEvent: {
      marginTop: '1rem',
      backgroundColor: 'rgba(155, 93, 229, 0.7)',
      textAlign: 'center' as const,
      color: '#FEE440',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      animation: 'glitch 0.5s infinite'
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1rem'
    },
    menuButton: {
      fontSize: '0.875rem',
      color: '#7E7E7E',
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    },
    bmcContainer: {
      marginTop: '1rem'
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
                  height: '40px',
                  width: 'auto'
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