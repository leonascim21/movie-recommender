import { Button, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const bg = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.300", "gray.600");
  const iconColor = useColorModeValue("black", "white");

  return (
    <Button
      onClick={handleClick}
      bg={bg}
      _hover={{ bg: hoverBg }}
      colorScheme="gray"
      size="lg"
      p={0}
    >
      {isLiked ? (
        <AiFillHeart color="red" size="24px" />
      ) : (
        <AiOutlineHeart color={iconColor} size="24px" />
      )}
    </Button>
  );
};

export default LikeButton;
