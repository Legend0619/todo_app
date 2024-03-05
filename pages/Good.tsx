"use client"

import { useRef, useState, useEffect } from "react";
import {
  Box,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ButtonGroup,
} from "@chakra-ui/react";
import ManageGood from "@/components/good/ManageGood";
import { useDisclosure } from "@chakra-ui/hooks";
import type { Good } from "@/types/good/types";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useGoodStore } from "@/store/useGoodStore";

const Good = () => {
  const initialRef = useRef(null);
  const [good, setGood] = useState<Good>({
    id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { categories } = useCategoryStore();
  const { goods, removeGood } = useGoodStore();

  const openHandler = (clickedGood: Good) => {
    setGood(clickedGood);
    onOpen();
  };

  const addHandler = () => {
    setGood({
      id: "",
      title: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
    });
    onOpen();
  }

  const deleteHandler = async (good: Good) => {
    setIsDeleteLoading(true);
    await removeGood(good);
    setIsDeleteLoading(false);
  }

  const getCategory = (categoryId: string) => {
    const idx = categories.findIndex(category => category.id === categoryId);
    return categories[idx].title;
  }

  return (
    <Box maxW="6xl" mx="auto">
      <ManageGood
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        good={good}
      />
      <HStack my="10" spacing="4" justify="right">
        <Box>
          <Button colorScheme="blue" onClick={addHandler}>Add Good</Button>
        </Box>
      </HStack>
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {goods.map((good) => (
              <Tr key={good.id}>
                <Td>{good.title}</Td>
                <Td>{good.description}</Td>
                <Td>{getCategory(good.category)}</Td>
                <Td isNumeric>{good.price}</Td>
                <Td isNumeric>{good.stock}</Td>
                <Td colSpan={2}>
                  <Box>
                    <ButtonGroup spacing={2}>
                      <Button size="sm" colorScheme="blue" onClick={() => openHandler(good)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => deleteHandler(good)}>Delete</Button>
                    </ButtonGroup>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Good;