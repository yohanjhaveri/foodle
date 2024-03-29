import { useEffect, useState } from "react";
import { useGlobal } from "../../context";
import { Flex } from "@chakra-ui/react";
import { getKeyColors } from "../../utils";
import { KeyColors } from "../../types";
import { Key } from "./Key";

export const Keyboard = () => {
  const { turns, revealAll } = useGlobal();

  const [keyColors, setKeyColors] = useState({} as KeyColors);

  useEffect(() => {
    if (turns.length !== 0) {
      setTimeout(
        () => {
          const keyColors = getKeyColors(turns);
          setKeyColors(keyColors);
        },
        revealAll ? 0 : 2000
      );
    }
  }, [turns, revealAll]);

  const handleKeyPress = (key: string) => {
    document.dispatchEvent(new KeyboardEvent("keypress", { key }));
  };

  // only used for backspace
  const handleKeyDown = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "BACKSPACE" }));
  };

  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
  ];

  return (
    <Flex direction="column" align="center" gap="6px" pb="10px">
      {KEYBOARD_ROWS.map((row, i) => (
        <Flex key={i} gap="5px">
          {row.map((key, j) => {
            const back = ["Back"].includes(key);
            const long = ["Back", "Enter"].includes(key);

            return (
              <Key
                key={j}
                value={key}
                label={key}
                color={keyColors[key]}
                length={long ? "long" : "short"}
                onClick={back ? handleKeyDown : handleKeyPress}
              />
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};
