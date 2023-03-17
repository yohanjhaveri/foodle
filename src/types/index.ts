export type Color = "GREEN" | "YELLOW" | "GRAY";
export type State = "PENDING" | "LOSE" | "WIN";
export type ModalName = "STATS" | "ABOUT";

export type KeyColors = {
  [key: string]: Color;
};

export type DayCache = {
  date: string;
  word: string;
  turns: string[];
};

export type AllCache = DayCache[];
