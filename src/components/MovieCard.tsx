import { Movie } from "../hooks/useMovies";
import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Box _hover={{ textDecoration: "underline" }}>
        <Image src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
      </Box>
    </Card>
  );
};

export default MovieCard;

//SE EU QUISER COLOCAR O TITULO DVOLTA E SO BOTAR ISSO NA BOX
/* <CardBody>
<Heading fontSize="2xl">{movie.title}</Heading>
</CardBody> */
