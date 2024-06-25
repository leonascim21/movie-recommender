import { Button, Heading, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={10}>
        <Heading>Page Not Found</Heading>
        <Button onClick={handleClick} colorScheme="green">
          Go To Home Page
        </Button>
      </VStack>
    </Flex>
  );
};

export default NoPage;
