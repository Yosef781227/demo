import { Text, Heading, VStack } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import Button from "@/components/Buttons/Button";
import { NavLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";
const ChakraNavLink = chakra(NavLink);
function SignupPage() {
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
        <FormRow
          placeholder="janedoe@gmail.com"
          type="email"
          label="work Email"
        />
        <FormRow placeholder="password" type="password" label="password" />
        <FormRow placeholder="janedoe@gmail.com" type="text" label="Name" />
        <FormRow placeholder="password" type="password" label="password" />
      </RowContainer>
      <RowContainer>
        <Button size="full" text="Continue" />
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
