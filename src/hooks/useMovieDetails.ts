import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface FetchDetailsResponse {
  genres: Genre[];
  overview: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  videos: {
    results: Trailer[];
  };
}

const useMovieDetails = (id: number) => {
    const [details, setDetails] = useState<FetchDetailsResponse>();
    const [error, setError] = useState("");
  
    useEffect(() => {
        const controller = new AbortController();
        

      apiClient
        .get<FetchDetailsResponse>(`/movie/${id}`, {
          params: { append_to_response: "credits,videos" },
          signal: controller.signal,
        })
        .then((res) => setDetails(res.data))
        .catch((err) => {
            if(err instanceof CanceledError) return;
            setError(err.message)});

        return () => controller.abort();
    }, []);

    return {details, error};
}

export default useMovieDetails;