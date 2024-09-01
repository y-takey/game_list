import { useState, ChangeEventHandler } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import {
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

import { useItems } from "~/hooks";
import { GameItem } from "~/types";

export default function Show() {
  const params = useParams<{ id: string }>();
  const { getItem, saveItem } = useItems();
  const [item, setItem] = useState<GameItem>(() => getItem(params.id)!);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const onOk = () => {
    saveItem(item)
      .then(() => onClose())
      .catch(e => console.error(e));
  };

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = e => {
    setItem(current => ({ ...current, title: e.target.value }));
  };
  const onChangeDone: ChangeEventHandler<HTMLInputElement> = e => {
    setItem(current => ({ ...current, done: e.target.checked }));
  };
  const onChangeReleaseDate: ChangeEventHandler<HTMLInputElement> = e => {
    setItem(current => ({ ...current, releaseDate: e.target.value }));
  };
  const onChangePoint: ChangeEventHandler<HTMLInputElement> = e => {
    setItem(current => ({ ...current, point: e.target.value }));
  };
  const onChangePlatform: ChangeEventHandler<HTMLSelectElement> = e => {
    setItem(current => ({ ...current, platform: e.target.value }));
  };
  const onChangeNote: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setItem(current => ({ ...current, note: e.target.value }));
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={item.title} onChange={onChangeTitle} />
            </FormControl>
            <FormControl>
              <FormLabel></FormLabel>
              <Checkbox isChecked={item.done} onChange={onChangeDone}>
                Done
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Release</FormLabel>
              <Input type="date" value={item.releaseDate} onChange={onChangeReleaseDate} />
            </FormControl>
            <FormControl>
              <FormLabel>Platform</FormLabel>
              <Select value={item.platform} onChange={onChangePlatform}>
                <option value="ps">PS</option>
                <option value="switch">Switch</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Point</FormLabel>
              <Input value={item.point} onChange={onChangePoint} />
            </FormControl>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Textarea value={item.note} onChange={onChangeNote} />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={onOk}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
