import React from "react";
import { Navbar } from "./Navbar";
import { Box } from "@chakra-ui/react";
import { SearchModal } from "./SearchModal";
type BaseProps = {
  // pass
};

export const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
      <SearchModal />
    </Box>
  );
};
