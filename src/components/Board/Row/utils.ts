import { getBoxColors } from "../../../utils";

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
    return getBoxColors(turns[index]);
  }

  return [];
};

export const getLetters = (
  index: number,
  type: "filled" | "active" | "empty",
  guess: string,
  turns: string[]
) => {
  if (type === "active") {
    return guess;
  }

  if (type === "filled") {
    return turns[index];
  }

  return "";
};
