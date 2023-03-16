import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGlobal } from "../../context";
import { KeyColors } from "../../types";
import { getKeyColors } from "../../utils";
import { Key } from "./Key";

export const Keyboard = () => {
  const { turns } = useGlobal();

  const [keyColors, setKeyColors] = useState({} as KeyColors);

  useEffect(() => {
    setTimeout(() => {
      setKeyColors(getKeyColors(turns));
    }, 2160);
  }, [turns]);

  const handleKeyPress = (key: string) => {
    document.dispatchEvent(new KeyboardEvent("keypress", { key }));
  };

  // only used for backspace
  const handleKeyDown = (key: string) => {
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
