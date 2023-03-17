import {
  Box,
  Flex,
  Grid,
  Heading,
  Stat,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";
import { calculateStats } from "../../../utils";
import { BarChart } from "./BarChart";

export const StatsModal = () => {
  const { numPlayed, winPercent, currentStreak, longestStreak, distribution } =
    calculateStats();

  return (
    <Flex direction="column" justify="space-between" gap="6">
      <Box>
        <Heading
          fontSize={{ base: "1.3rem", md: "lg" }}
          fontWeight="800"
          color="yellow.300"
          mt="5"
          mb="1"
        >
          Statistics
        </Heading>
        <Heading
          fontSize={{ base: "0.9rem", md: "md" }}
          fontWeight="500"
          mb="2"
        >
          Keep the streak going!
        </Heading>
        <Grid
          gap="8px"
          mt="4"
          px="2"
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        >
          <Stat>
            <StatNumber>{numPlayed}</StatNumber>
            <StatHelpText>played</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{winPercent}%</StatNumber>
            <StatHelpText>won</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{currentStreak}</StatNumber>
            <StatHelpText>current streak</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{longestStreak}</StatNumber>
            <StatHelpText>longest streak</StatHelpText>
          </Stat>
        </Grid>
      </Box>
      <Box>
        <Heading fontSize={{ base: "md", md: "lg" }} mb="6">
          Guess Distribution
        </Heading>
        <BarChart data={distribution} />
      </Box>
    </Flex>
  );
};
