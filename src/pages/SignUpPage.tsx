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
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.webp";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickHome = () => {
    navigate(`/`);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Sign up failed.",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await signup(email, password);
      navigate("/home");
    } catch (error) {
      toast({
        title: "Sign up failed.",
        description: "Invalid email or password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signupWithGoogle();
      navigate("/home");
    } catch (error) {
      toast({
        title: "Google sign up failed.",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
            <Heading color={textColor}>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <FormControl isRequired>
              <FormLabel color={textColor}>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                bg={bgColor}
                color={textColor}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
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
              <Tooltip
                label="Password must be at least 6 characters"
                fontSize="md"
              >
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  bg={bgColor}
                  color={textColor}
                />
              </Tooltip>
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel color={textColor}>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                bg={bgColor}
                color={textColor}
              />
            </FormControl>
            <Button
              width="full"
              mt={4}
              onClick={handleSignUp}
              bg={hoverColor}
              color={textColor}
            >
              Sign Up
            </Button>
          </Box>
          <Divider my={4} borderColor={textColor} />
          <Button
            width="full"
            variant="outline"
            leftIcon={<FaGoogle />}
            onClick={handleGoogleSignUp}
            color={textColor}
            borderColor={textColor}
            _hover={{ bg: hoverColor }}
          >
            Sign Up with Google
          </Button>
          <Text mt={4} textAlign="center" color={textColor}>
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={handleClickLogin}
            >
              Login
            </Text>
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default SignUpPage;
