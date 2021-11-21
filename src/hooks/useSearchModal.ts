import React from "react";
import { SearchModalContext } from "../contexts/SearchModalContext";

export const useSearchModal = () => {
  return React.useContext(SearchModalContext);
};
