import { Flex } from "@chakra-ui/react";
import { getColorValue } from "../../../utils";
import { Color } from "../../../types";

type LetterProps = {
  color?: Color;
  letter?: string;
};

export const Letter = ({ color, letter }: LetterProps) => {
  return (
    <Flex
      justify="center"
      width={{ base: "56px", md: "72px" }}
      height={{ base: "56px", md: "72px" }}
      fontSize={{ base: "32px", md: "36px" }}
      fontWeight="bold"
      color="white"
      borderWidth="2px"
      borderStyle="solid"
      borderColor={color ? getColorValue(color) : "gray.600"}
      background={color && getColorValue(color)}
    >
      {letter}
    </Flex>
  );
};
