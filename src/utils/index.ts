import {
  DAILY_WORD_LIST,
  LOCAL_STORAGE_KEY,
  WORD,
  WORD_SIZE,
} from "../constants";
import { Color, KeyColors, AllCache, DayCache } from "../types";

export const getToday = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const getHashIndex = (today: string) => {
  let hash = 0;

  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % DAILY_WORD_LIST.length;
};

export const getTodayWord = () => {
  const today = getToday();
  const index = getHashIndex(today);
  return DAILY_WORD_LIST[index];
};

export const generateIterator = (size: number) => {
  return Array.from(Array(size).keys());
};

export const getBoxColors = (guess: string) => {
  const colors: Color[] = Array(WORD_SIZE).fill("GRAY");
  const indexes: number[] = [];
  const remaining: { [key: string]: number } = {};

  for (let i = 0; i < WORD_SIZE; i++) {
    if (guess[i] === WORD[i]) {
      colors[i] = "GREEN";
    } else {
      remaining[WORD[i]] = (remaining[WORD[i]] || 0) + 1;
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
  const colors: KeyColors = {};

  for (const turn of turns) {
    const hints = getBoxColors(turn);

    for (let i = 0; i < WORD_SIZE; i++) {
      const letter = turn.charAt(i);
      const current = colors[letter];

      if (["GREEN", "GRAY"].includes(current)) {
        continue;
      }

      if (["GRAY"].includes(hints[i])) {
        continue;
      }

      colors[letter] = hints[i];
    }
  }

  return colors;
};

export const getCache = (): AllCache => {
  const text = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!text) {
    return [];
  }

  return JSON.parse(text);
};

export const getTodayCache = (): DayCache | undefined => {
  const cache = getCache();
  const today = cache.find((day) => day.date === getToday());

  if (!today) {
    return;
  }

  return today;
};

export const getTodayCacheIndex = (): number => {
  const cache = getCache();
  const index = cache.findIndex((day) => day.date === getToday());

  return index;
};

export const setTodayCache = (data: DayCache) => {
  const cache = getCache();
  const index = getTodayCacheIndex();

  let updated = [...cache];

  if (index === -1) {
    updated.push(data);
  } else {
    updated[getTodayCacheIndex()] = data;
  }

  const text = JSON.stringify(updated);

  localStorage.setItem(LOCAL_STORAGE_KEY, text);
};

const daysDifference = (date1: string, date2: string) => {
  const dateObject1 = new Date(date1);
  const dateObject2 = new Date(date2);

  const diff = Math.abs(dateObject1.getTime() - dateObject2.getTime());

  return Math.ceil(diff / (1000 * 3600 * 24));
};

export const calculateStats = () => {
  const cache = getCache();

  let numWon = 0;
  let numLost = 0;
  let currentStreak = 0;
  let longestStreak = 0;

  const distribution = [0, 0, 0, 0, 0, 0];

  let prevDate = "";

  for (const day of cache) {
    if (day.turns.includes(day.word)) {
      numWon += 1;
      distribution[day.turns.length - 1] += 1;

      if (!prevDate || daysDifference(day.date, prevDate) <= 1) {
        currentStreak += 1;
        prevDate = day.date;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 0;
      }

      continue;
    }

    if (day.turns.length === 6) {
      numLost += 1;

      if (!prevDate || daysDifference(day.date, prevDate) <= 1) {
        currentStreak += 1;
        prevDate = day.date;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 0;
      }

      continue;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  const numPlayed = numWon + numLost;
  const winPercent = Math.round((numWon / numPlayed) * 100) || 0;

  return {
    numPlayed,
    winPercent,
    currentStreak,
    longestStreak,
    distribution,
  };
};
