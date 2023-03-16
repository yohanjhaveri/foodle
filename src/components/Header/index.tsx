import { useEffect } from "react";
import { useGlobal } from "../../context";
import { Flex, Image } from "@chakra-ui/react";
import { FaChartBar, FaRegQuestionCircle } from "react-icons/fa";
import { GameModal } from "../Modals/GameModal";
import { Icon } from "./Icon";

import FoodleLogo from "../../images/foodle-logo.png";

export const Header = () => {
  const { state, modal, setModal } = useGlobal();

  const LEFT = (
    <Icon
      icon={<FaRegQuestionCircle />}
      ariaLabel="about"
      onClick={() => setModal("ABOUT")}
    />
  );

  const LOGO = <Image src={FoodleLogo} height="59px" />;

  const RIGHT = (
    <Icon
      icon={<FaChartBar />}
      ariaLabel="stats"
      onClick={() => setModal("STATS")}
    />
  );

  const MODAL = modal && <GameModal modal={modal} setModal={setModal} />;

  useEffect(() => {
    if (["WIN", "LOSE"].includes(state)) {
      setModal("STATS");
    }
  }, [state]);

  return (
    <Flex
      width="100%"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.700"
      background="gray.800"
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
