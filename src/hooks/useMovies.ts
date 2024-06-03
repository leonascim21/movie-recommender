import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }
  
  interface FetchMoviesResponse {
    page: number;
    results: Movie[];
  }

const useMovies = (endpoint: string, page:number, genre?: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();

      
      const params = genre ? {
        include_adult : 'false',
        include_video : 'false',
        language: 'en-us',
        page: page.toString(),
        sort_by: 'popular.desc',
        with_genres: genre,
      } : {
        page: page.toString()
      };
      
      setLoading(true);
      apiClient
        .get<FetchMoviesResponse>(endpoint, {params, signal: controller.signal})
        .then((res) => {
          if (page === 1) {
          setMovies(res.data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
        }
          setLoading(false);
        })
        .catch((err) => {
            if(err instanceof CanceledError) return;
            setError(err.message);
          setLoading(false);});

        return () => controller.abort();
    }, [endpoint, genre, page]);

    return {movies, error, isLoading};
}

export default useMovies;