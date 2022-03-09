import {
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGame } from "../hooks/useGame";
import { Game } from "./Game/Game";
import { Header } from "./Header/Header";
import { Keyboard } from "./Keyboard/Keyboard";
import { AboutModal } from "./Modals/AboutModal";
import { SettingsModal } from "./Modals/SettingsModal";
import { StatsModal } from "./Modals/StatsModal";

type ModalName = "STATS" | "ABOUT" | "SETTINGS";

export const Main = () => {
  const { state } = useGame();

  const [openModal, setOpenModal] = useState<ModalName | "">("");

  const handleCloseModal = () => {
    setOpenModal("");
  };

  const handleOpenModal = (modal: ModalName) => {
    setOpenModal(modal);
  };

  useEffect(() => {
    if (["WIN", "LOSE"].includes(state)) {
      handleOpenModal("STATS");
    }
  }, [state]);

  const heading =
    openModal &&
    {
      STATS: "STATISTICS",
      ABOUT: "HOW TO PLAY",
      SETTINGS: "SETTINGS",
    }[openModal];

  const MODAL =
    openModal &&
    {
      STATS: <StatsModal />,
      ABOUT: <AboutModal />,
      SETTINGS: <SettingsModal />,
    }[openModal];

  return (
    <Box minHeight="100vh">
      <Modal isOpen={!!openModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{MODAL}</ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Header />
      <Grid
        gap="20px"
        justifyContent="center"
        alignItems="flex-end"
        paddingTop="80px"
        paddingBottom="20px"
        height="100vh"
      >
        <Game />
        <Keyboard />
      </Grid>
    </Box>
  );
};
