import { Text, Heading, VStack } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import Button from "@/components/Buttons/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
const ChakraNavLink = chakra(NavLink);

function SignupPage() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    } catch (error) {
    }
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
      if (name === '') {
        setError('Name is required');
        return;
      }
      if (lastName === '') {
        setError('Last Name is required');
        return;
      }
      if (email === '') {
        setError('Email is required');
        return;
      }
      if (!email.includes('@') && !email.includes('.')) {
        setError('Email is not valid');
        return;
      }
      if (password === '') {
        setError('Password is required');
        return;
      }
      try {
        //send request to server
        const response: any = await axios.post(
          BASE_URL,
          {
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
          }
        );
        console.log(response.data);
        if (response.data.data) {
          console.log("varify email");
          //navigate("/nextpage");
        } else {
          setError(response.data.errors[0].message);
        }

      } catch (error) {

      }

    } catch (error: any) {
      //setError(true);
    }
  };


  return (
    <AuthContainer>
      <img src={logo} alt="" />
      <RowContainer>
        <Heading lineHeight={1} fontSize={"3xl"}>
          Signup
        </Heading>
        <Text fontSize={"sm"}>
          Already Have an account?{" "}
          <ChakraNavLink
            color={"primary.900"}
            textDecoration={"underline"}
            to="/login"
          >
            Signin
          </ChakraNavLink>
        </Text>
      </RowContainer>
      <RowContainer>
        <FormRow placeholder="Name" type="text" label="name" onChange={(e) => setName(e.target.value)} />
        <FormRow placeholder="Last Name" type="text" label="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <FormRow placeholder="janedoe@gmail.com" type="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
        <FormRow placeholder="password" type="password" label="password" onChange={(e) => setPassword(e.target.value)} />
      </RowContainer>
      <RowContainer>
        <Button size="full" text="Continue" onClick={signup} />
        <Button
          size="full"
          text="Sign In with Google"
          variant={"outline"}
          icon={<img alt="logo" src={google} />}
        ></Button>
      </RowContainer>
      <Text align={"center"} fontWeight={"thin"} color="#525252">
        You also agree to receive product-related marketing emails from
        WildSocial, which you can unsubscribe from at any time.
      </Text>
    </AuthContainer>
  );
}
function RowContainer({ children }: { children: React.ReactNode }) {
  return <VStack w="full">{children}</VStack>;
}

export default SignupPage;
