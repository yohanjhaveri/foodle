import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { getColorValue } from "../../../utils";
import { animations } from "../../../styles";
import { Color } from "../../../types";

type LetterProps = {
  flip: boolean;
  reveal: boolean;
  color?: Color;
  letter?: string;
};

const FlipAnimator = styled.div<{ state: "in" | "out" | "none" }>`
  animation: ${(props) => {
    switch (props.state) {
      case "in":
        return animations.FLIP_IN;
      case "out":
        return animations.FLIP_OUT;
      default:
        return "";
    }
  }};
`;

const PopAnimator = styled.div<{ active: boolean }>`
  animation: ${(props) => (props.active ? animations.POP : "")};
`;

export const Letter = ({ flip, reveal, color, letter }: LetterProps) => {
  const [pop, setPop] = useState(false);
  const [state, setState] = useState<"in" | "out" | "none">("none");
  const [value, setValue] = useState("RANDOM");

  useEffect(() => {
    if (flip) {
      setState("in");

      setTimeout(() => {
        setState("out");
      }, 250);

      setTimeout(() => {
        setState("none");
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
  }, [letter]);

  return (
    <PopAnimator active={pop}>
      <FlipAnimator state={state}>
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
      </FlipAnimator>
    </PopAnimator>
  );
};
