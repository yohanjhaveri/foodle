import { Flex } from "@chakra-ui/react";
import { generateIterator } from "../../../../utils";
import { ALLOWED_ATTEMPTS } from "../../../../constants";

export type BarChartProps = {
  data: number[];
};

export const BarChart = ({ data }: BarChartProps) => {
  const sum = data.reduce((a, b) => a + b, 0) || 1;
  const max = Math.max(...data) || 1;

  const multiplier = sum / max;

  return (
    <Flex gap="2" h="180px" direction="column">
      <Flex flexGrow="2" align="flex-end">
        {generateIterator(ALLOWED_ATTEMPTS).map((i) => (
          <Flex
            key={i}
            w="50px"
            h={`max(${
              Math.floor(multiplier * 100 * data[i]) / (sum || 1)
            }%, 5px)`}
            mx={{ base: "5px", md: "10px" }}
            bg="yellow.300"
            color="gray.900"
            fontSize="1.2rem"
            fontWeight="extrabold"
            justify="center"
            align="center"
          >
            {data[i] !== 0 && <Flex>{data[i]}</Flex>}
          </Flex>
        ))}
      </Flex>
      <Flex>
        {generateIterator(ALLOWED_ATTEMPTS).map((i) => (
          <Flex
            key={i}
            flex="1"
            justify="center"
            fontSize="1rem"
            fontWeight="extrabold"
          >
            {i + 1}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
