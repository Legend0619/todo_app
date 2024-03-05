import { v4 as uuidv4 } from "uuid";

import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  Select
} from "@chakra-ui/react";
import { FormEvent, useState, useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useGoodStore } from "@/store/useGoodStore";
import { Good } from "@/types/good/types";

export default function ManageGood ({
  isOpen,
  onClose,
  initialRef,
  good,
} : {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  good: Good;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { categories } = useCategoryStore();
  const { addGood, updateGood } = useGoodStore();

  useEffect(() => {
    setTitle(good.title);
    setDescription(good.description);
    setPrice(good.price);
    setCategory(good.category);
    setStock(good.stock);
  }, [good]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    if (good.id) {
      updateGood({
        id: good.id,
        title,
        description,
        price,
        category,
        stock,
      });
    } else {
      addGood({
        id: uuidv4(),
        title,
        description,
        price,
        category,
        stock,
      });
    }
    setIsLoading(false);
    closeHandler();
  }

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setStock(0);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>{good.id ? "Update Good" : "Add Good"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {errorMessage && (
              <Alert status="error" borderRadius="lg" mb="6">
                <AlertIcon />
                <Text textAlign="center">{errorMessage}</Text>
              </Alert>
            )}
            <FormControl isRequired={true}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Add your title here"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </FormControl>

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Add your description here"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </FormControl>

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder='Select option'
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Add your price here"
                onChange={(event) => setPrice(Number(event.target.value))}
                value={price}
              />
            </FormControl>

            <FormControl mt={4} isRequired={true}>
              <FormLabel>Stock</FormLabel>
              <Input
                placeholder="Add your price here"
                onChange={(event) => setStock(Number(event.target.value))}
                value={stock}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing="3">
              <Button
                onClick={closeHandler}
                colorScheme="red"
                type="reset"
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                {good.id ? "Update" : "Add"}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}