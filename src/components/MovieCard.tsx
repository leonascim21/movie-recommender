import { useNavigate } from "react-router-dom";
import { Movie } from "../hooks/useMovies";
import { Box, Card, Heading, Image } from "@chakra-ui/react";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card
      cursor="pointer"
      onClick={() => handleClick(movie.id)}
      borderRadius={10}
      overflow="hidden"
    >
      <Box position="relative" _hover={{ "& > div": { opacity: 1 } }}>
        <Image src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
        <Box
          position="absolute"
          bottom="0"
          width="100%"
          opacity="0"
          bg="rgba(0, 0, 0, 0.6)"
          transition="0.3s"
          textAlign="center"
          p="4"
        >
          <Heading color="white" size="md">
            {movie.title}
          </Heading>
        </Box>
      </Box>
    </Card>
  );
};

export default MovieCard;
