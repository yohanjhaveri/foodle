import { Flex, Grid } from "@chakra-ui/react";
import { generateIterator } from "../../utils";
import { ALLOWED_ATTEMPTS } from "../../constants";
import { Row } from "./Row";

export const Board = () => {
  const rows = generateIterator(ALLOWED_ATTEMPTS);

  return (
    <Flex h="100%" justify="center">
      <Grid px="20px" py="15px" gap="6px">
        {rows.map((i) => (
          <Row key={i} index={i} />
        ))}
      </Grid>
    </Flex>
  );
};
