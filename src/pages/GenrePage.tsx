import NavBar from "../components/NavBar";
import GenreList from "../components/GenreList";
import MovieGrid from "../components/MovieGrid";
import { Grid, GridItem, Show } from "@chakra-ui/react";

const GenrePage = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar></NavBar>
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5} paddingTop={9}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <MovieGrid endpoint="/discover/movie" genre="99"></MovieGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default GenrePage;
