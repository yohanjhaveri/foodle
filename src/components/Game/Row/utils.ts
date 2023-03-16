import { WORD_SIZE } from "../../../constants";
import { getHints } from "../../../utils";

export const getType = (index: number, turns: string[]) => {
  if (index < turns.length) {
    return "filled";
  }

  if (index === turns.length) {
    return "active";
  }

  return "empty";
};

export const getLetters = (
  index: number,
  type: "empty" | "active" | "filled",
  guess: string,
  turns: string[]
) => {
  if (type === "empty") {
    return "";
  }

  if (type === "active") {
    return guess;
  }

  return turns[index];
};

export const getColors = (index: number, word: string, turns: string[]) => {
  if (index < turns.length) {
    return getHints(word, turns[index]);
  }

  return [];
};
