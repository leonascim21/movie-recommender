import {
  Box,
  HStack,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../hooks/useAuth";

const NavBarBig = () => {
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

  const handleLikedMovies = () => {
    navigate(`/liked-movies`);
  };

  return (
    <Box width="90%" padding="10px">
      <HStack padding="10px">
        <Image
          cursor="pointer"
          onClick={handleClickHome}
          src={logo}
          boxSize="90px"
        />
        <SearchBar />
        {currentUser ? (
          <Menu>
            <MenuButton
              as={Button}
              background="transparent"
              _hover={{ background: "transparent" }}
              _active={{ background: "transparent" }}
            >
              <Avatar size="sm" name={currentUser.email || "User"} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLikedMovies}>Liked Movies</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
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

export default NavBarBig;
