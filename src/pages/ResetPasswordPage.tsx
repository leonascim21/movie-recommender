import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Image,
  Heading,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
      setError("");
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
      setMessage("");
    }
  };

  const handleClickHome = () => {
    navigate(`/`);
  };

  const bgColor = useColorModeValue("white", "#1A202C");
  const boxBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const hoverColor = useColorModeValue("#1E90FF", "#90CDF4");

  return (
    <>
      <Image
        cursor="pointer"
        onClick={handleClickHome}
        src={logo}
        boxSize="90px"
        mt={[4, 4, 8]}
        mx={[4, 4, 8]}
      />
      <Flex
        align="center"
        justify="center"
        height={["auto", "auto", "70vh"]}
        bg={bgColor}
        py={[8, 8, 0]}
        mt={[8, 8, 0]}
      >
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg={boxBgColor}
          mx={[4, 4, 0]}
        >
          <Box textAlign="center">
            <Heading color={textColor}>Reset Password</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color={textColor}>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg={bgColor}
                    color={textColor}
                  />
                </FormControl>
                <Button
                  type="submit"
                  width="full"
                  mt={4}
                  bg={hoverColor}
                  color={textColor}
                >
                  Send Reset Email
                </Button>
              </VStack>
            </form>
            {message && (
              <Text mt={4} color="green.500">
                {message}
              </Text>
            )}
            {error && (
              <Text mt={4} color="red.500">
                {error}
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ResetPasswordPage;
