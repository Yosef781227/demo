import { Text, Heading, VStack, FormHelperText, Box } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import google from "@assets/google.svg";
import Button from "@/components/Buttons/Button";
import { NavLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import FormRow from "@/components/Form/FormRow";
import AuthContainer from "@/components/Auth/Containers/AuthContainer";
const ChakraNavLink = chakra(NavLink);
function LoginPage() {
  return (
    <AuthContainer>
      <img src={logo} alt="" />
      <RowContainer>
        <Heading lineHeight={1} fontSize={"2xl"}>
          Reset Password
        </Heading>
        <Box lineHeight={"1.2"} fontSize={"sm"}>
          <Text>Your new password must be different to</Text>
          <Text align={"center"}> previously used passwords.</Text>
        </Box>
      </RowContainer>
      <RowContainer>
        <FormRow
          placeholder="New password"
          type="password"
          label="New Password"
        />
        <FormRow
          placeholder="New password"
          type="password"
          label="Confirm Password "
        />
      </RowContainer>
      <RowContainer>
        <Button size="full" text="Reset Password" />
        <Button
          size="full"
          text="Sign In with Google"
          variant={"outline"}
          textColor="#525252"
          icon={<img alt="logo" src={google} />}
        ></Button>
      </RowContainer>
      <Text
        fontSize={"sm"}
        align={"center"}
        fontWeight={"thin"}
        color="#525252"
      >
        Back to{" "}
        <ChakraNavLink
          color={"primary.900"}
          textDecoration={"underline"}
          to="/login"
        >
          Signin
        </ChakraNavLink>
      </Text>
    </AuthContainer>
  );
}
function RowContainer({ children }: { children: React.ReactNode }) {
  return <VStack w="full">{children}</VStack>;
}

export default LoginPage;
