import styled from "@emotion/styled";
import { Flex } from "@chakra-ui/react";
import { useRow } from "./state";
import { generateIterator } from "../../../utils";
import { animations } from "../../../styles";
import { WORD_SIZE } from "../../../constants";
import { Letter } from "../Letter";

export type RowProps = {
  index: number;
};

const JiggleAnimator = styled.div<{ active: boolean }>`
  animation: ${(props) => (props.active ? animations.JIGGLE : "")};
`;

export const Row = ({ index }: RowProps) => {
  const { type, turns, colors, letters, jiggle, reveal, revealIndex } =
    useRow(index);

  const shouldAnimate = type === "active" && jiggle;

  const shouldBeRevealed = (i: number) =>
    !reveal ||
    (reveal && index < turns.length - 1) ||
    (reveal && i <= revealIndex);

  return (
    <JiggleAnimator active={shouldAnimate}>
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
    </JiggleAnimator>
  );
};
