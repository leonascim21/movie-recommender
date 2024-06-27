import {
  Box,
  HStack,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Avatar,
  useDisclosure,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  DrawerOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import GenreList from "./GenreList";
import { useEffect } from "react";

const NavBarSmall = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

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
    <Box width="100%" padding="10px">
      <HStack justifyContent="space-between" padding="10px">
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          onClick={onOpen}
          aria-label={""}
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Box pt={10}>
                <SearchBar />
              </Box>
              <Box pt={7} pl={2}>
                <ColorModeSwitch />
              </Box>
              <Box pt={7} pl={2}>
                <GenreList />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Image
          cursor="pointer"
          onClick={handleClickHome}
          src={logo}
          boxSize="90px"
        />
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
      </HStack>
    </Box>
  );
};

export default NavBarSmall;
