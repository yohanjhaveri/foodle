import { Flex, keyframes } from "@chakra-ui/react";

export type RowWrapperProps = {
  children: React.ReactNode;
  jiggle?: boolean;
};

export const RowWrapper = ({ children, jiggle }: RowWrapperProps) => {
  const jiggleAnimation = keyframes`
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

  return (
    <Flex
      gap="6px"
      justify="center"
      animation={jiggle ? `${jiggleAnimation} linear` : ""}
      style={{
        animationDuration: jiggle ? "300ms" : "",
      }}
    >
      {children}
    </Flex>
  );
};
