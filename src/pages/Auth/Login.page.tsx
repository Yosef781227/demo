import React, { useState, useEffect, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "@/constants";
import { Text, Heading, VStack, FormHelperText, Button } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import { NavLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";

//import { set } from "date-fns";
import { UserContext } from "@/App";
const ChakraNavLink = chakra(NavLink);

function LoginPage() {
  const User: any = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [forceRender, setForceRender] = useState(0);

  type Instagram = {
    connected: boolean;
    id: string;
    username: string;
  };
  useEffect(() => {
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
              window.location.reload();
            } else {
              console.log("User has no Instagram. Navigating to /nextpagesss");
              // /navigate("/nextpage");
              window.location.reload();
            }
          } else {
            console.log("Login with Google Failed");
            throw new Error("Login with Google Failed");
          }
        } catch (err: any) {
          console.error("Error:", err.message);
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

  const LoginWithEmail = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error("Please fill all the fields");
      }
      const body = {
        email,
        password,
      };
      console.log(body);
      const res: any = await axios.post(
        BASE_URL,
        {
          query: `
          mutation Mutation($jsonInput: String!) {
            logInWithEmail(json_input: $jsonInput) {
              success
              message
              me {
                id
                has_tiktok
                has_instagram
                name
                pricing_plan
                pricing_id
                picture
                instagrams {
                  id
                  username
                  connected
                }
              }
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
      //console.log(res.data);
      if (res.data.data.logInWithEmail.success) {
        const me = res.data.data.logInWithEmail.me;
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
          navigate("/");
        } else {
          console.log("User has no Instagram. Navigating to /nextpage");
          navigate("/nextpage");
        }
      } else {
        console.log("Login Failed");
        throw new Error("Login Failed");
      }
    } catch (err: any) {
      console.error("Error:", err.message);
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
      // to="/signup"
    }
  };

  error && console.error(error);
  loading && console.log("Loading...");

  return (
    <AuthContainer>
      <img src={logo} alt="Skim_social" />
      <VStack>
        <Heading lineHeight={1} fontSize={"3xl"} mt={8}>
          Sign in
        </Heading>
        <Text fontSize={"sm"} pt={2}>
          account?{" "}
          <ChakraNavLink
            color={"primary.600"}
            textDecoration={"underline"}
            to="/signup"
          >
            Sign Up
          </ChakraNavLink>
        </Text>
      </VStack>
      <VStack gap={3}>
        <FormRow
          placeholder="janedoe@gmail.com"
          type="email"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormRow

          helperElement={
            <FormHelperText color={"primary.800"}>
              <ChakraNavLink
                color={"primary.500"}
                textDecoration={"underline"}
                to="/reset-password"
                mt={10}
              >
                Forgot password?
              </ChakraNavLink>
            </FormHelperText>
          }
          placeholder="*********"
          type="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </VStack>
      <VStack gap={3}>
        <Button
          mt={6}
          onClick={LoginWithEmail}
          colorScheme="primary"
          width={"440px"}
          h={"40px"}
          borderRadius={"9px"}
          fontWeight={"normal"}>
          Continue
        </Button>
        <Button
          w={"440px"}
          h={"40px"}
          borderRadius={"9px"}
          colorScheme="primary"
          isLoading={loading}
          leftIcon={<img alt="logo" src={google} />}
          variant={"outline"}
          onClick={(e) => {
            login();
          }}

        >

          Sign In with Google

        </Button>
      </VStack >
      <VStack w={"430px"} pt={"10px"} gap={0}>
        <Text fontSize={"sm"}>You also agree to receive product-related marketing emails from</Text>
        <Text fontSize={"sm"} pt={0} >WildSocial, which you can unsubscribe from at any time.</Text>

      </VStack>




    </AuthContainer>
  );
}


export default LoginPage;
