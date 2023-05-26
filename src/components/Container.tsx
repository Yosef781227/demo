import { VStack } from "@chakra-ui/react";
import React from "react";

function Container(props: any) {
  return (
    <VStack
      minH={"100vh"}
      backgroundColor={"white"}
      alignSelf={"flex-start"}
      width={"79.3%"}
      ml={"20%"}
      
      mt={3.5}
      alignItems={"stretch"}
      
      padding={4}
      px={7}
      borderTopRadius={10}
    >
      {props.children}
    </VStack>
  );
}
export default Container;
