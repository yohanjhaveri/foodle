import { Flex } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { Letter } from "../../types";
import { Key } from "./Key";

type KeyProps = {
  label: string;
  value: string;
  length: "short" | "long";
  onClick: (key: string) => void;
};

export const Keyboard = () => {
  const { keyColors } = useGame();

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

  const ROWS: KeyProps[][] = [
    [
      { label: "Q", value: "Q", length: "short", onClick: handleKeyPress },
      { label: "W", value: "W", length: "short", onClick: handleKeyPress },
      { label: "E", value: "E", length: "short", onClick: handleKeyPress },
      { label: "R", value: "R", length: "short", onClick: handleKeyPress },
      { label: "T", value: "T", length: "short", onClick: handleKeyPress },
      { label: "Y", value: "Y", length: "short", onClick: handleKeyPress },
      { label: "U", value: "U", length: "short", onClick: handleKeyPress },
      { label: "I", value: "I", length: "short", onClick: handleKeyPress },
      { label: "O", value: "O", length: "short", onClick: handleKeyPress },
      { label: "P", value: "P", length: "short", onClick: handleKeyPress },
    ],
    [
      { label: "A", value: "A", length: "short", onClick: handleKeyPress },
      { label: "S", value: "S", length: "short", onClick: handleKeyPress },
      { label: "D", value: "D", length: "short", onClick: handleKeyPress },
      { label: "F", value: "F", length: "short", onClick: handleKeyPress },
      { label: "G", value: "G", length: "short", onClick: handleKeyPress },
      { label: "H", value: "H", length: "short", onClick: handleKeyPress },
      { label: "J", value: "J", length: "short", onClick: handleKeyPress },
      { label: "K", value: "K", length: "short", onClick: handleKeyPress },
      { label: "L", value: "L", length: "short", onClick: handleKeyPress },
    ],
    [
      {
        label: "Enter",
        value: "Enter",
        length: "long",
        onClick: handleKeyPress,
      },
      { label: "Z", value: "Z", length: "short", onClick: handleKeyPress },
      { label: "X", value: "X", length: "short", onClick: handleKeyPress },
      { label: "C", value: "C", length: "short", onClick: handleKeyPress },
      { label: "V", value: "V", length: "short", onClick: handleKeyPress },
      { label: "B", value: "B", length: "short", onClick: handleKeyPress },
      { label: "N", value: "N", length: "short", onClick: handleKeyPress },
      { label: "M", value: "M", length: "short", onClick: handleKeyPress },
      {
        label: "Back", // ⌫
        value: "Backspace",
        length: "long",
        onClick: handleKeyDown,
      },
    ],
  ];

  return (
    <Flex direction="column" align="center" gap="6px">
      {ROWS.map((ROW, i) => (
        <Flex key={i} gap="5px">
          {ROW.map((props, j) => (
            <Key key={j} color={keyColors[props.value as Letter]} {...props} />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
