import { Flex } from "@chakra-ui/react";
import { useResponsive } from "../../hooks/useResponsive";
import { getTheme } from "../../utils";
import { Color } from "../../types";

type Props = {
  label: string;
  value: string;
  color?: Color;
  length: "short" | "long";
  onClick: (letter: string) => void;
};

export const Key = ({ color, label, value, length, onClick }: Props) => {
  const { width: deviceWidth } = useResponsive();

  const width = Math.min(deviceWidth / 12, 50) + "px";
  const fontSize = Math.min(deviceWidth / 24, 24) + "px";
  const borderRadius = Math.min(deviceWidth / 80, 6) + "px";

  const long = ["Enter", "Back"].includes(label);

  return (
    <Flex
      justify="center"
      cursor="pointer"
      align="center"
      width={{
        base: long ? "50px" : width,
        md: long ? "70px" : width,
      }}
      height={{ base: "50px", md: "70px" }}
      fontSize={["Enter", "Back"].includes(label) ? "16px" : fontSize}
      fontWeight="600"
      color="white"
      background={color ? getTheme(color) : "gray.600"}
      borderRadius={borderRadius}
      onClick={() => onClick(value)}
    >
      {label}
    </Flex>
  );
};
