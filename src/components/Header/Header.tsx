import { Flex, Icon, Image } from "@chakra-ui/react";
import { FaChartBar, FaCog, FaRegQuestionCircle } from "react-icons/fa";

import FoodleLogo from "../../foodle-logo.png";

export const Header = () => {
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
      <Flex margin="20px" gap="20px">
        <Icon color="gray.400" fontSize="20px" as={FaRegQuestionCircle} />
        <Icon
          color="gray.400"
          fontSize="20px"
          as={() => <Flex width="20px" />}
        />
      </Flex>
      <Image src={FoodleLogo} height="60px" />
      <Flex margin="20px" gap="20px">
        <Icon color="gray.400" fontSize="20px" as={FaChartBar} />
        <Icon color="gray.400" fontSize="20px" as={FaCog} />
      </Flex>
    </Flex>
  );
};
