import React from "react";
import { useDisclosure } from "@chakra-ui/react";

export type tSearchModalContext = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

export const SearchModalContext = React.createContext<tSearchModalContext>(
  null as unknown as tSearchModalContext
);

export const WithSearchContext: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const context = React.useMemo(
    (): tSearchModalContext => ({
      isOpen,
      open: onOpen,
      close: onClose,
    }),
    [isOpen]
  );

  return (
    <SearchModalContext.Provider value={context}>
      {children}
    </SearchModalContext.Provider>
  );
};
