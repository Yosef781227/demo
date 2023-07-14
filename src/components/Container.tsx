import {  Box } from "@chakra-ui/react";
import theme from "@/constants/theme";

function Container(props: any) {


  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      overflow={"hidden"}
      alignSelf={"flex-start"}
      ml={"20%"}
      minH={"120vh"}
      mt={3.5}
      
      alignItems={"stretch"}
      borderTopRadius={10}
      gap="0"
      {...props}
    >
      {props.children}
    </Box>
  );
}

export default Container;
