import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { SongPreview } from "./SongPreview";
import { SearchQueryContext } from "../contexts/SearchQueryContext";

type DocsPreviewListProps = {};

export const SongsPreviewList: React.FC<DocsPreviewListProps> = ({}) => {
  const { isLoading, songs } = React.useContext(SearchQueryContext);

  if (isLoading || !songs.length) {
    return null;
  }
  return (
    <Box>
      <VStack spacing="10px">
        {songs.map((s) => (
          <Box key={s.id} p={"xl"} width="100%">
            <SongPreview song={s} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
