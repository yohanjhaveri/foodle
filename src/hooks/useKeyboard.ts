import { useCallback, useEffect } from "react";

export const useKeyboard = (callback: (key: string) => void) => {
  // if we only have this, then hitting refresh using CMD + R types "R" into the box
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === "BACKSPACE") {
        callback(key);
      }
    },
    [callback]
  );

  // if we only have this, then hitting backspace does not work
  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key !== "BACKSPACE") {
        callback(key);
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [onKeyDown, onKeyPress]);
};
