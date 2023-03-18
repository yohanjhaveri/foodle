import { useEffect } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { animations, colors } from "../../../styles";
import { Animator } from "../../Animator";
import { Color } from "../../../types";
import { useToggleDelay } from "../../../hooks/useToggleDelay";

type BoxProps = Omit<FlexProps, "color"> & {
  flip: boolean;
  reveal: boolean;
  color?: Color;
  bounce?: boolean;
  letter?: string;
  rowType?: "filled" | "active" | "empty";
};

export const Box = ({
  flip,
  bounce,
  reveal,
  color,
  letter,
  rowType,
  ...rest
}: BoxProps) => {
  const [pop, triggerPop] = useToggleDelay(100);

  useEffect(() => {
    if (letter && rowType === "active") {
      triggerPop();
    }
  }, [letter, rowType, triggerPop]);

  return (
    <Animator duration={100} animation={animations.POP} condition={pop}>
      <Animator
        duration={1000}
        animation={animations.BOUNCE}
        condition={bounce || false}
      >
        <Animator
          timing="ease-in"
          duration={500}
          animation={animations.FLIP}
          condition={flip}
        >
          <Flex
            w={{ base: "56px", md: "72px" }}
            h={{ base: "56px", md: "72px" }}
            justify="center"
            align="center"
            fontSize={{ base: "32px", md: "40px" }}
            fontWeight="bold"
            borderWidth="2px"
            borderStyle="solid"
            borderColor={
              reveal && color ? colors[color] : `gray.${letter ? 600 : 700}`
            }
            bg={reveal && color ? colors[color] : ""}
            {...rest}
          >
            {letter}
          </Flex>
        </Animator>
      </Animator>
    </Animator>
  );
};
