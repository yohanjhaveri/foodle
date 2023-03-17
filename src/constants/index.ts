import dailyWords from "../data/daily-words.json";
import validWords from "../data/valid-words.json";
import { getToday, getTodayWord } from "../utils";

export const WORD_SIZE = 5;
export const ALLOWED_ATTEMPTS = 6;
export const LETTERS_ARRAY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const LOCAL_STORAGE_KEY = "data";

export const VALID_WORD_SET = new Set(validWords);
export const DAILY_WORD_LIST = dailyWords;

export const TODAY = getToday();
export const WORD = getTodayWord();
