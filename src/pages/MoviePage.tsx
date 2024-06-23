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
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import CriticBadge from "../components/CriticBadge";
import LikeButton from "../components/LikeButton";

const MoviePage = () => {
  const { movieId } = useParams();
  const { details, error } = useMovieDetails(parseInt(movieId as string));

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
        <HStack alignItems="start" spacing="5">
          <Box>
            <Image
              height="600px"
              src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
            />
          </Box>
          <Box width="480px">
            <Heading>{details.title}</Heading>
            <Text py={5} maxW="480px">
              {details.overview}
            </Text>
            <AspectRatio width="480px" ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                allowFullScreen
              />
            </AspectRatio>
            <VStack alignItems="center" pt="5">
              <HStack>
                {details.genres.map((genre) => (
                  <Button
                    _active="none"
                    _hover="none"
                    cursor="default"
                    key={genre.id}
                  >
                    {genre.name}
                  </Button>
                ))}
              </HStack>
              <HStack pt="5" fontWeight="bold">
                <Box pl="2px" pt="5px">
                  <Text pb={5}>{`Release Date: ${details.release_date}`}</Text>
                  <Text>{`Movie Duration: ${details.runtime} minutes`}</Text>
                </Box>
                <VStack alignItems="flex-start" pl="8">
                  <CriticBadge
                    rating={(details.vote_average * 10).toFixed(0)}
                  />
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
