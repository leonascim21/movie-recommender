import {
  Button,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useMovieDetails from "../hooks/useMovieDetails";

interface LikeButtonProps {
  movieId: number;
}

const LikeButton = ({ movieId }: LikeButtonProps) => {
  const { currentUser, likedMovies } = useAuth();
  const { details } = useMovieDetails(movieId);
  const [isLiked, setIsLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!currentUser) return;
    setIsLiked(likedMovies.includes(movieId));
  }, [currentUser, likedMovies, movieId]);

  const handleClick = async () => {
    if (!currentUser) {
      onOpen();
      setTimeout(onClose, 2000);
      return;
    }

    setIsLiked(!isLiked);

    const userDocRef = doc(db, "users", currentUser.uid);

    if (!isLiked) {
      await updateDoc(userDocRef, {
        likedMovies: arrayUnion(movieId),
      });
      details?.genres.forEach((genre) => {
        updateDoc(userDocRef, {
          [`genreCount.${genre.id}`]: increment(1),
        });
      });
    } else {
      await updateDoc(userDocRef, {
        likedMovies: arrayRemove(movieId),
      });
      details?.genres.forEach((genre) => {
        updateDoc(userDocRef, {
          [`genreCount.${genre.id}`]: increment(-1),
        });
      });
    }
  };

  const bg = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.300", "gray.600");
  const iconColor = useColorModeValue("black", "white");

  return (
    <Tooltip
      borderRadius={10}
      label="Must be logged to like movies"
      fontSize="md"
      isOpen={!currentUser && isOpen}
    >
      <Button
        onClick={handleClick}
        bg={bg}
        _hover={{ bg: hoverBg }}
        colorScheme="gray"
        size="lg"
        pb={10}
        p={0}
        disabled={!currentUser}
      >
        {isLiked ? (
          <AiFillHeart color="red" size="24px" />
        ) : (
          <AiOutlineHeart color={iconColor} size="24px" />
        )}
      </Button>
    </Tooltip>
  );
};

export default LikeButton;
