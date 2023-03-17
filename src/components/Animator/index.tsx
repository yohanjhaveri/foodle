import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";

type AnimatorProps = {
  active: boolean;
  animation: SerializedStyles;
};

export const Animator = styled.div<AnimatorProps>`
  animation: ${(props) => (props.active ? props.animation : "")};
`;
