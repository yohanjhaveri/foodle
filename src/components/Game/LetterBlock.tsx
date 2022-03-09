import { Flex } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { useResponsive } from "../../hooks/useResponsive";
import { getTheme } from "../../utils";
import { Color } from "../../types";

type Props = {
  letter?: string;
  color?: Color;
};

export const LetterBlock = ({ letter, color }: Props) => {
  const { size } = useGame();
  const { width, height } = useResponsive();

  const dimension = Math.min(width, height);
  const sideLength = Math.min(dimension / (size * 1.4), 66) + "px";
  const fontSize = Math.min(dimension / (size * 2.5), 32) + "px";

  return (
    <Flex
      justify="center"
      align="center"
      width={sideLength}
      height={sideLength}
      fontSize={fontSize}
      fontWeight="bold"
      color="white"
      borderWidth="2px"
      borderStyle="solid"
      borderColor={color ? getTheme(color) : "gray.600"}
      background={color && getTheme(color)}
    >
      {letter}
    </Flex>
  );
};
