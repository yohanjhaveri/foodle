import { ChakraProvider, DarkMode, extendTheme } from "@chakra-ui/react";
import { GameProvider } from "./context/GameContext";
import { Main } from "./components/Main";

const theme = extendTheme({
  styles: {
    global: {
      "*": {
        " -webkit-touch-callout": "none",
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        boxSizing: "border-box",
      },
      "html, body": {
        margin: 0,
        padding: 0,
        height: "100%",
        color: "gray.900",
        background: "gray.800",
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <GameProvider>
      <DarkMode>
        <Main />
      </DarkMode>
    </GameProvider>
  </ChakraProvider>
);
