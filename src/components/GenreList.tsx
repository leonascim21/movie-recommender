import { Box, HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import i12 from "../assets/categoryIcons/i12.png";
import i14 from "../assets/categoryIcons/i14.png";
import i16 from "../assets/categoryIcons/i16.png";
import i18 from "../assets/categoryIcons/i18.png";
import i27 from "../assets/categoryIcons/i27.png";
import i28 from "../assets/categoryIcons/i28.png";
import i35 from "../assets/categoryIcons/i35.png";
import i36 from "../assets/categoryIcons/i36.png";
import i37 from "../assets/categoryIcons/i37.png";
import i53 from "../assets/categoryIcons/i53.png";
import i80 from "../assets/categoryIcons/i80.png";
import i99 from "../assets/categoryIcons/i99.png";
import i878 from "../assets/categoryIcons/i878.png";
import i9648 from "../assets/categoryIcons/i9648.png";
import i10402 from "../assets/categoryIcons/i10402.png";
import i10749 from "../assets/categoryIcons/i10749.png";
import i10751 from "../assets/categoryIcons/i10751.png";
import i10752 from "../assets/categoryIcons/i10752.png";
import i10770 from "../assets/categoryIcons/i10770.png";

const genreIcons: { [key: number]: string } = {
  12: i12,
  14: i14,
  16: i16,
  18: i18,
  27: i27,
  28: i28,
  35: i35,
  36: i36,
  37: i37,
  53: i53,
  80: i80,
  99: i99,
  878: i878,
  9648: i9648,
  10402: i10402,
  10749: i10749,
  10751: i10751,
  10752: i10752,
  10770: i10770,
};

const GenreList = () => {
  const { genres } = useGenres();

  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="6px">
          <Box _hover={{ textDecoration: "underline" }}>
            <HStack>
              <Image
                src={genreIcons[genre.id]}
                boxSize="32px"
                borderRadius={8}
              />
              <Text fontSize="lg">{genre.name}</Text>
            </HStack>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
