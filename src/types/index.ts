export type Size = 4 | 5 | 6;
export type Color = "GREEN" | "YELLOW" | "GRAY";
export type State = "PENDING" | "LOSE" | "WIN";
export type Letter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type KeyColors = {
  [key in Letter]?: Color;
};

export type Turn = {
  guess: string;
  hints: Color[];
};
