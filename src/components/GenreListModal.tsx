import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import GenreList from "./GenreList";

const GenreListModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        display={{ base: "block", lg: "none" }}
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="docked"
        colorScheme="green"
        borderRadius="full"
      >
        <HamburgerIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Genres</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GenreList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenreListModal;
