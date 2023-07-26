import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, useToast } from "@chakra-ui/react";
import { BASE_URL } from "@/constants";


const GoogleOAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      if (response && response.access_token) {
        setLoading(true);
        try {
          const body = {
            access_token: response.access_token,
          };
          const res = await axios.post(
            BASE_URL,
            {
              query: `
              mutation Mutation($jsonInput: String!) {
                signWithGoogle(json_input: $jsonInput) {
                  me {
                    email
                    has_instagram
                    has_tiktok
                    id
                    instagrams {
                      connected
                      id
                      username
                    }
                    is_varified
                    name
                    permissions
                    picture
                    pricing_id
                    pricing_plan
                  }
                  message
                  success
                }
              }
              `,
              variables: {
                jsonInput: JSON.stringify(body),
              },
            },
            {
              withCredentials: true,
            }
          );

          if (res.data.data.signWithGoogle.success) {
            if (res.data.data.signWithGoogle.me.is_insta_connected) {
              navigate("/home");
            } else {
              navigate("/nextpage", {
                state: { accessToken: response.access_token },
              });
            }
          } else {
            throw new Error("Login with Google Failed");
          }
        } catch (err: any) {
          setError(err.message);
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Access token is undefined");
      }
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {/* <Buttons
      // leftIcon={<FaGoogle />}
      // colorScheme="red"
      variant="outline"
      // isLoading={loading}
      // loadingText="Signing in"
      onClick={login}
      /> */}


    </Box>
  );
};

export default GoogleOAuth;
