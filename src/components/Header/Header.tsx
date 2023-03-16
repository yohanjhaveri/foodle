import { Flex, Image } from "@chakra-ui/react";

import FoodleLogo from "../../images/foodle-logo.png";

export const Header = () => {
  return (
    <Flex
      width="100%"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.700"
      background="gray.800"
      justify="center"
      align="center"
    >
      <Image src={FoodleLogo} height="49px" />
    </Flex>
  );
};
