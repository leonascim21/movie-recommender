import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import GenreList from "../components/GenreList";
import MovieSlider from "../components/MovieSlider";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      overflowX="hidden"
      overflowY="auto"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} paddingTop={9}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem paddingLeft={10} area="main">
        <Box>
          <MovieSlider title="Trending Today" endpoint="/trending/movie/day" />
          <MovieSlider title="Top Rated" endpoint="/movie/top_rated" />
          <MovieSlider title="Popular" endpoint="/movie/popular" />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
