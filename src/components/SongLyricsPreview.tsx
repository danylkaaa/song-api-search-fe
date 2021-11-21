import React from "react";
import { tSong } from "../entities/song";
import { useQuery } from "react-query";
import { SkeletonText } from "@chakra-ui/react";
import { useFindMatchesInString } from "../hooks/useFindMatchesInString";
import { HighlightSearchTerm } from "./HighlightSearchTerm";

type SongLyricsPreviewProps = {
  song: tSong;
  query: string;
};

const fetchLyrics = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(
    `https://lyrics-song-api.herokuapp.com/lyrics?url=${url}`
  );
  if (!res.ok) return "";

  return res.text();
};

export const SongLyricsPreview: React.FC<SongLyricsPreviewProps> = ({
  song,
  query,
}) => {
  const { data: text, isLoading } = useQuery(["song", song.url], ({ signal }) =>
    fetchLyrics(song.url, signal)
  );

  const parsedText = React.useMemo(() => {
    if (!text) return "";
    return text
      .substr(1, text.length - 2)
      .replace(/\\/g, "\\")
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/(\[[\w\s]+])/g, "");
  }, [text]);

  const lyricsMatches = useFindMatchesInString(parsedText, query);

  if (isLoading) {
    return <SkeletonText mt="3" noOfLines={4} spacing="4" />;
  }

  return <HighlightSearchTerm text={parsedText} matches={lyricsMatches} />;
};
