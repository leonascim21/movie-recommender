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
      <Flex justifyContent="center">
        <HStack>
          <Box width="50%" pl="5" pt="5">
            <Image
              height="600px"
              src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
            />
            <HStack pt="5">
              {details.genres.map((genre) => (
                <Button _active="none" _hover="none" cursor="default">
                  {genre.name}
                </Button>
              ))}
            </HStack>
            <HStack pt="5" fontWeight="bold">
              <Box pl="2px" pt="5px">
                <Text>{`Release Date: ${details.release_date}`}</Text>
                <Text>{`Movie Duration: ${details.runtime} minutes`}</Text>
              </Box>
              <VStack alignItems="flex-start" pl="8">
                <CriticBadge rating={(details.vote_average * 10).toFixed(0)} />
                <Text>PLACEHOLDER</Text>
              </VStack>
            </HStack>
          </Box>
          <Box width="50%">
            <Heading>{details.title}</Heading>
            <Text maxW="480px">{details.overview}</Text>
            <AspectRatio width="480px" height="270px" ratio={1}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </HStack>
      </Flex>
    </>
  );
};

export default MoviePage;
