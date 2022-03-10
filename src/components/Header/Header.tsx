import { Flex, Image } from "@chakra-ui/react";
import { FaChartBar, FaCog, FaRegQuestionCircle } from "react-icons/fa";

import { ModalName } from "../../types";
import { HeaderIcon } from "./HeaderIcon";

import FoodleLogo from "../../foodle-logo.png";

type Props = {
  handleOpenModal: (modal: ModalName) => void;
};

export const Header = ({ handleOpenModal }: Props) => {
  const LEFT = (
    <Flex margin="20px" gap="20px">
      <HeaderIcon
        icon={<FaRegQuestionCircle />}
        ariaLabel="about"
        onClick={() => handleOpenModal("ABOUT")}
      />
      <HeaderIcon
        icon={<Flex width="20px" />}
        ariaLabel="dummy"
        tabIndex={-1}
      />
    </Flex>
  );

  const LOGO = <Image src={FoodleLogo} height="60px" />;

  const RIGHT = (
    <Flex margin="20px" gap="20px">
      <HeaderIcon
        icon={<FaChartBar />}
        ariaLabel="stats"
        onClick={() => handleOpenModal("STATS")}
      />
      <HeaderIcon
        icon={<FaCog />}
        ariaLabel="settings"
        onClick={() => handleOpenModal("SETTINGS")}
      />
    </Flex>
  );

  return (
    <Flex
      width="100%"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.700"
      background="gray.800"
      justify="space-between"
      align="center"
      position="fixed"
      top="0"
    >
      {LEFT}
      {LOGO}
      {RIGHT}
    </Flex>
  );
};
