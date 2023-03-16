import { Flex } from "@chakra-ui/react";
import { useRow } from "./state";
import { generateIndexArray } from "../../../utils";
import { WORD_SIZE } from "../../../constants";
import { jiggleAnimation } from "./styles";
import { Letter } from "../Letter";

export type RowProps = {
  index: number;
};

export const Row = ({ index }: RowProps) => {
  const { type, colors, letters, jiggle } = useRow(index);

  const shouldAnimate = type === "active" && jiggle;

  const animation = shouldAnimate ? `${jiggleAnimation} linear` : "";
  const animationDuration = shouldAnimate ? "300ms" : "";

  return (
    <Flex
      gap="6px"
      justify="center"
      animation={animation}
      style={{ animationDuration }}
    >
      {generateIndexArray(WORD_SIZE).map((i) => (
        <Letter key={i} color={colors[i]} letter={letters[i]} />
      ))}
    </Flex>
  );
};
