import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

interface Props {
  endpoint: string;
  genre?: string;
}

const MovieGrid = ({ endpoint, genre }: Props) => {
  const { movies, error } = useMovies(endpoint, genre);

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 5 }} padding="10" spacing={10}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
