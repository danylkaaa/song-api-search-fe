import React, { ChangeEvent } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchQueryContext } from "../contexts/SearchQueryContext";

type SearchTextInputProps = {
  // pass
} & React.ComponentProps<typeof Input>;

export const SearchTextInput: React.FC<SearchTextInputProps> = ({
  size,
  variant,
  ...props
}) => {
  const { setQuery, query } = React.useContext(SearchQueryContext);

  const handleInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setQuery(e.target.value);
    },
    [setQuery]
  );

  return (
    <InputGroup size={size} variant={variant}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="blue.300" />}
      />
      <Input
        placeholder="Начать поиск..."
        shadow="sm"
        {...props}
        value={query}
        onChange={handleInput}
      />
    </InputGroup>
  );
};
