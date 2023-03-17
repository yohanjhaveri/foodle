import { keyframes } from "@chakra-ui/react";
import { css } from "@emotion/react";

export const colors = {
  GREEN: "green.600",
  YELLOW: "yellow.500",
  GRAY: "gray.700",
};

const jiggle = keyframes`
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
`;

const flip = keyframes`
  0% {
    transform: rotateX(0);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0);
  }
`;

const pop = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  40% {
    transform: scale(1.1);
    opacity: 1;
  }
`;

export const animations = {
  JIGGLE: css`
    ${jiggle} 300ms
  `,
  POP: css`
    ${pop} 100ms
  `,
  FLIP: css`
    ${flip} 500ms ease-in
  `,
};
