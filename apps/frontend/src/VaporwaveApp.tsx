import { useState, useEffect } from 'react'
import ButtonPanel from './ButtonPanel'
import StatsPanel from './StatsPanel'
import RizzLevelPanel from './RizzLevelPanel'
import { loadGameState, saveGameState, GameState } from './localStorage'
import { getRandomImage, MemeImage, generateAttributes, calculateRizzLevel } from './memeImages'
import attributeEmojis from './rizz_attributes_emojis.json'

function VaporwaveApp() {
  // Game state
  const [rizzLevel, setRizzLevel] = useState(0)
  const [quote, setQuote] = useState('Tap the button to increase your Rizz!')
  const [showSpecialEvent, setShowSpecialEvent] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [currentCard, setCurrentCard] = useState<MemeImage | null>(null)
  const [currentAttributes, setCurrentAttributes] = useState<{
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  } | null>(null)
  const [highScore, setHighScore] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  
  // Sample quotes - expand this list to at least 1000 later.
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
  
  // Add keyframe animations for cards
  useEffect(() => {
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
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // Load saved game state from localStorage on initial render
  useEffect(() => {
    const savedState = loadGameState()
    if (savedState) {
      setHighScore(savedState.highScore)
    }
  }, [])
  
  // Save high score to localStorage whenever it changes
  useEffect(() => {
    // Only save if high score is greater than 0
    if (highScore > 0) {
      const gameState: GameState = {
        rizzLevel: rizzLevel,
        stats: stats,
        highScore: highScore
      };
      saveGameState(gameState);
      console.log("High score saved to localStorage:", highScore);
    }
  }, [highScore, rizzLevel, stats])
  
  // Handle button tap
  const handleRizzTap = () => {
    if (showCard) return; // Don't allow new cards while one is showing
    
    // Increment click count
    setClickCount(prevCount => prevCount + 1);
    
    // Get a random card and display it
    const card = getRandomImage();
    const attributes = generateAttributes(card.bias);
    
    // Update stats based on the card's attributes
    const newStats = {
      vibeLevel: stats.vibeLevel + attributes.vibeLevel,
      swagger: stats.swagger + attributes.swagger,
      cringeAvoidance: stats.cringeAvoidance + attributes.cringeAvoidance
    };
    
    // Calculate the new Rizz level as the sum of all attributes
    const newRizzLevel = newStats.vibeLevel + newStats.swagger + newStats.cringeAvoidance;
    
    // Update the stats and Rizz level
    setStats(newStats);
    setRizzLevel(newRizzLevel);
    
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    
    // Set the current card and attributes for display
    setCurrentCard(card);
    setCurrentAttributes(attributes);
    setShowCard(true);
    
    // Make card disappear after a delay with animation
    setTimeout(() => {
      // Add fadeOut class to the card
      const cardElement = document.querySelector('.card-display');
      if (cardElement) {
        cardElement.classList.add('fadeOut');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
          setShowCard(false);
        }, 500); // Match this to the fadeOut animation duration
      } else {
        setShowCard(false);
      }
    }, 3000);
    
    // Check for special event (every 10 taps)
    if (newRizzLevel % 10 === 0) {
      setShowSpecialEvent(true)
      setTimeout(() => setShowSpecialEvent(false), 3000)
    }
  }
  
  // Handle banking the score
  const handleBankScore = () => {
    const newHighScore = rizzLevel > highScore ? rizzLevel : highScore;
    
    // Update high score if current rizz level is higher
    if (rizzLevel > highScore) {
      setHighScore(newHighScore);
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

  // Handle giving up (reset game without updating high score)
  const handleGiveUp = () => {
    // Reset game without updating high score
    setRizzLevel(0);
    setStats({
      vibeLevel: 0,
      swagger: 0,
      cringeAvoidance: 0
    });
    setClickCount(0); // Reset click count when giving up
  };

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
  
  // Vaporwave-inspired styles using CSS variables for responsive design
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      padding: 'clamp(1rem, 5vmin, 2rem)',
      paddingTop: 'clamp(0.5rem, 2vmin, 1rem)',
      backgroundColor: 'var(--color-bg-primary, #1A1A1A)',
      color: 'var(--color-text-primary, #FFFFFF)',
      fontFamily: '"Source Sans Pro", sans-serif',
      overflowX: 'hidden' as const
    },
    content: {
      maxWidth: 'min(90vw, 500px)',
      width: '100%',
      marginTop: 0
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
        {/* Button Panel - with swapped button order */}
        <ButtonPanel
          rizzLevel={rizzLevel}
          highScore={highScore}
          clickCount={clickCount}
          showCard={showCard}
          onRizzTap={handleRizzTap}
          onBankScore={handleBankScore}
          onGiveUp={handleGiveUp}
        />
        
        {/* Stats Panel - with Vibe Level, Swagger, and Cringe Avoidance */}
        <StatsPanel stats={stats} getEmojiForScore={getEmojiForScore} />
        
        {/* Rizz Level Panel - separate component */}
        <RizzLevelPanel rizzLevel={rizzLevel} getEmojiForScore={getEmojiForScore} />
        
        {/* High Score Display moved to footer */}
        
        {/* Card Display */}
        {showCard && currentCard && (
          <div
            className="card-display"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(90%, 400px)', // Wider container for better layout
              height: 'auto',
              maxHeight: '85vh', // Slightly more vertical space
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(0.5rem, 2vmin, 0.75rem)',
              borderRadius: 'var(--border-radius-lg, 1rem)',
              background: 'rgba(46, 8, 84, 0.95)',
              boxShadow: `0 0 clamp(20px, 5vmin, 30px) rgba(241, 91, 181, 0.8),
                         0 0 clamp(40px, 10vmin, 60px) rgba(0, 187, 249, 0.8),
                         inset 0 0 clamp(15px, 4vmin, 20px) rgba(255, 255, 255, 0.6)`,
              alignItems: 'center',
              gap: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
              zIndex: 9999,
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
              width: '66%', // Scale down to 2/3 of container width
              aspectRatio: '2/3', // Match the 1024 × 1536 aspect ratio
              backgroundImage: `url(${currentCard.path})`,
              backgroundSize: 'contain', // Maintain aspect ratio without cropping
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 'var(--border-radius-md, 0.75rem)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              marginTop: 'clamp(-5px, -1vmin, -2px)',
              alignSelf: 'center' // Center horizontally within parent
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
        
        {/* Special Event */}
        {showSpecialEvent && (
          <div style={styles.specialEvent}>
            ✨ Sigma Surge Activated! ✨
          </div>
        )}
        
        {/* Footer */}
        <div style={{
          ...styles.footer,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Buy Me A Coffee button */}
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
          
          {/* High Score Display */}
          <div style={{
            padding: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
            borderRadius: 'var(--border-radius-md, 0.75rem)',
            background: 'rgba(46, 8, 84, 0.7)',
            textAlign: 'center',
            display: 'flex',
            gap: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px'
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
        </div>
      </div>
    </div>
  )
}

export default VaporwaveApp