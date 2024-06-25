import {
  Box,
  Grid,
  GridItem,
  Show,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import useLikedMovies from "../hooks/useLikedMovies";

const LikedMoviesPage = () => {
  const { likedMovies, loading } = useLikedMovies();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} paddingTop={9}></GridItem>
      </Show>
      <GridItem area="main">
        <Box padding="10px">
          <Heading mb={5}>Liked Movies</Heading>
          {loading ? (
            <SimpleGrid columns={{ sm: 2, md: 4, xl: 5 }} spacing={10}>
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
            </SimpleGrid>
          ) : likedMovies.length > 0 ? (
            <SimpleGrid columns={{ sm: 2, md: 4, xl: 5 }} spacing={10}>
              {likedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </SimpleGrid>
          ) : (
            <Text>You have not liked any movies yet.</Text>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default LikedMoviesPage;
