import { useGlobal } from "../../../context";
import { getColors, getLetters, getType } from "./utils";

export const useRow = (index: number) => {
  const { guess, word, turns, jiggle } = useGlobal();

  const type = getType(index, turns);
  const colors = getColors(index, word, turns);
  const letters = getLetters(index, type, guess, turns);

  return { type, colors, letters, jiggle };
};
