import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface ProviderData {
  link: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

const useProviders = (movieId: number) => {
  const [providers, setProviders] = useState<ProviderData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await apiClient.get<{
          results: { [key: string]: ProviderData };
        }>(`/movie/${movieId}/watch/providers`);
        setProviders(response.data.results.US);
      } catch (err) {
        setError("Failed to fetch watch providers");
      }
    };

    fetchProviders();
  }, [movieId]);

  return { providers, error };
};

export default useProviders;