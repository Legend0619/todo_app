"use client"

import { useState, useEffect, useRef } from "react";
import { Box, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ManageCategory from "@/components/category/ManageCategory";
import SingleCategory from "@/components/category/SingleCategory";
import type { Category } from "@/types/category/types";
import { useCategoryStore } from "@/store/useCategoryStore";

const Category = () => {
  const initialRef = useRef(null);
  const [category, setCategory] = useState<Category>({
    id: "",
    title: "",
    description: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { categories, removeCategory } = useCategoryStore();

  const openHandler = (clickedCategory: Category) => {
    setCategory(clickedCategory);
    onOpen();
  };

  const addHandler = () => {
    setCategory({
      id: "",
      title: "",
      description: "",
    });
    onOpen();
  }

  const deleteHandler = async (category: Category) => {
    setIsDeleteLoading(true);
    await removeCategory(category);
    setIsDeleteLoading(false);
  };

  return (
    <Box maxW="6xl" mx="auto">
      <ManageCategory
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        category={category}
      />
      <HStack my="10" spacing="4" justify="right">
        <Box>
          <Button colorScheme="blue" onClick={addHandler}>Add Category</Button>
        </Box>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        gap={{ base: "4", md: "6", lg: "8" }}
        my="10"
      >
        {categories.map((category, index) => (
          <SingleCategory
            category={category}
            key={index}
            openHandler={() => openHandler(category)}
            deleteHandler={() => deleteHandler(category)}
            isDeleteLoading={isDeleteLoading}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Category;
