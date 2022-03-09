import { useToast } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { LETTERS_ARRAY, ALLOWED_ATTEMPTS } from "../constants";
import { Color, KeyColors, Letter, Size, State, Turn } from "../types";
import { getHints, getToday } from "../utils";

import dailyWords from "../data/daily-words.json";
import validWords from "../data/valid-words.json";

type Context = {
  size: Size;
  guess: string;
  turns: Turn[];
  state: State;
  jiggle: boolean;
  keyColors: KeyColors;
};

type Props = {
  children: React.ReactNode;
};

const getTodayWord = () => {
  const today = getToday() as keyof typeof dailyWords;
  return dailyWords[today];
};

export const GameContext = createContext({} as Context);

export const GameProvider = ({ children }: Props) => {
  const toast = useToast();

  const [word] = useState(getTodayWord());
  const [size] = useState<Size>(5);
  const [guess, setGuess] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [state, setState] = useState<State>("PENDING");
  const [jiggle, setJiggle] = useState(false);
  const [keyColors, setKeyColors] = useState<KeyColors>({});

  const updateKeyColorsAfterGuess = useCallback(
    (hints: Color[]) => {
      setKeyColors((prev) => {
        const copy = { ...prev };

        for (let i = 0; i < size; i++) {
          const letter = guess.charAt(i) as Letter;
          const color = hints[i];

          if (copy[letter] !== "GREEN" && copy[letter] !== "GRAY") {
            copy[letter] = color;
          }
        }

        return copy;
      });
    },
    [size, guess]
  );

  const updateTurnsAndStateAfterGuess = useCallback(
    (hints: Color[]) => {
      setTurns((prev) => {
        const hasWon = hints.every((v) => v === "GREEN");
        const hasLost = !hasWon && prev.length === ALLOWED_ATTEMPTS;

        if (hasWon) {
          setState("WIN");
        }

        if (hasLost) {
          setState("LOSE");
        }

        return prev.concat({ guess, hints });
      });
    },
    [guess]
  );

  const appendLetter = useCallback(
    (letter: string) => {
      setGuess((prev) => (prev + letter).substring(0, size));
    },
    [size]
  );

  const deleteLetter = useCallback(() => {
    setGuess((prev) => prev.substring(0, prev.length - 1));
  }, []);

  const submitGuess = useCallback(() => {
    if (guess.length === size) {
      if (validWords.includes(guess)) {
        const hints = getHints(size, word, guess);
        updateKeyColorsAfterGuess(hints);
        updateTurnsAndStateAfterGuess(hints);
        setGuess("");
      } else {
        setJiggle(true);
        toast({
          title: "Sorry, that's not on our menu",
          position: "top",
          status: "info",
          duration: 3000,
        });
      }
    }
  }, [
    size,
    word,
    guess,
    toast,
    updateKeyColorsAfterGuess,
    updateTurnsAndStateAfterGuess,
  ]);

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (state !== "PENDING") {
        return;
      }

      if (LETTERS_ARRAY.includes(key)) {
        appendLetter(key);
        return;
      }

      if (key === "ENTER") {
        submitGuess();
      }
    },
    [state, appendLetter, submitGuess]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (state !== "PENDING") {
        return;
      }

      if (key === "BACKSPACE") {
        deleteLetter();
        return;
      }
    },
    [state, deleteLetter]
  );

  // cache
  useEffect(() => {
    const data = JSON.stringify({ word, guess, turns, state, keyColors });
    localStorage.setItem("cache", data);
  }, [word, guess, turns, state, keyColors]);

  // restore
  useEffect(() => {
    const cache = localStorage.getItem("cache");

    if (cache) {
      const data = JSON.parse(cache);

      if (data.word === word) {
        setGuess(data.guess);
        setTurns(data.turns);
        setState(data.state);
        setKeyColors(data.keyColors);
      }
    }
  }, [word]);

  // useEffect(() => {
  //   setGuess("");
  //   setTurns([]);
  //   setState("PENDING");
  //   setKeyColors({});
  // }, [size]);

  useEffect(() => {
    if (jiggle) {
      setTimeout(() => {
        setJiggle(false);
      }, 300);
    }
  }, [jiggle]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [onKeyDown, onKeyPress]);

  return (
    <GameContext.Provider
      value={{ size, guess, turns, state, jiggle, keyColors }}
    >
      {children}
    </GameContext.Provider>
  );
};
