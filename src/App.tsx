import { ChakraProvider, DarkMode, extendTheme } from "@chakra-ui/react";
import { Provider } from "./context";
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
        color: "white",
        background: "gray.900",
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <DarkMode>
      <Provider>
        <Main />
      </Provider>
    </DarkMode>
  </ChakraProvider>
);
