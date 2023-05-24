import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {  useToast } from "@chakra-ui/react";
import { BASE_URL } from "@/constants";
import { Text, Heading, VStack, FormHelperText } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import Button from "@/components/Buttons/Button";
import { NavLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";
import theme from "@/constants/theme";
const ChakraNavLink = chakra(NavLink);
function LoginPage() {
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
                  message
                  me {
                    is_insta_connected
                    is_tiktok_connected
                    email
                    id
                    is_varified
                    name
                    permissions
                    picture
                    pricing_id
                    pricing_plan
                  }
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
        />
      </RowContainer>
      <RowContainer>
        <Button size="full" text="Continue" />
        <Button
          size="full"
          text="Sign In with Google"
          icon={<img alt="logo" src={google} />}
          variant={"outline"}
          onClick={login}
        ></Button>
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
