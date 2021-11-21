import React from "react";
import Fuse from "fuse.js";
import { tSong } from "../entities/song";

export const useFindMatchesInString = (text: string, query: string) => {
  const [match, setMatch] = React.useState<ReadonlyArray<Fuse.FuseResultMatch>>(
    []
  );
  const fuzzyEngineRef = React.useRef<Fuse<string> | null>(null);

  React.useEffect(() => {
    setImmediate(() => {
      fuzzyEngineRef.current = new Fuse([text], {
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
        setMatch(matches.matches ?? []);
      }
    });
    return () => {
      fuzzyEngineRef.current?.remove(() => true);
      fuzzyEngineRef.current = null;
    };
  }, [query, text]);

  return match;
};
