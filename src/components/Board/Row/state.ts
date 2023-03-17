import { useEffect } from "react";
import { useInterval } from "../../../hooks/useInterval";
import { useGlobal } from "../../../context";
import { WORD_SIZE } from "../../../constants";
import { getColors, getLetters, getType } from "./utils";

export const useRow = (index: number) => {
  const { guess, turns, jiggle, reveal, revealAll } = useGlobal();

  const type = getType(index, turns);
  const colors = getColors(index, turns);
  const letters = getLetters(index, type, guess, turns);

  const firstReveal = revealAll && type === "filled";

  const [revealIndex, trigger, reset] = useInterval({
    repeats: WORD_SIZE,
    duration: firstReveal ? 100 : 400,
  });

  const startReveal = index === turns.length - 1;
  const endReveal = revealIndex === WORD_SIZE;

  useEffect(() => {
    if (firstReveal) {
      trigger();
    }
  }, [firstReveal]);

  useEffect(() => {
    if (startReveal) {
      trigger();
    }
  }, [startReveal]);

  useEffect(() => {
    if (endReveal) {
      reset();
    }
  }, [endReveal]);

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
