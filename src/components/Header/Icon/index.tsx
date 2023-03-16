import { IconButton } from "@chakra-ui/react";

type IconProps = {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  tabIndex?: number;
  ariaLabel: string;
  onClick?: () => void;
};

export const Icon = ({ icon, ariaLabel, tabIndex, onClick }: IconProps) => (
  <IconButton
    color="gray.400"
    background="transparent"
    fontSize="20px"
    icon={icon}
    tabIndex={tabIndex}
    aria-label={ariaLabel}
    onClick={onClick}
    _hover={{ background: "gray.800" }}
    _active={{ background: "gray.800" }}
  />
);
