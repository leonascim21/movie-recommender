import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <Box width="90%" padding="10px" boxShadow="sm">
      <HStack padding="10px">
        <Image
          cursor="pointer"
          onClick={handleClick}
          src={logo}
          boxSize="90px"
        />
        <SearchBar />
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
