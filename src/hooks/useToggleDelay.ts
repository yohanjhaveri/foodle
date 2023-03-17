import { useCallback, useState } from "react";

export const useToggleDelay = (delay: number): [boolean, () => void] => {
  const [active, setActive] = useState(false);

  const trigger = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), delay);
  }, [delay]);

  return [active, trigger];
};
