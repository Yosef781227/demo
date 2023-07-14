import {  Container, Flex, Image, Spacer, VStack,Text,Button } from '@chakra-ui/react';
import logo from "@assets/logo.svg";
import screen from "@assets/images/screen.png"


export default function Download() {
  return (
    <Flex
      width={['68%', '78%', '88%', '98%']}
      height={['65vh', '75vh', '85vh', '95vh']}
      direction="column" 
      bg="neutral.50"
      ml={"20px"}
      borderRadius={"20"}
      mt={"20px"}
      p="5" 
    >
      <Container>
        <VStack  align={"center"}>
        <Image
          w={"200px"}
          h={"100px"}
          mt={"100px"}
          ml={"10px"}
          src={logo} alt="" 
        />
        
        <VStack  align={"start"} ml={"15px"}>
        <Text  ml={"15px"} fontWeight={"extrabold"}  fontSize={"3xl"} fontFamily={"body"}> 
            Download our Chrome extension <Text mt={"0px"} ml={"40px"}>to connect  your accounts</Text>
        </Text>
        <Text fontSize={"md"} ml={"30px"} mt={"10px"}>
        We use a chrome extension to connect to your accounts so please <Text mt={"0px"} ml={"40px"}> download the chrome extension and follow the tutorial</Text>
        </Text>
        </VStack>
        <VStack mt={"10px"} gap={"15px"}>
        <Image
          w={"500px"}
          h={"300px"}
          mt={"30px"} 
          src={screen}
          alt="Icon"
        />
        <Button 
        mt={60}
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
      <Spacer /> 
    </Flex>
  )
}
