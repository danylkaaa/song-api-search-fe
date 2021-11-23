import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Base } from "../components/Base";
import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Link,
  Center,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { SongLyricsPreview } from "../components/SongLyricsPreview";
import { tSong } from "../entities/song";

type SongPageProps = {
  // pass
};

type tSongFull = {
  title_with_featured: string;
  description_preview: string;
  recording_location: string;
  header_image_url: string;
} & tSong;

const fetchSongInfo = async (id?: string): Promise<tSongFull> => {
  const res = await fetch(
    `https://lyrics-song-api.herokuapp.com/song?id=${id}`
  );

  return await res.json();
};

interface IBlogTags {
  tags: Array<string>;
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const SongPage: React.FC<SongPageProps> = () => {
  const { id } = useParams<"id">();

  const { data: song, isLoading } = useQuery(["song", id], () =>
    fetchSongInfo(id)
  );

  if (isLoading || !song) {
    return <Base>Wait</Base>;
  }

  return (
    <Base>
      <Container maxW={"7xl"} p="12">
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Image
                borderRadius="lg"
                src={song.header_image_url}
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={"radial(orange.600 1px, transparent 1px)"}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            {!!song.recording_location && (
              <BlogTags tags={[song.recording_location]} />
            )}
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {song.full_title}
              </Link>
            </Heading>
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
              <Image
                borderRadius="full"
                boxSize="40px"
                src={song.primary_artist.image_url}
              />
              <Text fontWeight="medium">{song.primary_artist.name}</Text>
            </HStack>
            <Text as="p" marginTop="2" fontSize="lg">
              {song.description_preview}
            </Text>
          </Box>
        </Box>
        <Box>
          <Center>
            <SongLyricsPreview song={song} query={""} />
          </Center>
        </Box>
      </Container>
    </Base>
  );
};
