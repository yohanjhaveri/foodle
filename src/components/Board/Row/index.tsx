import { Flex } from "@chakra-ui/react";
import { generateIterator } from "../../../utils";
import { animations } from "../../../styles";
import { WORD_SIZE } from "../../../constants";
import { Animator } from "../../Animator";
import { Box } from "../Box";
import { useRow } from "./state";

export type RowProps = {
  index: number;
};

export const Row = ({ index }: RowProps) => {
  const { type, turns, colors, letters, jiggle, reveal, revealIndex } =
    useRow(index);

  const shouldAnimate = type === "active" && jiggle;

  const shouldReveal = (i: number) =>
    !reveal ||
    (reveal && index < turns.length - 1) ||
    (reveal && i <= revealIndex);

  return (
    <Animator
      duration={300}
      animation={animations.JIGGLE}
      condition={shouldAnimate}
    >
      <Flex gap="6px" justify="center">
        {generateIterator(WORD_SIZE).map((i) => (
          <Box
            key={i}
            color={colors[i]}
            letter={letters[i]}
            reveal={shouldReveal(i)}
            flip={i === revealIndex}
          />
        ))}
      </Flex>
    </Animator>
  );
};
