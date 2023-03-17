import { useEffect, useState } from "react";
import { WORD_SIZE } from "../../../constants";
import { useGlobal } from "../../../context";
import { getColors, getLetters, getType } from "./utils";

export const useRow = (index: number) => {
  const { guess, turns, jiggle, reveal, revealAll } = useGlobal();
  const [revealIndex, setRevealIndex] = useState(-1);

  const type = getType(index, turns);
  const colors = getColors(index, turns);
  const letters = getLetters(index, type, guess, turns);

  useEffect(() => {
    if ((revealAll && type === "filled") || index === turns.length - 1) {
      for (let i = 0; i < WORD_SIZE; i++) {
        setTimeout(
          () => {
            setRevealIndex(i);
          },
          revealAll && type === "filled" ? i * 100 : i * 400
        );
      }
    }
  }, [index, turns]);

  useEffect(() => {
    if (revealIndex === WORD_SIZE) {
      setRevealIndex(-1);
    }
  }, [turns, revealIndex]);

  return {
    type,
    turns,
    colors,
    letters,
    jiggle,
    reveal,
    revealAll,
    revealIndex,
  };
};
