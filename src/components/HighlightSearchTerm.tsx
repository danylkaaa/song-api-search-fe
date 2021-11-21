import React from "react";
import Fuse from "fuse.js";
import { Box } from "@chakra-ui/react";

type HighlightSearchTermProps = {
  text: string;
  matches: ReadonlyArray<Fuse.FuseResultMatch>;
};

const Term: React.FC<{ highlight?: boolean; children: string }> = ({
  children,
  highlight,
}) => (
  <Box as={"span"} bg={highlight ? "yellow.200" : "none"}>
    {children.indexOf("\n") >= 0 ? (
      <span
        dangerouslySetInnerHTML={{
          __html: children.replaceAll(/\n+/g, "<br/>"),
        }}
      />
    ) : (
      children
    )}
  </Box>
);
export type tSuggestionOptionMatch = {
  item: string;
  matches?: ReadonlyArray<{ indices: ReadonlyArray<[number, number]> }>;
};

const processMatches = (
  text: string,
  matches: ReadonlyArray<Fuse.FuseResultMatch>
) => {
  let term = "";
  const highlightedTerms = matches.reduce((acc, matchItem) => {
    const result = [];
    const normalizedMatches = [...matchItem.indices];
    let pair = normalizedMatches.shift();

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);

      if (pair && i === pair[0]) {
        result.push(<Term key={i + term}>{term}</Term>);
        term = "";
      }

      term += char;

      if (pair && i === pair[1]) {
        result.push(
          <Term highlight key={i + term}>
            {term}
          </Term>
        );
        term = "";
        pair = normalizedMatches.shift();
      }
    }

    return [...acc, result];
  }, [] as React.ReactNode[]);

  if (term) {
    highlightedTerms.push(<Term key={"last-term"}>{term}</Term>);
  }
  if (!highlightedTerms.length) {
    highlightedTerms.push(<Term key={text}>{text}</Term>);
  }

  return highlightedTerms;
};

export const HighlightSearchTerm: React.FC<HighlightSearchTermProps> =
  React.memo(({ text, matches }) => {
    return <>{processMatches(text, matches)}</>;
  });
