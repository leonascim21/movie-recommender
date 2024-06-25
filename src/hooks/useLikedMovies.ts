import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./useAuth";
import apiClient from "../services/api-client";
import { Movie } from "../hooks/useMovies";

const useLikedMovies = () => {
  const { currentUser } = useAuth();
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const likedMovieIds = userDoc.data().likedMovies || [];
          const moviePromises = likedMovieIds.map((id: number) =>
            apiClient.get(`/movie/${id}`)
          );
          const movieResponses = await Promise.all(moviePromises);
          setLikedMovies(movieResponses.map((response) => response.data as Movie));
        }
      }
      setLoading(false);
    };
    fetchLikedMovies();
  }, [currentUser]);

  return { likedMovies, loading };
};

export default useLikedMovies;