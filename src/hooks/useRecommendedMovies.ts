import apiClient from "../services/api-client";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export const fetchRandomMoviesByGenre = async (
  genreId: number,
  count: number
): Promise<Movie[]> => {
  const page = Math.floor(Math.random() * 10) + 1;
  const response = await apiClient.get(`/discover/movie`, {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data.results.slice(0, count);
};

const useRecommendedMovies = async (
  genreCounts: { [key: number]: number },
  likedMovies: number[],
  numMovies: number
): Promise<Movie[]> => {
  const totalMovies = Object.values(genreCounts).reduce((a, b) => a + b, 0);
  const movies: Movie[] = [];

  while (movies.length < numMovies) {
    const randomNum = Math.floor(Math.random() * totalMovies);
    let sum = 0;
    for (const [genreId, count] of Object.entries(genreCounts)) {
      sum += count;
      if (randomNum < sum) {
        const genreMovies = await fetchRandomMoviesByGenre(
          parseInt(genreId),
          1
        );
        const movie = genreMovies[0];
        if (
          movie &&
          !likedMovies.includes(movie.id) &&
          !movies.some((m) => m.id === movie.id)
        ) {
          movies.push(movie);
        }
        break;
      }
    }
  }

  return movies;
};

export default useRecommendedMovies