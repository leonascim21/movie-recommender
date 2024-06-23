import { Box, HStack, Image, Button } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`/`);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logout();
    navigate(`/`);
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
        {currentUser ? (
          <Button onClick={handleLogout} colorScheme="red" m={7}>
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogin} colorScheme="green" m={7}>
            Login
          </Button>
        )}
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
