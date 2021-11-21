import React from "react";
import { ChakraProvider, StylesProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SearchPage } from "./pages/SearchPage";
import { WithSearchContext } from "./contexts/SearchModalContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { SongPage } from "./pages/SongPage";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <StylesProvider value={{}}>
        <WithSearchContext>
          <Router>
            <Routes>
              <Route element={<SongPage />} path="/song/:id" />
              <Route element={<SearchPage />} path="*" />
            </Routes>
          </Router>
        </WithSearchContext>
      </StylesProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
