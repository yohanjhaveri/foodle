export type Color = "GREEN" | "YELLOW" | "GRAY";
export type State = "PENDING" | "LOSE" | "WIN";
export type ModalName = "STATS" | "ABOUT";

export type KeyColors = {
  [key: string]: Color;
};

export type Stats = {
  date: string;
  word: string;
  turns: string[];
}[];
