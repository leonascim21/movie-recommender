import { SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface Props {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const SearchResultsGrid = ({ movies, isLoading, error }: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 2, md: 4, xl: 5 }} padding="10" spacing={10}>
        {isLoading &&
          skeletons.map((skeleton) => <MovieCardSkeleton key={skeleton} />)}

        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default SearchResultsGrid;
