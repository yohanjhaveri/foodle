import { Flex } from "@chakra-ui/react";
import { getTheme } from "../../../utils";
import { Color } from "../../../types";

type LetterProps = {
  letter?: string;
  color?: Color;
};

export const Letter = ({ letter, color }: LetterProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      width={{ base: "56px", md: "72px" }}
      height={{ base: "56px", md: "72px" }}
      fontSize={{ base: "32px", md: "36px" }}
      fontWeight="bold"
      color="white"
      borderWidth="2px"
      borderStyle="solid"
      borderColor={color ? getTheme(color) : "gray.600"}
      background={color && getTheme(color)}
      style={{ aspectRatio: "1" }}
    >
      {letter}
    </Flex>
  );
};
