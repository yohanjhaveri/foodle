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

  return (
    <Flex
      gap="6px"
      justify="center"
      animation={type === "active" && jiggle ? `${jiggleAnimation} linear` : ""}
      style={{ animationDuration: type === "active" && jiggle ? "300ms" : "" }}
    >
      {generateIndexArray(WORD_SIZE).map((i) => (
        <Letter key={i} color={colors[i]} letter={letters[i]} />
      ))}
    </Flex>
  );
};
