import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
  const MODAL = {
    STATS: <StatsModal />,
    ABOUT: <AboutModal />,
  }[modal];

  return (
    <Modal isOpen={true} onClose={() => setModal("")}>
      <ModalOverlay />
      <ModalContent width={{ base: "350px", md: "500px" }} bg="gray.900">
        <ModalCloseButton />
        <ModalBody>{MODAL}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
