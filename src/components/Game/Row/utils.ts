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

export const getColors = (index: number, turns: string[]) => {
  if (index < turns.length) {
    return getHints(turns[index]);
  }

  return [];
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
