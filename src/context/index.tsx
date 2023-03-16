import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Flex, useToast } from "@chakra-ui/react";
import {
  VALID_WORD_SET,
  LETTERS_ARRAY,
  ALLOWED_ATTEMPTS,
  WORD_SIZE,
  WORD,
} from "../constants";
import { ModalName, State, Stats } from "../types";
import { getToday } from "../utils";

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

const DEFAULT_GUESS = "";
const DEFAULT_TURNS: string[] = [];

export const Context = createContext({} as ContextData);

export const Provider = ({ children }: Props) => {
  const toast = useToast();

  const [modal, setModal] = useState<ModalName | "">("");
  const [guess, setGuess] = useState(DEFAULT_GUESS);
  const [turns, setTurns] = useState<string[]>(DEFAULT_TURNS);
  const [jiggle, setJiggle] = useState(false);

  const state = useMemo(() => {
    if (turns[turns.length - 1] === WORD) {
      return "WIN";
    }

    if (turns.length === ALLOWED_ATTEMPTS) {
      return "LOSE";
    }

    return "PENDING";
  }, [turns]);

  console.log(state);

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
    const stats = localStorage.getItem("stats");

    if (stats) {
      const data = JSON.parse(stats) as Stats;
      const today = data.find((stat) => stat.date === getToday());

      if (today) {
        setGuess(today.guess);
        setTurns(today.turns);
      }
    }
  }, []);

  useEffect(() => {
    if (state === "WIN") {
      toast({
        id: "win-toast",
        position: "top",
        render: () => (
          <Flex justify="center" pb="">
            <Box
              px="16px"
              py="8px"
              bg="yellow.200"
              borderRadius="md"
              fontSize="xl"
            >
              🎉 🎉 🎉
            </Box>
          </Flex>
        ),
        duration: 100000,
      });

      setTimeout(() => {
        setModal("STATS");
      }, 3000);
    }

    if (state === "LOSE") {
      toast({
        id: "lose-toast",
        position: "top",
        render: () => (
          <Flex justify="center" pb="">
            <Box
              px="16px"
              py="8px"
              color="gray.700"
              bg="yellow.200"
              borderRadius="md"
              fontSize="xl"
              fontWeight="700"
            >
              {WORD}
            </Box>
          </Flex>
        ),
        duration: 100000,
      });

      setTimeout(() => {
        setModal("STATS");
      }, 3000);
    }

    if (["WIN", "LOSE"].includes(state)) {
      setTimeout(() => {
        setModal("STATS");
      }, 3000);
    }
  }, [state, toast]);

  // cache
  useEffect(() => {
    const data = JSON.stringify({ word: WORD, guess, state, turns });
    localStorage.setItem("cache", data);
  }, [guess, state, turns]);

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
