import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useSearchModal } from "../hooks/useSearchModal";
import { SearchTextInput } from "./SearchTextInput";
import {
  SearchQueryContext,
  WithSearchQueryContext,
} from "../contexts/SearchQueryContext";
import { SongsPreviewList } from "./SongsPreviewList";

type SearchModalProps = {
  // pass
};

export const SearchModal: React.FC<SearchModalProps> = ({}) => {
  const { isOpen, close } = useSearchModal();

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <WithSearchQueryContext>
            <Box p={3}>
              <SearchTextInput size={"lg"} variant="" shadow={"none"} />
            </Box>
            <SearchQueryContext.Consumer>
              {({ isLoading }) =>
                !isLoading && (
                  <Box maxH="400" overflow="scroll">
                    <SongsPreviewList />
                  </Box>
                )
              }
            </SearchQueryContext.Consumer>
          </WithSearchQueryContext>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
