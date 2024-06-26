import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  endpoint: string;
  genre?: string;
  page: number;
}

const MovieGrid = ({ endpoint, page, genre }: Props) => {
  const { movies, error, isLoading } = useMovies(endpoint, page, genre);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 2, md: 4, xl: 5 }} padding="10" spacing={10}>
        {isLoading &&
          skeletons.map((skeleton) => <MovieCardSkeleton key={skeleton} />)}

        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
