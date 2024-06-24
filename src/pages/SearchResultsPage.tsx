import { Box, Heading, Grid, GridItem, Show } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import GenreList from "../components/GenreList";
import SearchResultsGrid from "../components/SearchResultsGrid";
import useSearch from "../hooks/useSearch";
import GenreListModal from "../components/GenreListModal";

const SearchResultsPage = () => {
  const { query } = useParams<{ query: string }>();
  const { movies, isLoading, error } = useSearch(query || "");

  return (
    <Grid
      templateAreas={{
        base: `"nav" 
              "main"`,
        lg: `"nav nav"
            "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} paddingTop={9}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box padding="10px">
          <Heading ml={10}>Results for: {query}</Heading>
          <SearchResultsGrid
            movies={movies}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </GridItem>
      <GenreListModal />
    </Grid>
  );
};

export default SearchResultsPage;
