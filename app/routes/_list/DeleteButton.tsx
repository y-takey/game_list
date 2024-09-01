import { FC, useRef, RefObject } from "react";
import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useItems } from "~/hooks";

const DeleteButton: FC<{ id: string }> = props => {
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { deleteItem } = useItems();

  const onDelete = () => {
    deleteItem(id);
  };

  return (
    <>
      <Button colorScheme="red" size="sm" variant="outline" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef as RefObject<HTMLButtonElement>} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
