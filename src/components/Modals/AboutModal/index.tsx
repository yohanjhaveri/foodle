import {
  Divider,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Example } from "./Example";

export const AboutModal = () => {
  return (
    <>
      <Heading
        fontSize={{ base: "1.3rem", md: "lg" }}
        fontWeight="800"
        color="yellow.300"
        mt="5"
        mb="1"
      >
        How to play
      </Heading>
      <Heading fontSize={{ base: "0.9rem", md: "md" }} fontWeight="500" mb="2">
        Guess the <strong>Foodle</strong> in 6 tries
      </Heading>
      <UnorderedList fontSize={{ base: "sm", md: "md" }}>
        <ListItem>The correct word will be food-related</ListItem>
        <ListItem>The guess can be any valid 5-letter word</ListItem>
        <ListItem>The word changes daily at midnight</ListItem>
      </UnorderedList>
      <Heading fontSize={{ base: "sm", md: "md" }} mt="6" mb="3">
        Examples
      </Heading>
      <Example
        word="TACOS"
        index={0}
        color="GREEN"
        message=" is in the word and in the correct spot"
      />
      <Example
        word="BASIL"
        index={1}
        color="YELLOW"
        message=" is in the word but is in the wrong spot"
      />
      <Example
        word="KNIFE"
        index={3}
        color="GRAY"
        message=" is not in the word in any spot"
      />
      <Divider my="4" />
      <Text>
        Made by{" "}
        <Link
          color="yellow.300"
          textDecor="underline"
          href="https://yohanjhaveri.com"
          target="_blank"
        >
          Yohan Jhaveri
        </Link>
      </Text>
    </>
  );
};
