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
  const [pop, setPop] = useState(false);
  const [state, setState] = useState(false);
  const [value, setValue] = useState("RANDOM");

  useEffect(() => {
    if (flip) {
      setState(true);

      setTimeout(() => {
        setState(false);
      }, 500);
    }
  }, [flip]);

  useEffect(() => {
    if (!reveal && value !== "RANDOM") {
      setPop(true);

      setTimeout(() => {
        setPop(false);
      }, 100);
    }

    setValue(letter || "");
  }, [letter, reveal, value]);

  return (
    <Animator active={pop} animation={animations.POP}>
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
    </Animator>
  );
};
