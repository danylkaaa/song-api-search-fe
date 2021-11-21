import React from "react";
import { tSong } from "../entities/song";
import { Box, Link, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { SongLyricsPreview } from "./SongLyricsPreview";
import { useFindMatchesInSongFields } from "../hooks/useFindMatchesInSongFields";
import { SearchQueryContext } from "../contexts/SearchQueryContext";
import { HighlightSearchTerm } from "./HighlightSearchTerm";
import { SongAuthorPreview } from "./SongAuthorPreview";
import { useNavigate } from "react-router-dom";
import { SearchModalContext } from "../contexts/SearchModalContext";

type DocPreviewProps = {
  song: tSong;
} & React.ComponentProps<typeof Box>;

export const SongPreview: React.FC<DocPreviewProps> = ({ song, ...props }) => {
  const { debouncedQuery } = React.useContext(SearchQueryContext);
  const { close } = React.useContext(SearchModalContext);

  const navigate = useNavigate();
  const matches = useFindMatchesInSongFields(song, debouncedQuery);
  return (
    <Box
      _hover={{ bg: "gray.900", color: "gray.400" }}
      p="5"
      rounded="xl"
      bg="gray.200"
      shadow="s"
      width="100%"
      color={"gray.700"}
      onClick={() => {
        close();
        navigate(`/song/${song.id}`);
      }}
    >
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box display="flex" flex="1" marginRight="3" position="relative">
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src={song.header_image_thumbnail_url}
                alt="some good alt text"
                objectFit="contain"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transform="scale(1.0)"
              />
            </Link>
          </Box>

          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="4"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <SongAuthorPreview
            author={song.primary_artist}
            match={matches.matchedArtist}
          />
          <Text marginTop="1" fontSize="xl">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <HighlightSearchTerm
                text={song.title}
                matches={matches.matchedTitle}
              />
            </Link>
          </Text>
        </Box>
      </Box>
      <Text as="p" marginTop="2" fontSize="sm">
        <Box maxH={200} overflow={"scroll"}>
          <SongLyricsPreview song={song} query={debouncedQuery} />
        </Box>
      </Text>
    </Box>
  );
};
