import dailyWords from "../data/daily-words.json";
import validWords from "../data/valid-words.json";

export const WORD_SIZE = 5;
export const ALLOWED_ATTEMPTS = 6;
export const LETTERS_ARRAY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const validWordSet = new Set(validWords);
export const dailyWordList = dailyWords;
