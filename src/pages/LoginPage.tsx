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
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const navigate = useNavigate();
  const handleClickSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    //TODO: ADD LOGIN LOGIC
  };

  const handleGoogleLogin = async () => {
    //TODO: ADD GOOGLE LOGIN LOGIC
  };

  const bgColor = useColorModeValue("white", "#1A202C");
  const boxBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const hoverColor = useColorModeValue("#1E90FF", "#90CDF4");

  return (
    <>
      <NavBar />
      <Flex align="center" justify="center" height="70vh" bg={bgColor}>
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg={boxBgColor}
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
