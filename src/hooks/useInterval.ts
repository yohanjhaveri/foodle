import { useCallback, useState } from "react";

export type UseIntervalParams = {
  repeats: number;
  duration: number;
};

export const useInterval = ({
  repeats,
  duration,
}: UseIntervalParams): [number, () => void, () => void] => {
  const [count, setCount] = useState(-1);

  const trigger = useCallback(() => {
    for (let i = 0; i < repeats; i++) {
      setTimeout(() => {
        setCount(i);
      }, i * duration);
    }
  }, [repeats, duration]);

  const reset = useCallback(() => {
    setCount(-1);
  }, []);

  return [count, trigger, reset];
};
