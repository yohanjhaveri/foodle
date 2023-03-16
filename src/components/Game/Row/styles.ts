import { keyframes } from "@chakra-ui/react";

export const jiggleAnimation = keyframes`
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
