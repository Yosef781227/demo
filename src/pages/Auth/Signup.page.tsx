import { Text, Heading, VStack, Button, Link } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { BASE_URL } from "@/constants";
//import { set } from "date-fns";
import { UserContext } from "@/App";
const ChakraNavLink = chakra(NavLink);

function SignupPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const User: any = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [forceRender, setForceRender] = useState(0);

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

  const Authenticate = async (token: string) => {
    try {
      const response: any = await axios.post(
        BASE_URL,
        {
          query: `
          mutation Mutation($jsonInput: String!) {
            varifyEmail(json_input: $jsonInput) {
              success
              message
              me {
                id
                has_instagram
                has_tiktok
                name
                is_varified
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
            jsonInput: JSON.stringify({
              token: token,
            }),
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data.varifyEmail.success);
      if (response.data.data.varifyEmail.success) {
        navigate("/login");
      }
    } catch (error) { }
  };
  useEffect(() => {
    const token = window.location.href.split("token=")[1];
    //console.log(token);

    if (token) {
      //console.log("varify email", token);
      Authenticate(token);
    }
  }, []);

  const signup = async () => {
    try {
      setLoading(true);
      //validate email
      if (name === "") {
        setError("Name is required");
        return;
      }
      if (lastName === "") {
        setError("Last Name is required");
        return;
      }
      if (email === "") {
        setError("Email is required");
        return;
      }
      if (!email.includes("@") && !email.includes(".")) {
        setError("Email is not valid");
        return;
      }
      if (password === "") {
        setError("Password is required");
        return;
      }
      try {
        //send request to server
        const response: any = await axios.post(BASE_URL, {
          query: `
            mutation Mutation($jsonInput: String!) {
              signUpWithEmail(json_input: $jsonInput) {
                success
                message
                me {
                  id
                }
              }
            }
            `,
          variables: {
            jsonInput: JSON.stringify({
              name: name,
              lastname: lastName,
              email: email,
              password: password,
            }),
          },
        });
        console.log(response.data);
        if (response.data.data) {
          console.log("varify email");
          //navigate("/nextpage");
        } else {
          setError(response.data.errors[0].message);
        }
      } catch (error) { }
    } catch (error: any) {
      //setError(true);
    }
  };

  return (
    <AuthContainer>
      <img src={logo} alt="" />
      <VStack>
        <Heading lineHeight={1} fontSize={"3xl"} mt={8} fontWeight={"bold"}>
          Sign Up
        </Heading>
        <Text fontSize={"sm"} pt={2}>
          Already have an account? {" "}
          <ChakraNavLink
            color={"#7C3AED"}
            textDecoration={"underline"}
            to="/login"
          >
            Sign In
          </ChakraNavLink>
        </Text>
      </VStack>
      <VStack pt={"15px"} w={"440px"}>
        <FormRow
          placeholder="Jane Doe"
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <FormRow
          placeholder="janedoe@gmail.com"
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormRow
          placeholder="**********"
          type="password"
          label="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </VStack>

      <VStack w={"420px"} pt={"10px"} gap={0}>
        <Text fontSize={"sm"}>
          By continuing, you agree to our {" "}
          <Link href="" textDecoration="underline">Terms Of Service</Link>, {" "}
          <Link href="" textDecoration="underline">Privacy Policy</Link>,
        </Text>
        <Text fontSize={"sm"} >and give us permission to engage with your brand’s online</Text>
        <Text fontSize={"sm"} >community on your behalf.</Text>
      </VStack>

      <VStack>
        <Button
          mt={6}
          onClick={signup}
          colorScheme="primary"
          width={"440px"}
          h={"40px"}
          borderRadius={"9px"}
          fontWeight={"normal"}
        >
          Agree {" "} and {" "} Sign Up
        </Button>
      </VStack>
      <VStack>
        <Button
          mt={3}
          onClick={(e) => {
            login();
          }}
          width={"440px"}
          h={"40px"}
          borderRadius={"9px"}
          isLoading={loading}
          leftIcon={<img alt="logo" src={google} />}
          variant={"outline"}
          fontWeight={"normal"}

        >
          Sign Up With Google
        </Button>
      </VStack>
      <VStack w={"430px"} pt={"10px"} gap={0}>
        <Text fontSize={"sm"}>You also agree to receive product-related marketing emails from</Text>
        <Text fontSize={"sm"} >WildSocial, which you can unsubscribe from at any time.</Text>
      </VStack>

    </AuthContainer>
  );
}


export default SignupPage;