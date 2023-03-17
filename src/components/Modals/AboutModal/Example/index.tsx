import { Flex, Text } from "@chakra-ui/react";
import { Box } from "../../../Board/Box";
import { generateIterator } from "../../../../utils";
import { WORD_SIZE } from "../../../../constants";
import { Color } from "../../../../types";

export type ExampleProps = {
  word: string;
  index: number;
  color: Color;
  message: string;
};

export const Example = ({ word, index, color, message }: ExampleProps) => {
  return (
    <>
      <Flex gap="4px" mb="1">
        {generateIterator(WORD_SIZE).map((i) => (
          <Box
            key={i}
            color={i === index ? color : undefined}
            letter={word.charAt(i)}
            flip={i === index}
            reveal
            width={{ base: "30px", md: "40px" }}
            height={{ base: "30px", md: "40px" }}
            fontSize="20px"
          />
        ))}
      </Flex>
      <Text mb="4">
        <strong>{word.charAt(index)}</strong>
        {message}
      </Text>
    </>
  );
};
