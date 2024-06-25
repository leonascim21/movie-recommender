import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  endpoint: string;
  title: string;
  genre?: string;
}

const MovieSlider = ({ endpoint, title, genre }: Props) => {
  const page = 1;
  const { movies, error, isLoading } = useMovies(endpoint, page, genre);
  const skeletons = [1, 2, 3, 4, 5, 6];
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <Heading mb="4">{title}</Heading>
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
          {error && <Text>{error}</Text>}

          {isLoading &&
            skeletons.map((skeleton) => <MovieCardSkeleton key={skeleton} />)}

          {movies.map((movie) => (
            <Box
              key={movie.id}
              minWidth="200px"
              maxWidth="200px"
              borderRadius="10px"
              overflow="hidden"
              textAlign="center"
            >
              <MovieCard movie={movie}></MovieCard>
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

export default MovieSlider;
