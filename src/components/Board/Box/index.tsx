import { Flex } from "@chakra-ui/react";
import { animations, colors } from "../../../styles";
import { Animator } from "../../Animator";
import { Color } from "../../../types";

type BoxProps = {
  flip: boolean;
  reveal: boolean;
  color?: Color;
  letter?: string;
};

export const Box = ({ flip, reveal, color, letter }: BoxProps) => {
  return (
    <Animator
      timing="ease-in"
      duration={500}
      animation={animations.FLIP}
      condition={flip}
    >
      <Flex
        w={{ base: "56px", md: "72px" }}
        h={{ base: "56px", md: "72px" }}
        justify="center"
        align="center"
        fontSize={{ base: "32px", md: "40px" }}
        fontWeight="bold"
        background={reveal && color ? colors[color] : ""}
        borderWidth="2px"
        borderStyle="solid"
        borderColor={
          reveal && color ? colors[color] : `gray.${letter ? 600 : 700}`
        }
      >
        {letter}
      </Flex>
    </Animator>
  );
};
