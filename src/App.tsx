import { ChakraProvider, DarkMode } from "@chakra-ui/react";

import { GameProvider } from "./context/GameContext";
import { ResponsiveProvider } from "./context/ResponsiveContext";

import { Main } from "./components/Main";
import { createGlobalStyle } from "styled-components";

export const App = () => {
  return (
    <ChakraProvider>
      <GameProvider>
        <ResponsiveProvider>
          <GlobalStyles />
          <DarkMode>
            <Main />
          </DarkMode>
        </ResponsiveProvider>
      </GameProvider>
    </ChakraProvider>
  );
};

const GlobalStyles = createGlobalStyle`
  html, body, main, #root {
    margin: 0;
    padding: 0;
    color: white;
    background: #1A202C;
  }

  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    box-sizing: border-box;
  }
`;
