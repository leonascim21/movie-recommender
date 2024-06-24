import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const useSearch = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/search/movie`, {
          params: { query },
        });
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  return { movies, isLoading, error };
};

export default useSearch;