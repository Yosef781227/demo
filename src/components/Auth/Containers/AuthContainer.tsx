import { Center, VStack, Box } from "@chakra-ui/react";
import React from "react";

function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <Center p={1} overflow={"hidden"} h="100vh" w="100vw">
      <Center
        width={"98%"}
        height={"96%"}
        rounded={"md"}
        py={10}
        pt={20}
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

export default AuthContainer;
