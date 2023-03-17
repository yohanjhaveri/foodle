import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { getColorValue } from "../../../utils";
import { animations } from "../../../styles";
import { Animator } from "../../Animator";
import { Color } from "../../../types";

type LetterProps = {
  flip: boolean;
  reveal: boolean;
  color?: Color;
  letter?: string;
};

export const Letter = ({ flip, reveal, color, letter }: LetterProps) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (flip) {
      setState(true);

      setTimeout(() => {
        setState(false);
      }, 500);
    }
  }, [flip]);

  return (
    <Animator active={state} animation={animations.FLIP}>
      <Flex
        w={{ base: "56px", md: "72px" }}
        h={{ base: "56px", md: "72px" }}
        justify="center"
        align="center"
        fontSize={{ base: "32px", md: "36px" }}
        fontWeight="bold"
        color="white"
        background={reveal && color ? getColorValue(color) : ""}
        borderWidth="2px"
        borderStyle="solid"
        borderColor={
          reveal && color
            ? getColorValue(color)
            : letter
            ? "gray.600"
            : "gray.700"
        }
      >
        {letter}
      </Flex>
    </Animator>
  );
};
