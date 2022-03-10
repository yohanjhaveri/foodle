import { Color, KeyColors, Size } from "../types";

export const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const getTheme = (color: Color) => {
  return {
    GREEN: "green.600",
    YELLOW: "yellow.500",
    GRAY: "gray.700",
  }[color];
};

export const generateIndexArray = (size: number) => {
  return Array.from(Array(size).keys());
};

export const getHints = (size: Size, actual: string, guess: string) => {
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

export const getKeyColors = (size: Size, actual: string, turns: string[]) => {
  const colors: KeyColors = {};

  for (const turn of turns) {
    const hints = getHints(size, actual, turn);

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
