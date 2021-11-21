import React from "react";
import Fuse from "fuse.js";
import { tSong } from "../entities/song";

const getMatchForKey = (
  matches: Fuse.FuseResult<tSong>,
  key: string
): Fuse.FuseResultMatch[] => {
  return matches.matches?.filter((m) => m.key === key) ?? [];
};

type tMatchedSongFields = {
  matchedTitle: Fuse.FuseResultMatch[];
  matchedArtist: Fuse.FuseResultMatch[];
};

export const useFindMatchesInSongFields = (song: tSong, query: string) => {
  const [match, setMatch] = React.useState<tMatchedSongFields>({
    matchedArtist: [],
    matchedTitle: [],
  });
  const fuzzyEngineRef = React.useRef<Fuse<tSong> | null>(null);

  React.useEffect(() => {
    setImmediate(() => {
      fuzzyEngineRef.current = new Fuse([song], {
        keys: ["full_title", "primary_artist.name"],
        shouldSort: true,
        includeMatches: true,
        minMatchCharLength: (query.length * 2) / 3,
        includeScore: true,
        ignoreLocation: true,
        threshold: 0.3,
        ignoreFieldNorm: true,
      });
      const [matches]: Fuse.FuseResult<tSong>[] =
        fuzzyEngineRef.current?.search(query) ?? [];
      if (matches) {
        const matchedTitle = getMatchForKey(matches, "full_title");
        const matchedArtist = getMatchForKey(matches, "primary_artist.name");

        setMatch({
          matchedTitle,
          matchedArtist,
        });
      }
    });
    return () => {
      fuzzyEngineRef.current?.remove(() => true);
      fuzzyEngineRef.current = null;
    };
  }, [query, song]);

  return match;
};
