import React from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";
import { tSong } from "../entities/song";

type tSearchQueryContext = {
  query: string;
  debouncedQuery: string;
  isLoading: boolean;
  setQuery: (v: string) => void;
  songs: tSong[];
};
export const SearchQueryContext = React.createContext<tSearchQueryContext>(
  {} as unknown as tSearchQueryContext
);

type tDocWrapped = {
  result: tSong;
};
export type tDocResponse = tDocWrapped[] | { message: string };

const fetchSongs = async (
  query: string,
  signal?: AbortSignal
): Promise<tDocResponse> => {
  const res = await fetch(
    `https://lyrics-song-api.herokuapp.com/search?q=${query}`,
    { signal }
  );

  if (!res.ok) {
    return { message: "Нет результатов" };
  }

  return res.json();
};

export const WithSearchQueryContext: React.FC = ({ children }) => {
  const [query, setQuery] = React.useState("");
  const [debouncedQuery] = useDebounce(query, 100);
  const { data, isLoading } = useQuery(
    ["songs", debouncedQuery],
    ({ signal }) => fetchSongs(debouncedQuery, signal)
  );

  const songs = React.useMemo(() => {
    if (!data) return [];
    if ("message" in data) {
      return [];
    }
    return data.map((d) => d.result);
  }, [data]);

  return (
    <SearchQueryContext.Provider
      value={{ query, debouncedQuery, setQuery, isLoading, songs }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};
