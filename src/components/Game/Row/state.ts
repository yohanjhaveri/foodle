import { useGlobal } from "../../../context";
import { getColors, getLetters, getType } from "./utils";

export const useRow = (index: number) => {
  const { guess, turns, jiggle } = useGlobal();

  const type = getType(index, turns);
  const colors = getColors(index, turns);
  const letters = getLetters(index, type, guess, turns);

  return { type, colors, letters, jiggle };
};
