import { useState, useEffect, useCallback } from 'react'
import ButtonPanel from './ButtonPanel'
import StatsPanel from './StatsPanel'
import RizzLevelPanel from './RizzLevelPanel'
import SpecialEvent from './SpecialEvent'
import BankScoreModal from './BankScoreModal'
import { loadGameState, saveGameState, GameState } from './localStorage'
import { getRandomImage, MemeImage, generateAttributes, calculateRizzLevel } from './memeImages'
import attributeEmojis from './rizz_attributes_emojis'
import { generateSpecialEvent, shouldTriggerSpecialEvent, applySpecialEventToStats, SpecialEventData } from './SpecialEventUtils'
import {
  preloadSoundEffects,
  playButtonClickSound,
  playDealCardSound,
  playRizzLevelSound,
  playSpecialEventSound
} from './SoundEffects'

function VaporwaveApp() {
  // Game state
  const [rizzLevel, setRizzLevel] = useState(0)
  const [showSpecialEvent, setShowSpecialEvent] = useState(false)
  const [currentSpecialEvent, setCurrentSpecialEvent] = useState<SpecialEventData | null>(null)
  const [showCard, setShowCard] = useState(false)
  const [currentCard, setCurrentCard] = useState<MemeImage | null>(null)
  const [showBankModal, setShowBankModal] = useState(false)
  const [currentAttributes, setCurrentAttributes] = useState<{
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  } | null>(null)
  const [highScore, setHighScore] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  
  // Game timing
  const [cardDisplayTime, setCardDisplayTime] = useState(2000) // Default card display time in ms
  
  
  // Sample quotes - currently not used but kept for future implementation
  // const quotes = [
  //   "Your vibe just went up by 10 points!",
  //   "That's some serious swagger right there!",
  //   "Cringe levels decreasing... Rizz increasing!",
  //   "You're radiating pure charisma now!",
  //   "Your Rizz power is growing stronger!",
  //   "Your aura just disrupted the algorithm."
  // ]
  
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
      
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          transform: translate(-50%, -50%) scale(1.05);
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
    
    // Preload sound effects
    preloadSoundEffects();
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
      // Removed console log for high score to declutter
    }
  }, [highScore, rizzLevel, stats])
  
  // Handle button tap
  const handleRizzTap = () => {
    if (showCard) return; // Don't allow new cards while one is showing
    
    // Play button click sound
    playButtonClickSound();
    
    // Increment click count
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    // Get a random card
    const card = getRandomImage();
    
    // Generate attributes based on the card's bias
    const attributes = generateAttributes(card.bias);
    
    // Log score calculations
    console.log(`Card: ${card.name} (bias: ${card.bias.toFixed(2)})`);
    console.log(`Generated attributes:`, attributes);
    
    // Calculate if this is a "bad" card (negative total attributes)
    const totalCardEffect = attributes.vibeLevel + attributes.swagger + attributes.cringeAvoidance;
    const isBadCard = totalCardEffect < 0;
    
    // Play appropriate deal card sound based on card effect
    playDealCardSound(isBadCard);
    
    // Update stats based on the card's attributes
    let newStats = {
      vibeLevel: stats.vibeLevel + attributes.vibeLevel,
      swagger: stats.swagger + attributes.swagger,
      cringeAvoidance: stats.cringeAvoidance + attributes.cringeAvoidance
    };
    
    // Check if a special event should trigger (approximately every 18 taps)
    if (shouldTriggerSpecialEvent(newClickCount)) {
      // Generate a special event
    const specialEvent = generateSpecialEvent();
      
      // Apply the special event to the stats
      newStats = applySpecialEventToStats(newStats, specialEvent);
      
      // Set the current special event and show it
      setCurrentSpecialEvent(specialEvent);
      setShowSpecialEvent(true);
      
      // Play special event sound based on event type
      playSpecialEventSound(specialEvent.eventType === 'good');
      
      // Hide the special event after a delay
      setTimeout(() => {
        setShowSpecialEvent(false);
        setCurrentSpecialEvent(null);
      }, 3000);
    }
    
    // Calculate the new Rizz level as the sum of all attributes
    const newRizzLevel = newStats.vibeLevel + newStats.swagger + newStats.cringeAvoidance;
    
    // Log the updated stats and rizz level
    console.log(`Updated stats:`, newStats);
    console.log(`New Rizz Level: ${newRizzLevel}`);
    
    // Check if Rizz level has surpassed the high score
    if (rizzLevel <= highScore && newRizzLevel > highScore) {
      // Play celebratory sound when surpassing high score
      playRizzLevelSound();
    }
    
    // Update the stats and Rizz level
    setStats(newStats);
    setRizzLevel(newRizzLevel);
    
    // Get a random quote (not used currently)
    // const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    
    // Set the current card and attributes for display
    setCurrentCard(card);
    setCurrentAttributes(attributes);
    setShowCard(true);
    
    // Make card disappear after a delay with animation - using dynamic timing
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
    }, cardDisplayTime);
  }
  
  // Handle banking the score
  const handleBankScore = () => {
    // Show the bank score modal instead of immediately playing sound
    setShowBankModal(true);
    
    const newHighScore = rizzLevel > highScore ? rizzLevel : highScore;
    
    // Update high score if current rizz level is higher
    if (rizzLevel > highScore) {
      setHighScore(newHighScore);
    }
  };
  
  // Handle closing the bank score modal
  const handleCloseBankModal = () => {
    setShowBankModal(false);
    
    // Reset game after modal is closed
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
    // Play button click sound
    playButtonClickSound();
    
    // Reset game without updating high score
    setRizzLevel(0);
    setStats({
      vibeLevel: 0,
      swagger: 0,
      cringeAvoidance: 0
    });
    setClickCount(0); // Reset click count when giving up
    setCardDisplayTime(2000); // Reset card display time
  };
  
  // Handle card click to dismiss it
  const handleCardClick = useCallback(() => {
    if (!showCard) return;
    
    // Play button click sound
    playButtonClickSound();
    
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
  }, [showCard]);

  // Helper function to get emoji for attribute score
  const getEmojiForScore = (attribute: string, score: number) => {
    // Clamp the score to the -5000 to 5000 range
    const clampedScore = Math.max(-5000, Math.min(5000, score));
    
    // Round to the nearest 250 to match the TypeScript structure
    const roundedScore = Math.round(clampedScore / 250) * 250;
    
    // Log the score scaling for debugging
    console.log(`Score scaling: original=${score}, clamped=${clampedScore}, rounded=${roundedScore}`);
    
    // Get the appropriate attribute mapping
    const attributeMap = attributeEmojis[attribute as keyof typeof attributeEmojis];
    if (!attributeMap) return '❓'; // Fallback emoji if attribute not found
    
    // Try to get the emoji directly using the rounded score as a number
    let emoji = attributeMap[roundedScore];
    
    // If no exact match, find the closest available score
    if (!emoji) {
      const availableScores = Object.keys(attributeMap)
        .map(Number)
        .sort((a, b) => a - b);
      
      let closestScore = availableScores[0];
      for (const availableScore of availableScores) {
        if (Math.abs(availableScore - roundedScore) < Math.abs(closestScore - roundedScore)) {
          closestScore = availableScore;
        }
      }
      
      emoji = attributeMap[closestScore];
    }
    
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
              overflowY: 'auto',
              cursor: 'pointer' // Add pointer cursor to indicate clickability
            }}
            onClick={handleCardClick} // Add click handler to dismiss card
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
        {showSpecialEvent && currentSpecialEvent && (
          <SpecialEvent
            isVisible={showSpecialEvent}
            eventType={currentSpecialEvent.eventType}
            statChange={currentSpecialEvent.statChange}
            statType={currentSpecialEvent.statType}
          />
        )}
        
        {/* Bank Score Modal */}
        <BankScoreModal
          isOpen={showBankModal}
          onClose={handleCloseBankModal}
        />
        
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