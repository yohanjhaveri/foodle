import { useToast } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { LETTERS_ARRAY, ALLOWED_ATTEMPTS } from "../constants";
import { Size, State } from "../types";
import { getToday } from "../utils";

import dailyWords from "../data/daily-words.json";
import validWords from "../data/valid-words.json";

type Context = {
  word: string;
  size: Size;
  guess: string;
  turns: string[];
  state: State;
  jiggle: boolean;
};

type Props = {
  children: React.ReactNode;
};

const getTodayWord = () => {
  const today = getToday() as keyof typeof dailyWords;
  return dailyWords[today];
};

const DEFAULT_STATE = "PENDING";
const DEFAULT_GUESS = "";
const DEFAULT_TURNS: string[] = [];

export const GameContext = createContext({} as Context);

export const GameProvider = ({ children }: Props) => {
  const toast = useToast();

  const [word] = useState(getTodayWord());
  const [size] = useState<Size>(5);
  const [guess, setGuess] = useState(DEFAULT_GUESS);
  const [turns, setTurns] = useState<string[]>(DEFAULT_TURNS);
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [jiggle, setJiggle] = useState(false);
  const [restored, setRestored] = useState(false);

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
        setGuess("");

        if (guess === word) {
          setState("WIN");
        }

        if (turns.length === ALLOWED_ATTEMPTS - 1) {
          setState("LOSE");
        }

        setTurns((prev) => prev.concat(guess));
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
  }, [size, word, turns, guess, toast]);

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

  // restore
  useEffect(() => {
    const cache = localStorage.getItem("cache");

    if (cache) {
      const data = JSON.parse(cache);

      if (data.word === word) {
        setGuess(data.guess);
        setTurns(data.turns);
        setState(data.state);
      }
    }

    setRestored(true);
  }, [word]);

  // cache
  useEffect(() => {
    if (restored) {
      const data = JSON.stringify({ word, guess, state, turns });
      localStorage.setItem("cache", data);
    }
  }, [word, guess, state, turns, restored]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [onKeyDown, onKeyPress]);

  return (
    <GameContext.Provider value={{ word, size, guess, turns, state, jiggle }}>
      {children}
    </GameContext.Provider>
  );
};
