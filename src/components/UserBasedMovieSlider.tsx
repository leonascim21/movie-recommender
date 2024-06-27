import {
  Box,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import useRecommendedMovies, { Movie } from "../hooks/useRecommendedMovies";

const UserBasedMovieSlider = () => {
  const { currentUser, likedMovies, genreCount } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (currentUser && likedMovies.length > 2) {
        const userMovies = await useRecommendedMovies(
          genreCount,
          likedMovies,
          20
        );
        setMovies(userMovies);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentUser, likedMovies, genreCount]);

  if (!currentUser || likedMovies.length < 3) {
    return null;
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const arrowBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(0, 0, 0, 0.8)"
  );
  const arrowHoverBg = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(0, 0, 0, 0.9)"
  );

  return (
    <Box padding="20px" position="relative" maxWidth="90%">
      <Heading mb="4">Recommended for You</Heading>
      <Box
        position="relative"
        width="100%"
        overflow="hidden"
        maxWidth="calc(100vw - 80px)"
      >
        <IconButton
          aria-label="Scroll left"
          icon={<ArrowBackIcon />}
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={scrollLeft}
          bg={arrowBg}
          _hover={{ bg: arrowHoverBg }}
          size="lg"
        />
        <HStack
          ref={scrollRef}
          spacing="10px"
          padding="10px"
          whiteSpace="nowrap"
          scrollBehavior="smooth"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          overflowX="auto"
        >
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((skeleton) => (
                <Box key={skeleton}>
                  <MovieCardSkeleton />
                </Box>
              ))
            : movies.map((movie) => (
                <Box
                  key={movie.id}
                  minWidth="200px"
                  maxWidth="200px"
                  borderRadius="10px"
                  overflow="hidden"
                  textAlign="center"
                >
                  <MovieCard movie={movie} />
                </Box>
              ))}
        </HStack>
        <IconButton
          aria-label="Scroll right"
          icon={<ArrowForwardIcon />}
          position="absolute"
          right="10px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={scrollRight}
          bg={arrowBg}
          _hover={{ bg: arrowHoverBg }}
          size="lg"
        />
      </Box>
    </Box>
  );
};

export default UserBasedMovieSlider;
