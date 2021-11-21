import React from "react";

import { Box, Container } from "@chakra-ui/react";
import { Base } from "../components/Base";
import { SearchTextInput } from "../components/SearchTextInput";
import { WithSearchQueryContext } from "../contexts/SearchQueryContext";
import { SongsPreviewList } from "../components/SongsPreviewList";

type SearchPageProps = {};

export const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <Base>
      <Box h={"100%"}>
        <Container>
          <WithSearchQueryContext>
            <Box p={3}>
              <SearchTextInput />
            </Box>
            <SongsPreviewList />
          </WithSearchQueryContext>
        </Container>
      </Box>
    </Base>
  );
};
