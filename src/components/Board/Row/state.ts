import { useEffect } from "react";
import { useInterval } from "../../../hooks/useInterval";
import { useGlobal } from "../../../context";
import { WORD_SIZE } from "../../../constants";
import { getColors, getLetters, getType } from "./utils";

export const useRow = (index: number) => {
  const { guess, state, turns, jiggle, reveal, revealAll, firstLoad } =
    useGlobal();

  const type = getType(index, turns) as "filled" | "active" | "empty";
  const colors = getColors(index, turns);
  const letters = getLetters(index, type, guess, turns);

  const firstReveal = revealAll && type === "filled";

  const [revealIndex, triggerReveal, resetReveal] = useInterval({
    repeats: WORD_SIZE,
    duration: firstReveal ? 100 : 400,
  });

  const [bounceIndex, triggerBounce] = useInterval({
    repeats: WORD_SIZE,
    duration: 100,
  });

  const startReveal = index === turns.length - 1;
  const endReveal = revealIndex === WORD_SIZE - 1;

  useEffect(() => {
    if (firstReveal) {
      triggerReveal();
    }
  }, [firstReveal]);

  useEffect(() => {
    if (startReveal) {
      triggerReveal();
    }
  }, [startReveal]);

  useEffect(() => {
    if (endReveal) {
      setTimeout(() => {
        resetReveal();
      }, 400);
    }
  }, [endReveal]);

  useEffect(() => {
    if (!firstLoad && state === "WIN") {
      setTimeout(() => {
        triggerBounce();
      }, 2000);
    }
  }, [state]);

  return {
    type,
    turns,
    state,
    colors,
    letters,
    jiggle,
    reveal,
    revealAll,
    revealIndex,
    bounceIndex,
  };
};
