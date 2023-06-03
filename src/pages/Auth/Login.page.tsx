import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "@/constants";
import { Text, Heading, VStack, FormHelperText } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import { NavLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";
import Buttons from "@/components/Buttons/Button";
const ChakraNavLink = chakra(NavLink);

function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  type Instagram = {
    connected: boolean;
    id: string;
    username: string;
  };

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
      console.log(res.data);
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
          navigate("/home");
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
    }
  };

  error && console.error(error);
  loading && console.log("Loading...");

  return (
    <AuthContainer>
      <img src={logo} alt="" />
      <RowContainer>
        <Heading lineHeight={1} fontSize={"2xl"}>
          Sign in
        </Heading>
        <Text fontSize={"sm"}>
          Create a new account?{" "}
          <ChakraNavLink
            color="#8447EE"
            textDecoration={"underline"}
            to="/signup"
          >
            Sign up
          </ChakraNavLink>
        </Text>
      </RowContainer>
      <RowContainer>
        <FormRow
          placeholder="janedoe@gmail.com"
          type="email"
          label="work Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormRow
          placeholder="password"
          helperElement={
            <FormHelperText color={"primary.800"}>
              <ChakraNavLink
                color={"primary.900"}
                textDecoration={"underline"}
                to="/reset-password"
              >
                Forgot password?
              </ChakraNavLink>
            </FormHelperText>
          }
          type="password"
          label="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </RowContainer>
      <RowContainer>
        <Buttons size="full" text="Continue" onClick={LoginWithEmail} />
        <Buttons
          size="full"
          isLoading={loading}
          text="Sign In with Google"
          icon={<img alt="logo" src={google} />}
          variant={"outline"}
          onClick={login}
        />
      </RowContainer>
      <Text
        align={"center"}
        fontSize={"sm"}
        fontWeight={"thin"}
        color="#525252"
      >
        You also agree to receive product-related marketing emails from
        WildSocial, which you can unsubscribe from at any time.
      </Text>
    </AuthContainer>
  );
}
function RowContainer({ children }: { children: React.ReactNode }) {
  return <VStack w="full">{children}</VStack>;
}

export default LoginPage;
