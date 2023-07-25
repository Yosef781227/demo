import { Text, Heading, VStack, Box, Image, Center, Button } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/App";
import { useGoogleLogin } from "@react-oauth/google";

const ChakraNavLink = chakra(NavLink);
function LoginPage() {

  const [error, setError] = useState("");
  const User: any = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  type Instagram = {
    connected: boolean;
    id: string;
    username: string;
  };
  useEffect(() => {
    console.log("User", User);
    if (User && User.isAuth) {
      console.log("User is Authenticated");
      navigate("/");
    }
  }, []);
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      if (response && response.access_token) {
        setLoading(true);
        try {
          const body = {
            access_token: response.access_token,
          };
          const res: any = await axios.post(
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
            const me = res.data.data.signWithGoogle.me;
            console.log(me);
            if (me.has_instagram) {
              const connectedInstagrams = me.instagrams.filter(
                (instagram: Instagram) => instagram.connected
              );

              console.log(
                "Number of connected Instagram accounts:",
                connectedInstagrams.length
              );
              localStorage.setItem("selectedInstagramIndex", "0");
              localStorage.setItem("instagrams", JSON.stringify(me.instagrams));
              //navigate("/");
              navigate("/");
              window.location.reload();
            } else {
              console.log("User has no Instagram. Navigating to /nextpagesss");
              // /navigate("/nextpage");
              navigate("/");
              window.location.reload();
            }
          } else {
            console.log("Login with Google Failed");
            throw new Error("Login with Google Failed");
          }
        } catch (err: any) {
          console.error("Error:", err.message);
          setError(err.message);
        } finally {
          setLoading(false);

        }
      } else {
        console.error("Access token is undefined");
      }
    },
  })






  return (
    <AuthCont>
      <VStack >
        <Image src={logo} alt="skimsocial" pt={0} mt={0} />
        <VStack>
          <Heading lineHeight={1} fontSize={"3xl"} fontWeight={"extrabold"} mt={10}>
            Reset Password
          </Heading>
          <Box lineHeight={"1.5"} fontSize={"sm"} mt={2}>
            <Text color={"#525252"}> Your new password must be different to</Text>
            <Text color={"#525252"} align={"center"} mt={0} pt={0}>previously used passwords.</Text>
          </Box>
        </VStack>
        <VStack pt={"15px"} w={"440px"} alignItems={"start"}>
          <FormRow

            placeholder="**********"
            type="password"
            label="New Password"
          />
          <Text mt={0} pt={0} fontSize={"xs"} marginTop={1}>Must contain 8 characters</Text>
          <FormRow
            mt={2}
            placeholder="**********"
            type="password"
            label="Confirm Password "
          />
        </VStack>
        <VStack>
          <Button
            mt={6}
            colorScheme="primary"
            width={"440px"}
            h={"40px"}
            borderRadius={"9px"}
            fontWeight={"normal"}>
            Reset Password
          </Button>

          <Button
            leftIcon={<img alt="logo" src={google} />}
            width={"440px"}
            h={"40px"}
            variant={"outline"}
            textColor="#525252"
            mt={2}
            borderRadius={"9px"}
            isLoading={loading}
            fontWeight={"normal"}
            onClick={(e) => {
              login();
            }}
          >
            Sign In With Google
          </Button>
        </VStack>
        <Text
          fontSize={"sm"}
          align={"center"}
          fontWeight={"thin"}
          color="#525252"
          mt={2}
        >
          Back to {"  "}
          <ChakraNavLink
            color={"#7C3AED"}
            textDecoration={"underline"}
            to="/login"
          >
            Log In
          </ChakraNavLink>
        </Text>
      </VStack>
    </AuthCont>
  );
}


export default LoginPage;



function AuthCont({ children }: { children: React.ReactNode }) {
  return (
    <Center p={1} overflow={"hidden"} h="100vh" w="100vw">
      <Center
        width={"98%"}
        height={"96%"}
        rounded={"md"}
        pb={150}
        overflow={"auto"}
        bg="white"
      >
        <VStack width={"35%"} gap={1}>
          {children}
        </VStack>
      </Center>
    </Center>
  );
}
