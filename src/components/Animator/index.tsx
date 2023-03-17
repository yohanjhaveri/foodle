import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";
import { useAnimator } from "./state";

type AnimatorProps = {
  timing?: string;
  duration: number;
  condition: boolean;
  animation: SerializedStyles;
  children: React.ReactNode;
};

type AnimatorWrapperProps = {
  timing?: string;
  duration: number;
  condition: boolean;
  animation: SerializedStyles;
};

export const Animator = ({
  timing,
  duration,
  condition,
  animation,
  children,
}: AnimatorProps) => {
  const [active] = useAnimator({ duration, condition });

  return (
    <AnimatorWrapper
      timing={timing}
      duration={duration}
      condition={active}
      animation={animation}
    >
      {children}
    </AnimatorWrapper>
  );
};

const AnimatorWrapper = styled.div<AnimatorWrapperProps>`
  animation: ${(props) => (props.condition ? props.animation : "")};
  animation-duration: ${(props) => props.duration}ms;
  animation-timing-function: ${(props) => props.timing};
`;
