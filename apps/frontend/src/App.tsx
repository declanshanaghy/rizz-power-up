import { useState } from 'react'
import './App.css'

function App() {
  const [rizzLevel, setRizzLevel] = useState(0)
  const [quote, setQuote] = useState('Tap the button to increase your Rizz!')
  
  // Sample quotes - in a real app, this would be a larger database
  const quotes = [
    "Your vibe just went up by 10 points!",
    "That's some serious swagger right there!",
    "Cringe levels decreasing... Rizz increasing!",
    "You're radiating pure charisma now!",
    "Your Rizz power is growing stronger!"
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
      vibeLevel: stats.vibeLevel + 1,
      swagger: stats.swagger + 1,
      cringeAvoidance: stats.cringeAvoidance + 1
    })
    
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    
    // Check for special event (every 10 taps)
    if (newRizzLevel % 10 === 0) {
      // In a full implementation, this would trigger special events
      console.log('Special event triggered!')
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Rizz Power-Up</h1>
        <p className="app-subtitle">Tap to increase your charisma!</p>
      </header>
      
      {/* Main Game Area */}
      <main className="main-content">
        {/* Quote Display */}
        <div className="quote-display">
          <p className="quote-text">{quote}</p>
        </div>
        
        {/* Rizz Button */}
        <button 
          className="rizz-button"
          onClick={handleRizzTap}
        >
          Power Up!
        </button>
        
        {/* Stats Panel */}
        <div className="stats-panel">
          <h2 className="stats-title">Your Stats</h2>
          <div className="stats-grid">
            <div>Rizz Level:</div>
            <div className="stat-value-rizz">{rizzLevel}</div>
            
            <div>Vibe Level:</div>
            <div className="stat-value-vibe">{stats.vibeLevel}</div>
            
            <div>Swagger:</div>
            <div className="stat-value-swagger">{stats.swagger}</div>
            
            <div>Cringe Avoidance:</div>
            <div className="stat-value-cringe">{stats.cringeAvoidance}</div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="app-footer">
        <p>Rizz Power-Up Simulator &copy; 2025</p>
      </footer>
    </div>
  )
}

export default App
