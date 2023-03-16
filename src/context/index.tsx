import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";
import {
  VALID_WORD_SET,
  LETTERS_ARRAY,
  ALLOWED_ATTEMPTS,
  WORD_SIZE,
  WORD,
} from "../constants";
import { ModalName, State } from "../types";

type ContextData = {
  guess: string;
  turns: string[];
  state: State;
  jiggle: boolean;
  modal: ModalName | "";
  setModal: (modal: ModalName | "") => void;
};

type Props = {
  children: React.ReactNode;
};

const DEFAULT_STATE = "PENDING";
const DEFAULT_GUESS = "";
const DEFAULT_TURNS: string[] = [];

export const Context = createContext({} as ContextData);

export const Provider = ({ children }: Props) => {
  const toast = useToast();

  const [modal, setModal] = useState<ModalName | "">("");
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
      if (VALID_WORD_SET.has(guess)) {
        setGuess("");

        if (guess === WORD) {
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
  }, [turns, guess, toast]);

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

      if (data.word === WORD) {
        setGuess(data.guess);
        setTurns(data.turns);
        setState(data.state);
      }
    }

    setRestored(true);
  }, []);

  // cache
  useEffect(() => {
    if (restored) {
      const data = JSON.stringify({ word: WORD, guess, state, turns });
      localStorage.setItem("cache", data);
    }
  }, [guess, state, turns, restored]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [onKeyDown, onKeyPress]);

  return (
    <Context.Provider value={{ guess, turns, state, jiggle, modal, setModal }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobal = () => useContext(Context);
