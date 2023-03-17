import { useEffect } from "react";
import { useInterval } from "../../../hooks/useInterval";
import { WORD_SIZE } from "../../../constants";
import { useGlobal } from "../../../context";
import { getColors, getLetters, getType } from "./utils";

export const useRow = (index: number) => {
  const { guess, turns, jiggle, reveal, revealAll } = useGlobal();

  const type = getType(index, turns);
  const colors = getColors(index, turns);
  const letters = getLetters(index, type, guess, turns);

  const [revealIndex, trigger, reset] = useInterval({
    repeats: WORD_SIZE,
    duration: revealAll && type === "filled" ? 100 : 400,
  });

  useEffect(() => {
    if ((revealAll && type === "filled") || index === turns.length - 1) {
      trigger();
    }
  }, [index, turns]);

  useEffect(() => {
    if (revealIndex === WORD_SIZE) {
      reset();
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
