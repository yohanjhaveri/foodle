import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AboutModal } from "./AboutModal";
import { StatsModal } from "./StatsModal";
import { ModalName } from "../../types";

export type GameModalProps = {
  modal: ModalName;
  setModal: (modal: ModalName | "") => void;
};

export const GameModal = ({ modal, setModal }: GameModalProps) => {
  const heading = {
    STATS: "STATISTICS",
    ABOUT: "HOW TO PLAY",
  }[modal];

  const MODAL = {
    STATS: <StatsModal />,
    ABOUT: <AboutModal />,
  }[modal];

  return (
    <Modal size="xs" isOpen={true} onClose={() => setModal("")}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{MODAL}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
