import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { loader } from "./loader";
export const clientLoader = loader;

export default function Index() {
  const item = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{item.point}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
