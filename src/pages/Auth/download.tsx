import {  Container, Flex, Image, Spacer, VStack,Text,Button } from '@chakra-ui/react';
import logo from "@assets/logo.svg";

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
          w={"140px"}
          h={"70px"}
          mt={"100px"}
          src={logo} alt="" 
        />
        <VStack  align={"start"}>
        <Text mt={"10px"} fontWeight={"extrabold"}  fontSize={"xl"} fontFamily={"body"}> 
        Download our Chrome extension <Text mt={"0px"} ml={"40px"}>to connect  your accounts</Text>
        </Text>
        <Text fontSize={"xs"} mt={"5px"}>
        We use a chrome extension to connect to your accounts so please <Text mt={"0px"} ml={"40px"}> download the chrome extension and follow the tutorial</Text>
        </Text>
        </VStack>
        <Image
     
          w={"480 px"}
          h={"300px"}
          mt={"10px"} 
       
           
          
          
          src={`${process.env.PUBLIC_URL}/watch.png`}
          alt="Icon"
        />
        <Button 
        mt={"10px"}
        width={"455px"}
        height={"50px"}
        bg={"primary.400"}
        color={"white"}
        >

        Download Extension
        </Button>

        </VStack>
      </Container>
      <Spacer /> 
    </Flex>
  )
}
