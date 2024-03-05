import NavLink from "next/link";
import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box height="100%" p="5" bg="gray.100">
      <Box maxW="6xl" mx="auto">
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
        >
          <Heading mr="4">App</Heading>
          <Box>
            <NavLink href="/category" className="mx-2">Categories</NavLink>
            <NavLink href="/good" className="mx-2">Goods</NavLink>
            <NavLink href="/user" className="mx-2">Users</NavLink>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
