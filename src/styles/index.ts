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

const bounce = keyframes`
  0%, 20% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-15px);
  }
  80% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0);
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
    ${jiggle}
  `,
  FLIP: css`
    ${flip}
  `,
  BOUNCE: css`
    ${bounce}
  `,
  POP: css`
    ${pop}
  `,
};
