import { Image, VStack, Text, Button, Container, Center, Modal, ModalOverlay, ModalContent, ModalBody, AspectRatio, useDisclosure } from '@chakra-ui/react';
import { useBreakpointValue } from "@chakra-ui/react";
import logo from "@assets/logo.svg";
import screen from "@assets/images/screen.png"

const handleDownload = (url: string) => {
  window.open(url.includes("https://") ? url : "https://" + url, "_current");
};

export default function Download() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickImage = () => {
    onOpen();
  };

  return (
    <AuthContainer>
      <Container>
        <VStack align={"center"}>
          <Image
            w={"200px"}
            h={"100px"}
            src={logo} alt=""

          />
          <VStack align={"start"} >
            <Text fontWeight="bold" fontSize={"xl"} ml={12}>
              Download our Chrome extension <Text mt={"0px"} ml={10}>to Connect your accounts</Text>
            </Text>
            <Text fontSize={"sm"} mt={"10px"}>
              We use a chrome extension to connect to your accounts so please <Text mt={"0px"} ml={"40px"}> download the chrome extension and follow the tutorial</Text>
            </Text>
          </VStack>
          <VStack gap={"15px"}>
            <Image
              w={"500px"}
              h={"300px"}
              mt={"30px"}

              src={screen}
              alt="Icon"
              onClick={onClickImage}
            />
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      title="video"
                      src="https://www.loom.com/embed/df44a635598541e9968e4229ea9d386f"
                      allowFullScreen
                    />
                  </AspectRatio>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Button
              onClick={(e) => handleDownload("https://wildsocial.nyc3.cdn.digitaloceanspaces.com/skimSocialConectorExtension.zip")}
              marginTop={5}

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
