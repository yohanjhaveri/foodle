import { useGlobal } from "../../context";
import { Flex, Image } from "@chakra-ui/react";
import { FaQuestionCircle, FaRegChartBar } from "react-icons/fa";
import { GameModal } from "../Modals/GameModal";
import { Icon } from "./Icon";

import FoodleLogo from "../../images/foodle-logo.png";

export const Header = () => {
  const { modal, setModal } = useGlobal();

  const LEFT = (
    <Icon
      icon={<FaRegChartBar />}
      ariaLabel="stats"
      onClick={() => setModal("STATS")}
    />
  );

  const LOGO = <Image src={FoodleLogo} height="59px" />;

  const RIGHT = (
    <Icon
      icon={<FaQuestionCircle />}
      ariaLabel="about"
      onClick={() => setModal("ABOUT")}
    />
  );

  const MODAL = modal && <GameModal modal={modal} setModal={setModal} />;

  return (
    <Flex
      width="100%"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.700"
      background="gray.900"
      justify="space-between"
      align="center"
      px="10px"
    >
      {LEFT}
      {LOGO}
      {RIGHT}
      {MODAL}
    </Flex>
  );
};
