import {
  Box,
  Divider,
  Heading,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import type { Category } from "@/types/category/types";

export default function SingleCategory ({
  category,
  openHandler,
  deleteHandler,
  isDeleteLoading
} : {
  category: Category;
  openHandler: (category: Category) => void,
  deleteHandler: (category: Category) => void,
  isDeleteLoading: boolean;
}) {
  return (
    <Box
      position="relative"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      onClick={() => openHandler(category)}
    >
      <Heading size="md" mt="3">{category.title}</Heading>
      <Divider my="4" />
      <Text noOfLines={[1, 2, 3]} color="gray.800">
        {category.description}
      </Text>
      <Center>
        <Button
          mt="4"
          size="sm"
          colorScheme="red"
          onClick={(event) => {
            event.stopPropagation();
            deleteHandler(category);
          }}
          isDisabled={isDeleteLoading}
        >
          Delete
        </Button>
      </Center>
    </Box>
  );
};