import { Flex } from "@chakra-ui/react";
import { colors } from "../../../styles";
import { Color } from "../../../types";

type KeyProps = {
  label: string;
  value: string;
  color?: Color;
  length: "short" | "long";
  onClick: (letter: string) => void;
};

export const Key = ({ color, label, value, onClick }: KeyProps) => {
  const width = "min(100vw / 12, 50px)";
  const fontSize = "min(100vw / 24, 24px)";
  const borderRadius = "min(100vw / 80, 6px)";

  const long = ["Enter", "Back"].includes(label);

  return (
    <Flex
      justify="center"
      cursor="pointer"
      align="center"
      width={{
        base: long ? "50px" : width,
        md: long ? "70px" : width,
      }}
      height={{ base: "50px", md: "70px" }}
      fontSize={long ? "16px" : fontSize}
      fontWeight="600"
      color="white"
      background={color ? colors[color] : "gray.600"}
      borderRadius={borderRadius}
      onClick={() => onClick(value)}
    >
      {label}
    </Flex>
  );
};
