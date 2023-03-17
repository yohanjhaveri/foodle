import { useEffect } from "react";
import { useToggleDelay } from "../../hooks/useToggleDelay";

export type UseAnimatorParams = {
  duration: number;
  condition?: boolean;
};

export const useAnimator = ({
  duration,
  condition,
}: UseAnimatorParams): [boolean, () => void] => {
  const [active, trigger] = useToggleDelay(duration);

  useEffect(() => {
    if (condition) {
      trigger();
    }
  }, [condition, trigger]);

  return [active, trigger];
};
