import { useCallback, useState } from "react";

export const useToggleDelay = (
  delay: number,
  initial = false
): [boolean, () => void] => {
  const [active, setActive] = useState(initial);

  const trigger = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), delay);
  }, [delay]);

  return [active, trigger];
};
