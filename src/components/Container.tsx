import { VStack } from "@chakra-ui/react";
import React from "react";

function Container(props: any) {
  return (
    <VStack
      minH={"100vh"}
      backgroundColor={"white"}
      alignSelf={"flex-start"}
      width={"80%"}
      ml={"20%"}
      mt={3}
      alignItems={"stretch"}
      // marginX={2}
      padding={4}
      px={7}
      borderTopRadius={10}
    >
      {props.children}
    </VStack>
  );
}
export default Container;
