import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import GenreList from "../components/GenreList";
import MovieGrid from "../components/MovieGrid";
import GenreListModal from "../components/GenreListModal";
import { Button, Flex, Grid, GridItem, Heading, Show } from "@chakra-ui/react";

const genres = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "99": "Documentary",
  "18": "Drama",
  "10751": "Family",
  "14": "Fantasy",
  "36": "History",
  "27": "Horror",
  "10402": "Music",
  "9648": "Mystery",
  "10749": "Romance",
  "878": "Science Fiction",
  "10770": "TV Movie",
  "53": "Thriller",
  "10752": "War",
  "37": "Western",
};

const GenrePage = () => {
  const { genreId } = useParams();
  const [page, setPage] = useState(1);
  const genreName = genres[genreId as keyof typeof genres] || "Genre Not Found";

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [genreId]);

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" 
                "main"`,
          lg: `"nav nav"
              "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5} paddingTop={9}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Heading pl={10}>{genreName}</Heading>
          <MovieGrid endpoint="/discover/movie" genre={genreId} page={page} />
        </GridItem>
      </Grid>
      <Flex paddingBottom="20px" justifyContent="center">
        <Button onClick={loadMoreMovies}>Show More</Button>
      </Flex>
      <GenreListModal />
    </>
  );
};

export default GenrePage;
