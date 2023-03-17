import { Box, Flex } from "@chakra-ui/react";

export type GameToastProps = {
  children: React.ReactNode;
};

export const GameToast = ({ children }: GameToastProps) => (
  <Flex justify="center" pt="60px">
    <Box
      px="12px"
      py="6px"
      color="gray.700"
      bg="yellow.200"
      borderRadius="md"
      fontSize="lg"
      fontWeight="700"
    >
      {children}
    </Box>
  </Flex>
);
