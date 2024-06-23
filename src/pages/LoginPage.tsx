import React, { useState, ChangeEvent } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Divider,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.webp";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleClickSignUp = () => {
    navigate("/signup");
  };

  const handleClickHome = () => {
    navigate(`/`);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const handleGoogleLogin = async () => {
    // TODO: ADD GOOGLE LOGIN LOGIC
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
            <Heading color={textColor}>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <FormControl isRequired>
              <FormLabel color={textColor}>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                bg={bgColor}
                color={textColor}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel color={textColor}>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                bg={bgColor}
                color={textColor}
              />
            </FormControl>
            <Button
              width="full"
              mt={4}
              onClick={handleLogin}
              bg={hoverColor}
              color={textColor}
            >
              Login
            </Button>
          </Box>
          <Divider my={4} borderColor={textColor} />
          <Button
            width="full"
            variant="outline"
            leftIcon={<FaGoogle />}
            onClick={handleGoogleLogin}
            color={textColor}
            borderColor={textColor}
            _hover={{ bg: hoverColor }}
          >
            Login with Google
          </Button>
          <Text mt={4} textAlign="center" color={textColor}>
            Don't have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={handleClickSignUp}
            >
              Sign Up
            </Text>
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default LoginPage;
