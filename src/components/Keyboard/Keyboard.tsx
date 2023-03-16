import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGame } from "../../hooks/useGame";
import { getKeyColors } from "../../utils";
import { Key } from "./Key";

export const Keyboard = () => {
  const { size, word, turns } = useGame();

  const keyColors = useMemo(
    () => getKeyColors(size, word, turns),
    [size, word, turns]
  );

  const handleKeyPress = (key: string) => {
    document.dispatchEvent(
      new KeyboardEvent("keypress", { key: key.toUpperCase() })
    );
  };

  const handleKeyDown = (key: string) => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: key.toUpperCase() })
    );
  };

  const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <Flex direction="column" align="center" gap="6px" pb="10px">
      {ROWS.map((ROW, i) => (
        <Flex key={i} gap="5px">
          {ROW.map((key, j) => (
            <Key
              key={j}
              value={key}
              color={keyColors[key]}
              label={["Backspace"].includes(key) ? "Back" : key}
              length={["Backspace", "Enter"].includes(key) ? "long" : "short"}
              onClick={
                ["Backspace"].includes(key) ? handleKeyDown : handleKeyPress
              }
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
