import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToast } from "@chakra-ui/react";
import { useToggleDelay } from "../hooks/useToggleDelay";
import { useKeyboard } from "../hooks/useKeyboard";
import {
  VALID_WORD_SET,
  LETTERS_ARRAY,
  ALLOWED_ATTEMPTS,
  WORD_SIZE,
  WORD,
  TODAY,
  LOCAL_STORAGE_KEY,
} from "../constants";
import { getTodayCache, setTodayCache } from "../utils";
import { GameToast } from "../components/Toasts/GameToast";
import { ModalName, State } from "../types";

type ContextData = {
  guess: string;
  turns: string[];
  state: State;
  jiggle: boolean;
  reveal: boolean;
  revealAll: boolean;
  firstLoad: boolean;
  modal: ModalName | "";
  setModal: (modal: ModalName | "") => void;
};

type Props = {
  children: React.ReactNode;
};

export const Context = createContext({} as ContextData);

export const Provider = ({ children }: Props) => {
  const toast = useToast();

  const [modal, setModal] = useState<ModalName | "">("");
  const [guess, setGuess] = useState("");
  const [turns, setTurns] = useState<string[]>([]);
  const [jiggle, triggerJiggle] = useToggleDelay(300);
  const [reveal, triggerReveal] = useToggleDelay(2000);
  const [revealAll, triggerRevealAll] = useToggleDelay(1000);
  const [firstLoad, triggerFirstLoad] = useToggleDelay(1000, true);

  const state = useMemo(() => {
    if (turns[turns.length - 1] === WORD) {
      return "WIN";
    }

    if (turns.length === ALLOWED_ATTEMPTS) {
      return "LOSE";
    }

    return "PENDING";
  }, [turns]);

  const error = useMemo(() => {
    if (guess.length < WORD_SIZE) {
      return "Not enough letters";
    }

    if (!VALID_WORD_SET.has(guess)) {
      return "Sorry, that's not on our menu";
    }

    return "";
  }, [guess]);

  const appendLetter = useCallback((letter: string) => {
    setGuess((prev) => (prev + letter).substring(0, WORD_SIZE));
  }, []);

  const deleteLetter = useCallback(() => {
    setGuess((prev) => prev.substring(0, prev.length - 1));
  }, []);

  const submitGuess = useCallback(() => {
    if (error) {
      toast({
        id: error,
        position: "top",
        duration: 1000,
        render: () => <GameToast>{error}</GameToast>,
      });

      triggerJiggle();

      return;
    }

    setGuess("");
    setTurns((prev) => prev.concat(guess));

    triggerReveal();
  }, [guess, error, toast, triggerJiggle, triggerReveal]);

  useEffect(() => {
    const isFirstTimeUser = !localStorage.getItem(LOCAL_STORAGE_KEY);

    if (isFirstTimeUser) {
      setModal("ABOUT");
    }

    triggerFirstLoad();
  }, []);

  useEffect(() => {
    const winMessages = [
      "Genius",
      "Magnificent",
      "Impressive",
      "Splendid",
      "Great",
      "Phew",
    ];

    const message = state === "WIN" ? winMessages[turns.length - 1] : WORD;

    if (["WIN", "LOSE"].includes(state)) {
      setTimeout(
        () => {
          toast({
            id: state,
            position: "top",
            duration: 1500,
            render: () => <GameToast>{message}</GameToast>,
          });
        },
        revealAll ? 0 : 2400
      );

      setTimeout(
        () => {
          setModal("STATS");
        },
        revealAll ? 2000 : 4000
      );
    }
  }, [state, toast]);

  useEffect(() => {
    // RESTORE FROM CACHE
    const today = getTodayCache();

    if (today) {
      setTurns(today.turns);

      // FLIP ALL LETTERS ON LOAD IF THERE ARE TURNS
      if (today.turns.length > 0) {
        triggerRevealAll();
      }
    }
  }, [triggerRevealAll]);

  useEffect(() => {
    // SAVE TO CACHE
    setTodayCache({
      word: WORD,
      date: TODAY,
      turns,
    });
  }, [turns]);

  /**
   * LISTEN TO KEY EVENTS
   */
  useKeyboard((key) => {
    if (state !== "PENDING") {
      return;
    }

    if (reveal || revealAll) {
      return;
    }

    if (LETTERS_ARRAY.includes(key)) {
      appendLetter(key);
      return;
    }

    if (key === "BACKSPACE") {
      deleteLetter();
      return;
    }

    if (key === "ENTER") {
      submitGuess();
    }
  });

  return (
    <Context.Provider
      value={{
        firstLoad,
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
