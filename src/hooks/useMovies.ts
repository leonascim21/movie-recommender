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

const useMovies = (endpoint: string, genre?: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const controller = new AbortController();

      console.log(genre)
      
      const params = genre ? {
        include_adult : 'false',
        include_video : 'false',
        language: 'en-us',
        page: '1',
        sort_by: 'popular.desc',
        with_genres: genre,
      } : {};
      
      apiClient
        .get<FetchMoviesResponse>(endpoint, {params, signal: controller.signal})
        .then((res) => setMovies(res.data.results))
        .catch((err) => {
            if(err instanceof CanceledError) return;
            setError(err.message)});

        return () => controller.abort();
    }, []);

    return {movies, error};
}

export default useMovies;