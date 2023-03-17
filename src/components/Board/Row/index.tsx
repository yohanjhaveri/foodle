import { Flex } from "@chakra-ui/react";
import { generateIterator } from "../../../utils";
import { animations } from "../../../styles";
import { WORD_SIZE } from "../../../constants";
import { Animator } from "../../Animator";
import { Letter } from "../Letter";
import { useRow } from "./state";

export type RowProps = {
  index: number;
};

export const Row = ({ index }: RowProps) => {
  const { type, turns, colors, letters, jiggle, reveal, revealIndex } =
    useRow(index);

  const shouldAnimate = type === "active" && jiggle;

  const shouldBeRevealed = (i: number) =>
    !reveal ||
    (reveal && index < turns.length - 1) ||
    (reveal && i <= revealIndex);

  return (
    <Animator active={shouldAnimate} animation={animations.JIGGLE}>
      <Flex gap="6px" justify="center">
        {generateIterator(WORD_SIZE).map((i) => (
          <Letter
            key={i}
            color={colors[i]}
            letter={letters[i]}
            reveal={shouldBeRevealed(i)}
            flip={i === revealIndex}
          />
        ))}
      </Flex>
    </Animator>
  );
};
