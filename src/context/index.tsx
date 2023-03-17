import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import { ModalName, State, Stats } from "../types";
import { getToday } from "../utils";
import { GameToast } from "../components/Toasts/GameToast";

type ContextData = {
  guess: string;
  turns: string[];
  state: State;
  jiggle: boolean;
  reveal: boolean;
  revealAll: boolean;
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
  const [reveal, setReveal] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const state = useMemo(() => {
    if (turns[turns.length - 1] === WORD) {
      return "WIN";
    }

    if (turns.length === ALLOWED_ATTEMPTS) {
      return "LOSE";
    }

    return "PENDING";
  }, [turns]);

  const appendLetter = useCallback(
    (letter: string) => {
      if (!reveal && !revealAll) {
        setGuess((prev) => (prev + letter).substring(0, WORD_SIZE));
      }
    },
    [reveal, revealAll]
  );

  console.log(revealAll);

  const deleteLetter = useCallback(() => {
    if (!reveal && !revealAll) {
      setGuess((prev) => prev.substring(0, prev.length - 1));
    }
  }, [reveal, revealAll]);

  const submitGuess = useCallback(() => {
    if (reveal || revealAll) {
      return;
    }

    if (guess.length < WORD_SIZE) {
      toast({
        id: "not-enough-letters",
        position: "top",
        duration: 1000,
        render: () => <GameToast>Not enough letters</GameToast>,
      });

      setJiggle(true);

      setTimeout(() => {
        setJiggle(false);
      }, 300);

      return;
    }

    if (!VALID_WORD_SET.has(guess)) {
      toast({
        id: "not-on-menu",
        position: "top",
        duration: 1000,
        render: () => <GameToast>Sorry, that's not on our menu</GameToast>,
      });

      setJiggle(true);

      setTimeout(() => {
        setJiggle(false);
      }, 300);

      return;
    }

    setGuess("");
    setTurns((prev) => prev.concat(guess));
    setReveal(true);

    setTimeout(() => {
      setReveal(false);
    }, 2000);
  }, [reveal, guess, toast]);

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

  // restore
  useEffect(() => {
    const stats = localStorage.getItem("stats");

    if (stats) {
      const data = JSON.parse(stats) as Stats;
      const today = data.find((stat) => stat.date === getToday());

      if (today) {
        setTurns(today.turns);

        if (today.turns.length > 0) {
          setRevealAll(true);

          setTimeout(() => {
            setRevealAll(false);
          }, 1000);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (state === "WIN") {
      setTimeout(() => {
        toast({
          id: "win-toast",
          position: "top",
          duration: 3000,
          render: () => <GameToast>🎉 🎉 🎉</GameToast>,
        });
      }, 2000);
    }

    if (state === "LOSE") {
      setTimeout(() => {
        toast({
          id: "lose-toast",
          position: "top",
          duration: 3000,
          render: () => <GameToast>{WORD}</GameToast>,
        });
      }, 2000);
    }

    if (["WIN", "LOSE"].includes(state)) {
      setTimeout(() => {
        setModal("STATS");
      }, 5500);
    }
  }, [state, toast]);

  // cache
  useEffect(() => {
    const stats = localStorage.getItem("stats");

    let data: Stats;

    if (stats) {
      data = JSON.parse(stats);
    } else {
      data = [];
    }

    if (data) {
      const today = data.find((stat) => stat.date === getToday());

      if (!today) {
        const updated = data.concat({
          date: getToday(),
          word: WORD,
          turns,
        });

        const text = JSON.stringify(updated);

        console.log(text);

        localStorage.setItem("stats", text);
      } else {
        const updated = data.map((stat) => {
          if (stat.date === getToday()) {
            return {
              ...stat,
              turns,
            };
          }

          return stat;
        });

        const text = JSON.stringify(updated);
        console.log(text);

        localStorage.setItem("stats", text);
      }
    }
  }, [turns]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [onKeyDown, onKeyPress]);

  return (
    <Context.Provider
      value={{
        guess,
        turns,
        state,
        jiggle,
        reveal,
        revealAll,
        modal,
        setModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobal = () => useContext(Context);
