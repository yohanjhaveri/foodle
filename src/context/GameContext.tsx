import { createContext, useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { LETTERS_ARRAY, ALLOWED_ATTEMPTS, WORD_SIZE } from "../constants";
import { getTodayWord } from "../utils";
import { validWordSet } from "../data";
import { State } from "../types";

type Context = {
  word: string;
  guess: string;
  turns: string[];
  state: State;
  jiggle: boolean;
};

type Props = {
  children: React.ReactNode;
};

const DEFAULT_STATE = "PENDING";
const DEFAULT_GUESS = "";
const DEFAULT_TURNS: string[] = [];

export const GameContext = createContext({} as Context);

export const GameProvider = ({ children }: Props) => {
  const toast = useToast();

  const [word] = useState(getTodayWord());
  const [guess, setGuess] = useState(DEFAULT_GUESS);
  const [turns, setTurns] = useState<string[]>(DEFAULT_TURNS);
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [jiggle, setJiggle] = useState(false);
  const [restored, setRestored] = useState(false);

  const appendLetter = useCallback((letter: string) => {
    setGuess((prev) => (prev + letter).substring(0, WORD_SIZE));
  }, []);

  const deleteLetter = useCallback(() => {
    setGuess((prev) => prev.substring(0, prev.length - 1));
  }, []);

  const submitGuess = useCallback(() => {
    if (guess.length === WORD_SIZE) {
      if (validWordSet.has(guess)) {
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
  }, [word, turns, guess, toast]);

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
    <GameContext.Provider value={{ word, guess, turns, state, jiggle }}>
      {children}
    </GameContext.Provider>
  );
};
