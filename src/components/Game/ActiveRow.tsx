import styled from "styled-components";
import { Grid } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { generateIndexArray } from "../../utils";
import { LetterBlock } from "./LetterBlock";

export const ActiveRow = () => {
  const { size, guess, jiggle } = useGame();

  return (
    <Row gap="6px" templateColumns="repeat(5, 1fr)" jiggle={jiggle}>
      {generateIndexArray(size).map((i) => (
        <LetterBlock key={i} letter={guess.charAt(i)} />
      ))}
    </Row>
  );
};

const Row = styled(Grid)<{ jiggle: boolean }>`
  @keyframes jiggle {
    0% {
      transform: translate(0, 0);
    }
    16% {
      transform: translate(-0.5rem, 0);
    }
    32% {
      transform: translate(0.5rem, 0);
    }
    48% {
      transform: translate(-0.5rem, 0);
    }
    64% {
      transform: translate(0.5rem, 0);
    }
    90% {
      transform: translate(-0.5rem, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  ${(props) =>
    props.jiggle &&
    `
      animation: jiggle linear;
      animation-duration: 300ms;
    `}
`;
