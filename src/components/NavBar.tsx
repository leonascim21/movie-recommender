import { useMediaQuery } from "@chakra-ui/react";
import NavBarBig from "./NavBarBig";
import NavBarSmall from "./NavBarSmall";

const NavBar = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 991px)");

  return isLargeScreen ? <NavBarBig /> : <NavBarSmall />;
};

export default NavBar;
