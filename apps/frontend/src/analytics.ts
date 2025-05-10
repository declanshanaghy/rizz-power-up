import ReactGA from 'react-ga4';

// Google Analytics Measurement ID
const MEASUREMENT_ID = 'G-Y815G3KT82';

// Initialize Google Analytics
export const initializeGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      // Add any additional configuration options here
    }
  });
};

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track events with common game attribute
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
  nonInteraction?: boolean,
  additionalParams?: Record<string, any>
) => {
  // Create event parameters object with required fields
  const eventParams = {
    category,
    action,
    label,
    value,
    nonInteraction,
  };
  
  // Send the event with the game name as a parameter
  ReactGA.event({
    ...eventParams,
    // Add any additional parameters
    ...additionalParams
  });
  
  // Also track the game name in a separate property event for custom reporting
  ReactGA.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: nonInteraction,
    game_name: 'rizz-power-up',
    ...additionalParams
  });
};

// Track user information
export const trackUserInfo = () => {
  // Get device information
  const userAgent = navigator.userAgent;
  const browser = getBrowser(userAgent);
  const os = getOS(userAgent);
  const screenSize = `${window.innerWidth}x${window.innerHeight}`;
  const deviceType = getDeviceType(userAgent);
  
  // Track user information as custom dimensions
  trackEvent('user_info', 'device_info', undefined, undefined, true, {
    browser,
    os,
    screenSize,
    deviceType,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || 'direct',
    landingPage: window.location.pathname
  });
};

// Helper function to determine browser
const getBrowser = (userAgent: string): string => {
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('SamsungBrowser') > -1) return 'Samsung Browser';
  if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
  if (userAgent.indexOf('Trident') > -1) return 'Internet Explorer';
  if (userAgent.indexOf('Edge') > -1) return 'Edge';
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  if (userAgent.indexOf('Safari') > -1) return 'Safari';
  return 'Unknown';
};

// Helper function to determine OS
const getOS = (userAgent: string): string => {
  if (userAgent.indexOf('Windows') > -1) return 'Windows';
  if (userAgent.indexOf('Mac') > -1) return 'MacOS';
  if (userAgent.indexOf('Linux') > -1) return 'Linux';
  if (userAgent.indexOf('Android') > -1) return 'Android';
  if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) return 'iOS';
  return 'Unknown';
};

// Helper function to determine device type
const getDeviceType = (userAgent: string): string => {
  if (userAgent.indexOf('Mobi') > -1) return 'Mobile';
  if (userAgent.indexOf('Tablet') > -1 || userAgent.indexOf('iPad') > -1) return 'Tablet';
  return 'Desktop';
};

// Track game events
export const trackGameEvents = {
  // Track when a card is dealt
  dealCard: (cardName: string, cardBias: number, isBadCard: boolean) => {
    trackEvent('game_action', 'deal_card', cardName, undefined, false, {
      cardBias,
      cardType: isBadCard ? 'bad' : 'good'
    });
  },
  
  // Track when a high score is achieved
  highScore: (score: number) => {
    trackEvent('game_achievement', 'high_score', undefined, score);
  },
  
  // Track when a score is banked
  bankScore: (score: number, isHighScore: boolean) => {
    trackEvent('game_action', 'bank_score', undefined, score, false, {
      isHighScore
    });
  },
  
  // Track when a player gives up
  giveUp: (currentScore: number) => {
    trackEvent('game_action', 'give_up', undefined, currentScore);
  },
  
  // Track when a special event occurs
  specialEvent: (eventType: string, statChange: number, statType: string) => {
    trackEvent('game_event', 'special_event', eventType, statChange, false, {
      statType
    });
  },
  
  // Track game session start
  sessionStart: () => {
    trackEvent('game_session', 'start');
  },
  
  // Track game session end
  sessionEnd: (duration: number, finalScore: number) => {
    trackEvent('game_session', 'end', undefined, finalScore, false, {
      duration
    });
  },
  
  // Track button clicks
  buttonClick: (buttonName: string) => {
    trackEvent('user_interaction', 'button_click', buttonName);
  }
};

// Export a function to track all user metrics at once
export const trackAllUserMetrics = () => {
  trackUserInfo();
  
  // Track time of day and day of week
  const now = new Date();
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
  const hour = now.getHours();
  let timeOfDay = 'morning';
  if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
  else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
  else if (hour >= 21 || hour < 5) timeOfDay = 'night';
  
  trackEvent('user_metrics', 'time_metrics', undefined, undefined, true, {
    dayOfWeek,
    timeOfDay,
    hour
  });
};