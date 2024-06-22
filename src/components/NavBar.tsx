import { Box, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`/`);
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <Box width="90%" padding="10px" boxShadow="sm">
      <HStack padding="10px">
        <Image
          cursor="pointer"
          onClick={handleClickHome}
          src={logo}
          boxSize="90px"
        />
        <SearchBar />
        <Text
          pl={10}
          pr={10}
          onClick={handleClickLogin}
          cursor="pointer"
          textDecoration="underline"
        >
          Login
        </Text>
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
