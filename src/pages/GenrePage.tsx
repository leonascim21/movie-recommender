import NavBar from "../components/NavBar";
import GenreList from "../components/GenreList";
import MovieGrid from "../components/MovieGrid";
import { Button, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GenrePage = () => {
  const { genreId } = useParams();

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
          <NavBar></NavBar>
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5} paddingTop={9}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <MovieGrid endpoint="/discover/movie" genre={genreId}></MovieGrid>
        </GridItem>
      </Grid>

      <Flex paddingBottom="20px" justifyContent="center">
        <Button>Show More</Button>
      </Flex>
    </>
  );
};

export default GenrePage;
