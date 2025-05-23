/**
 * Rizz Attributes Emojis
 * 
 * This file provides emoji mappings for different attribute scores in the Rizz Power-Up app.
 * Each attribute has a mapping of score values to emojis.
 */

// Define the type for an attribute emoji mapping
export type AttributeEmojiMapping = Record<number, string>;

// Define the type for all attribute emoji mappings
export interface AttributeEmojis {
  "Vibe Level": AttributeEmojiMapping;
  "Swagger": AttributeEmojiMapping;
  "Cringe Avoidance": AttributeEmojiMapping;
  "Rizz Level": AttributeEmojiMapping;
}

// Export the attribute emoji mappings with number keys
const attributeEmojis: AttributeEmojis = {
  "Vibe Level": {
    [-5000]: "💀",
    [-4750]: "😩",
    [-4500]: "😒",
    [-4250]: "😐",
    [-4000]: "🙂",
    [-3750]: "😌",
    [-3500]: "😎",
    [-3250]: "🧘",
    [-3000]: "🌈",
    [-2750]: "🎶",
    [-2500]: "🌀",
    [-2250]: "🌟",
    [-2000]: "🚀",
    [-1750]: "🌞",
    [-1500]: "🦋",
    [-1250]: "🧿",
    [-1000]: "✨",
    [-750]: "🧚‍♂️",
    [-500]: "🌈",
    [-250]: "🔮",
    [0]: "💫",
    [250]: "🌅",
    [500]: "🌠",
    [750]: "🌌",
    [1000]: "🧘‍♀️",
    [1250]: "👽",
    [1500]: "🛸",
    [1750]: "👼",
    [2000]: "👑",
    [2250]: "🦄",
    [2500]: "🌍",
    [2750]: "🎧",
    [3000]: "😇",
    [3250]: "🕊️",
    [3500]: "🫶",
    [3750]: "🎷",
    [4000]: "🍃",
    [4250]: "💖",
    [4500]: "💫",
    [4750]: "🧘‍♂️",
    [5000]: "🧘‍♂️"
  },
  "Swagger": {
    [-5000]: "🤢",
    [-4750]: "😤",
    [-4500]: "🙄",
    [-4250]: "😐",
    [-4000]: "😏",
    [-3750]: "🙂",
    [-3500]: "😎",
    [-3250]: "😈",
    [-3000]: "💅",
    [-2750]: "💼",
    [-2500]: "🎩",
    [-2250]: "🧥",
    [-2000]: "🕶",
    [-1750]: "👟",
    [-1500]: "💣",
    [-1250]: "🔥",
    [-1000]: "🚶‍♂️",
    [-750]: "🧊",
    [-500]: "📸",
    [-250]: "💎",
    [0]: "🤑",
    [250]: "🎯",
    [500]: "🎸",
    [750]: "📈",
    [1000]: "🛩",
    [1250]: "👑",
    [1500]: "🚀",
    [1750]: "🥂",
    [2000]: "🎤",
    [2250]: "🧃",
    [2500]: "👠",
    [2750]: "👔",
    [3000]: "🧃",
    [3250]: "🎮",
    [3500]: "🏎",
    [3750]: "🕺",
    [4000]: "🪩",
    [4250]: "💃",
    [4500]: "🧨",
    [4750]: "💥",
    [5000]: "🌪"
  },
  "Cringe Avoidance": {
    [-5000]: "🗑",
    [-4750]: "🤡",
    [-4500]: "🙈",
    [-4250]: "😬",
    [-4000]: "😐",
    [-3750]: "🤨",
    [-3500]: "😶",
    [-3250]: "😑",
    [-3000]: "🙂",
    [-2750]: "😌",
    [-2500]: "🧠",
    [-2250]: "📚",
    [-2000]: "🧘‍♂️",
    [-1750]: "🫡",
    [-1500]: "📏",
    [-1250]: "📈",
    [-1000]: "🎓",
    [-750]: "🕊️",
    [-500]: "🎯",
    [-250]: "🔍",
    [0]: "🧊",
    [250]: "🦉",
    [500]: "💭",
    [750]: "🧬",
    [1000]: "🦾",
    [1250]: "👨‍🏫",
    [1500]: "📖",
    [1750]: "💼",
    [2000]: "🛡️",
    [2250]: "🎖️",
    [2500]: "👔",
    [2750]: "🤖",
    [3000]: "🏅",
    [3250]: "🧙",
    [3500]: "🎩",
    [3750]: "🧠",
    [4000]: "🧘",
    [4250]: "👑",
    [4500]: "🚀",
    [4750]: "🌌",
    [5000]: "👽"
  },
  "Rizz Level": {
    [-5000]: "🚫",
    [-4750]: "🤮",
    [-4500]: "🤨",
    [-4250]: "😐",
    [-4000]: "😏",
    [-3750]: "😎",
    [-3500]: "🗣️",
    [-3250]: "💬",
    [-3000]: "📞",
    [-2750]: "💌",
    [-2500]: "💘",
    [-2250]: "💖",
    [-2000]: "💃",
    [-1750]: "🕺",
    [-1500]: "🫦",
    [-1250]: "🫶",
    [-1000]: "😍",
    [-750]: "💯",
    [-500]: "🎯",
    [-250]: "🫰",
    [0]: "✨",
    [250]: "🌟",
    [500]: "💥",
    [750]: "🔥",
    [1000]: "🥂",
    [1250]: "🎤",
    [1500]: "📸",
    [1750]: "🧃",
    [2000]: "🚀",
    [2250]: "🛸",
    [2500]: "👑",
    [2750]: "🦄",
    [3000]: "💎",
    [3250]: "🎉",
    [3500]: "💞",
    [3750]: "🪄",
    [4000]: "🎇",
    [4250]: "🌈",
    [4500]: "🔮",
    [4750]: "💫",
    [5000]: "👼"
  }
};

export default attributeEmojis;