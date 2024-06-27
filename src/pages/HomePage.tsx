import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import GenreList from "../components/GenreList";
import MovieSlider from "../components/MovieSlider";
import UserBasedMovieSlider from "../components/UserBasedMovieSlider";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      overflowX="hidden"
      overflowY="auto"
      gridTemplateColumns={{ lg: "160px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} paddingTop={9}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem
        paddingLeft={10}
        area="main"
        width={{ lg: "calc(100% - 80px)" }}
      >
        <Box>
          <MovieSlider title="Trending Today" endpoint="/trending/movie/day" />
          <UserBasedMovieSlider />
          <MovieSlider title="Top Rated" endpoint="/movie/top_rated" />
          <MovieSlider title="Popular" endpoint="/movie/popular" />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
