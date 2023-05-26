import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import app_store from "../assets/images/app_store.png";
import play_store from "../assets/images/play_store.png";
import Insta from "../assets/images/Insta.png";
// import fb_logo from "../assets/images/fb_logo.png";

const NextPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const accessToken = location.state?.accessToken;

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log("Trying to sumbit Form...");

      const body = {
        username,
        password,
      };

      console.log("Checking if already connected...");
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            query Query {
              me {
                id
                email
                instagram {
                  following
                  followers
                  posts_count
                  reels_count
                  stories_count
                  connected
                  username
                }
                is_insta_connected
                name
                pricing_id
                pricing_plan
              }
            }
          `,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Connection check response:", response.data);

      const isConnected = response.data?.data?.me?.instagram?.connected;
      if (isConnected) {
        console.log("Already connected. Redirecting to Insta...");
        navigate("/home");
      } else {
        console.log(" Is_Connected is False try Form submission...");
        const connectionResponse = await axios.post(
          BASE_URL,
          {
            query: `
              mutation Mutation($jsonInput: String!) {
                connectToInstagram(json_input: $jsonInput) {
                  success
                  message
                }
              }
            `,
            variables: {
              jsonInput: JSON.stringify(body),
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        console.log("Form submission response:", connectionResponse.data);

        if (connectionResponse.data?.errors?.length) {
          const serverError = connectionResponse.data.errors[0];
          throw new Error(serverError.message);
        }

        const { success, message } =
          connectionResponse.data?.data?.connectToInstagram;

        if (success) {
          console.log("Form submission successful. Redirecting to Insta...");
          navigate("/page");
        } else {
          console.log("Form submission failed. Error:", message);
          setError(message);
        }
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <Box bg="gray.50" minH="100vh" py={12} px={{ base: 4, lg: 8 }}>
  //     <Box maxW="md" mx="auto">
  //       <Heading textAlign="center" size="xl" fontWeight="extrabold">
  //         Instagram
  //       </Heading>
  //       <Box mt={4} bg="white" py={8} px={4} shadow="base" rounded="lg">
  //         <form onSubmit={submit}>
  //           <VStack spacing={4}>
  //             <Input
  //               placeholder="Phone number, username, or email"
  //               _placeholder={{ color: "gray.500" }}
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               isRequired
  //             />
  //             <Input
  //               placeholder="Password"
  //               _placeholder={{ color: "gray.500" }}
  //               type="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               isRequired
  //             />
  //             <Button
  //               colorScheme="teal"
  //               type="submit"
  //               isLoading={loading}
  //             >
  //               Connect
  //             </Button>
  //             {error && <Text color="red.500">{error}</Text>}
  //           </VStack>
  //         </form>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minHeight="100vh"
      bg="gray.100"
    >
      <Flex direction="row" maxW="800px" w="100%" my={10}>
        <Box w="55%">
          <Image src={Insta} alt="Instagram" maxW="100%" />
        </Box>
        <Box w="45%" pl={10}>
          <Box bg="white" p={10} borderRadius="md" boxShadow="sm">
            <Heading as="h1" size="lg" mb={5}>
              Instagram
            </Heading>
            <form onSubmit={submit}>
              <FormControl id="email" mb={4}>
                <FormLabel>Phone number, username, or email</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl id="password" mb={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired
                />
              </FormControl>
              <Button
                colorScheme="blue"
                variant="solid"
                type="submit"
                w="100%"
                mb={4}
                isLoading={loading}
              >
                Log in
              </Button>
              {error && <Text color="red.500">{error}</Text>}
              <Flex align="center" mb={6}>
                <Box borderBottom="1px solid" borderColor="gray.300" w="100%" />
                <Text px={2} color="gray.500">
                  or
                </Text>
                <Box borderBottom="1px solid" borderColor="gray.300" w="100%" />
              </Flex>
              <Link
                color="blue.500"
                fontWeight="bold"
                mb={6}
                display="flex"
                alignItems="center"
              >
                <FaFacebook size={20} />
                <Text ml={2}>Login with Facebook</Text>
              </Link>
              <Link color="blue.500">Forgot password</Link>
            </form>
          </Box>
          <Box
            bg="white"
            p={6}
            mt={4}
            borderRadius="md"
            boxShadow="sm"
            textAlign="center"
          >
            <Text>
              Don't have an account?{" "}
              <Link color="blue.500" fontWeight="bold">
                Sign up
              </Link>
            </Text>
          </Box>
          <Box mt={4} textAlign="center">
            <Text mb={4}>Get the app</Text>
            <Flex justify="center">
              <Image src={app_store} alt="App Store" w="130px" mr={2} />
              <Image src={play_store} alt="Play Store" w="130px" ml={2} />
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box textAlign="center" mb={10}></Box>
      <Box
        bg="black"
        color="white"
        py={5}
        w="100%"
        textAlign="center"
        position="fixed"
        bottom={0}
      ></Box>
    </Flex>
  );
};

export default NextPage;
