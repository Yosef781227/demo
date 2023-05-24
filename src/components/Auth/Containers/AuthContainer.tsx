import { Center, VStack, Box } from "@chakra-ui/react";
import React from "react";

function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box p={5} overflow={"hidden"} h="100vh" w="100vw">
      <Center
        width={"100%"}
        rounded={"md"}
        py={10}
        sx={{
          //hide scrollbar for chrome, safari and opera
          "::-webkit-scrollbar": {
            display: "none",
          },
          //TODO: hide scrollbar for IE, edge and firefox
        }}
        pt={20}
        overflow={"auto"}
        height={"100%"}
        bg="white"
      >
        <VStack width={"35%"} gap={5}>
          {children}
        </VStack>
      </Center>
    </Box>
  );
}

export default AuthContainer;
