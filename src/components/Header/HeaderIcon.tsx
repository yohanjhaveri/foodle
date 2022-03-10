import { IconButton } from "@chakra-ui/react";

type Props = {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  tabIndex?: number;
  ariaLabel: string;
  onClick?: () => void;
};

export const HeaderIcon = ({ icon, ariaLabel, tabIndex, onClick }: Props) => (
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
