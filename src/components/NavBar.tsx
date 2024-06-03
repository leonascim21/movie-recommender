import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <Box width="90%" padding="10px" boxShadow="sm">
      <HStack justifyContent="space-between" padding="10px">
        <Image
          cursor="pointer"
          onClick={handleClick}
          src={logo}
          boxSize="60px"
        />
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
