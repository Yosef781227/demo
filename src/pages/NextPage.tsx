import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { Box, Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

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

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        width="300px"
        padding="4"
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="2xl" textAlign="center" marginBottom="4">
          Connect using your Instagram credentials
        </Text>
        <form onSubmit={submit}>
          <VStack spacing="4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isRequired
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={loading}
            >
              Connect
            </Button>
            {error && <Text color="red.500">{error}</Text>}
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default NextPage;
