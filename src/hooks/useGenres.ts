import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
    id: number;
    name: string;
  }
  
  interface FetchGenreResponse {
    genres: Genre[];
  }

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const controller = new AbortController();


      apiClient
        .get<FetchGenreResponse>("/genre/movie/list", {signal: controller.signal})
        .then((res) => setGenres(res.data.genres))
        .catch((err) => {
            if(err instanceof CanceledError) return;
            setError(err.message)});

        return () => controller.abort();
    }, []);

    return {genres, error};
}

export default useGenres;