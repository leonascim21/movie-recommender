import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import CriticBadge from "../components/CriticBadge";
import LikeButton from "../components/LikeButton";

const MoviePage = () => {
  const { movieId } = useParams();
  const { details, error } = useMovieDetails(parseInt(movieId as string));
  const [isSmallScreen] = useMediaQuery("(max-width: 820px)");

  if (details === undefined) {
    return (
      <>
        <Text>Movie Not Found</Text>
        <Text>{error}</Text>
      </>
    );
  }

  const trailer = details.videos.results.find(
    (video: any) => video.type === "Trailer"
  )?.key;

  return (
    <>
      <NavBar />
      <Flex justifyContent="center" pt="5">
        <HStack
          alignItems="start"
          spacing="5"
          wrap={{ base: "wrap", md: "nowrap" }}
        >
          {!isSmallScreen && (
            <Box>
              <Image
                height="600px"
                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                alt={`${details.title} Poster`}
              />
            </Box>
          )}
          <Box width={{ base: "100%", md: "480px" }}>
            <Heading>{details.title}</Heading>
            <Text py={5} maxW="480px">
              {details.overview}
            </Text>
            <AspectRatio width="100%" ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                allowFullScreen
              />
            </AspectRatio>
            <VStack alignItems="center" pt="5">
              <HStack
                wrap="wrap"
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {details.genres.map((genre) => (
                  <Button
                    key={genre.id}
                    _active="none"
                    _hover="none"
                    cursor="default"
                    mb={2}
                  >
                    {genre.name}
                  </Button>
                ))}
              </HStack>
              <HStack
                pt="5"
                fontWeight="bold"
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "center", md: "flex-start" }}
                w="100%"
                justifyContent="center"
              >
                <Box textAlign={{ base: "center", md: "left" }}>
                  <Text pb={5}>{`Release Date: ${details.release_date}`}</Text>
                  {details.runtime > 0 && (
                    <Text>{`Movie Duration: ${details.runtime} minutes`}</Text>
                  )}
                </Box>
                <VStack
                  alignItems={{ base: "center", md: "flex-start" }}
                  pl={{ md: 8 }}
                  pb={10}
                >
                  {details.vote_average > 0 && (
                    <CriticBadge
                      rating={(details.vote_average * 10).toFixed(0)}
                    />
                  )}
                  <LikeButton movieId={Number(movieId)} />
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </>
  );
};

export default MoviePage;
