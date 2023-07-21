import { Image, VStack, Text, Button, Container, Center } from '@chakra-ui/react';
import logo from "@assets/logo.svg";
import screen from "@assets/images/screen.png"
//import AuthContainer from "@/components/Auth/Containers/AuthContainer";
import { useBreakpointValue } from "@chakra-ui/react";

export default function Download() {
  return (
    <AuthContainer>
      <Container>
        <VStack align={"center"}>
          <Image
            w={"200px"}
            h={"100px"}
            //mt={"100px"}
            //ml={"10px"}
            src={logo} alt=""
          />
          <VStack align={"start"} ml={"15px"}>
            <Text ml={"15px"} fontWeight={"extrabold"} fontSize={"3xl"} fontFamily={"body"}>
              Download our Chrome extension <Text mt={"0px"} ml={"40px"}>to connect  your accounts</Text>
            </Text>
            <Text fontSize={"md"} ml={"30px"} mt={"10px"}>
              We use a chrome extension to connect to your accounts so please <Text mt={"0px"} ml={"40px"}> download the chrome extension and follow the tutorial</Text>
            </Text>
          </VStack>
          <VStack gap={"15px"}>
            <Image
              w={"500px"}
              h={"300px"}
              mt={"30px"}
              ml={"30px"}
              src={screen}
              alt="Icon"
            />
            <Button
              marginTop={5}
              ml={"30px"}
              width={"500px"}
              height={"50px"}
              bg={"primary.400"}
              color={"white"}
            >
              Download Extension
            </Button>
          </VStack>
        </VStack>
      </Container>
    </AuthContainer>
  )
}

function AuthContainer({ children }: { children: React.ReactNode }) {
  const width = useBreakpointValue(["100%", "85%", "75%", "50%"]);

  return (
    <Center p={1} overflow={"hidden"} h="100vh" w="100vw">
      <Center
        width={"98%"}
        height={"96%"}
        rounded={"md"}
        py={10}
        pt={5}
        overflow={"auto"}
        bg="white"
      >
        <VStack width={width} gap={1}>
          {children}
        </VStack>
      </Center>
    </Center>
  );
}