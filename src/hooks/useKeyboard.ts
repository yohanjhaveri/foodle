import { useCallback, useEffect } from "react";

export const useKeyboard = (callback: (key: string) => void) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === "BACKSPACE") {
        callback(key);
      }
    },
    [callback]
  );

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
