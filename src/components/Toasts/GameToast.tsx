import { Box, Flex } from "@chakra-ui/react";

export type GameToastProps = {
  children: React.ReactNode;
};

export const GameToast = ({ children }: GameToastProps) => (
  <Flex justify="center" pt="60px">
    <Box
      px="16px"
      py="8px"
      color="gray.700"
      bg="yellow.200"
      borderRadius="md"
      fontSize="xl"
      fontWeight="700"
    >
      {children}
    </Box>
  </Flex>
);
