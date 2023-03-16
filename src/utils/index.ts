import { DAILY_WORD_LIST, WORD, WORD_SIZE } from "../constants";
import { Color, KeyColors } from "../types";

export const getToday = () => {
  return new Date().toLocaleDateString();
};

const getTodayHash = () => {
  const today = getToday();

  let hash = 0;

  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % DAILY_WORD_LIST.length;
};

export const getTodayWord = () => {
  const todayHash = getTodayHash();
  return DAILY_WORD_LIST[todayHash];
};

export const getColorValue = (color: Color) => {
  return {
    GREEN: "green.600",
    YELLOW: "yellow.500",
    GRAY: "gray.700",
  }[color];
};

export const generateIterator = (size: number) => {
  return Array.from(Array(size).keys());
};

export const getHints = (guess: string) => {
  const size = WORD_SIZE;
  const actual = WORD;

  const colors: Color[] = Array(size).fill("GRAY");
  const indexes: number[] = [];
  const remaining: { [key: string]: number } = {};

  for (let i = 0; i < size; i++) {
    if (guess[i] === actual[i]) {
      colors[i] = "GREEN";
    } else {
      remaining[actual[i]] = (remaining[actual[i]] || 0) + 1;
      indexes.push(i);
    }
  }

  for (const i of indexes) {
    if (remaining[guess[i]]) {
      remaining[guess[i]] -= 1;
      colors[i] = "YELLOW";
    }
  }

  return colors;
};

export const getKeyColors = (turns: string[]) => {
  const size = WORD_SIZE;

  const colors: KeyColors = {};

  for (const turn of turns) {
    const hints = getHints(turn);

    for (let i = 0; i < size; i++) {
      const letter = turn.charAt(i);
      const current = colors[letter];

      if (["GREEN", "GRAY"].includes(current)) {
        continue;
      }

      colors[letter] = hints[i];
    }
  }

  return colors;
};
