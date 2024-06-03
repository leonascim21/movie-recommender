import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <Box width="90%" padding="10px" boxShadow="sm">
      <HStack justifyContent="space-between" padding="10px">
        <Image src={logo} boxSize="60px" />
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
