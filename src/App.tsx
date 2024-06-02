import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";

function App() {
  return (
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
        <MovieGrid endpoint="/trending/movie/day" />
      </GridItem>
    </Grid>
  );
}

export default App;
