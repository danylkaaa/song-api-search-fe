import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { SearchTextInput } from "./SearchTextInput";
import { useSearchModal } from "../hooks/useSearchModal";
import React, { MouseEvent } from "react";

export const Navbar = () => {
  const { open: openSearchModal } = useSearchModal();

  const openSearchModalHandler = React.useCallback((e: MouseEvent) => {
    e.preventDefault();
    openSearchModal();
  }, []);

  return (
    <Box position="sticky" top={0} zIndex={99}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Box w={"33%"} />
        <Box onClick={openSearchModalHandler} w="100%">
          <SearchTextInput isReadOnly />
        </Box>
        <Box w={"33%"} />
      </Flex>
    </Box>
  );
};
