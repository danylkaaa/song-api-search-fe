import React from "react";
import { SearchQueryContext } from "../contexts/SearchQueryContext";
import { HStack, Image, Text } from "@chakra-ui/react";
import { HighlightSearchTerm } from "./HighlightSearchTerm";
import { tArtist } from "../entities/song";
import Fuse from "fuse.js";

type SongAuthorPreviewProps = {
  author: tArtist;
  match: Fuse.FuseResultMatch[];
};

export const SongAuthorPreview: React.FC<SongAuthorPreviewProps> = ({
  author,
  match,
}) => {
  const { setQuery } = React.useContext(SearchQueryContext);

  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      transition="0.3s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
      }}
      transform="scale(1.0)"
    >
      <Image borderRadius="full" boxSize="40px" src={author.image_url} />
      <Text fontWeight="medium" onClick={() => setQuery(author.name)}>
        <HighlightSearchTerm text={author.name} matches={match} />
      </Text>
    </HStack>
  );
};
