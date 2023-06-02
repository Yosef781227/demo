import { useNavigate, useLocation } from "react-router-dom";
import { Box, Container, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import React from "react";

type InstagramData = {
  id: string;
  username: string;
};

function ChooseInstagram() {
  const navigate = useNavigate();
  const location = useLocation();
  const instagrams: InstagramData[] = location.state?.instagrams || [];

  const handleInstagramSelect = (instagramId: string, username: string, accessToken: string) => {
    navigate("/home", {
      state: {
        instagramId,
        username,
        accessToken,
      },
    });
  };

  if (instagrams.length === 0) {
    return (
      <Container   background={"neutral.50"}>
        <RowContainer height={"300px"}>
              <Text fontSize={"2xl"}>No Instagram accounts found</Text>
        </RowContainer>
      </Container>
    );
  }

  return (
    <Container background={"neutral.50"}>
      <Text fontSize={"4xl"}>Choose Instagram</Text>
      <RowContainer height={"300px"}>
        {instagrams.map(({ id, username }) => (
            <RowItem key={id} onClick={() => handleInstagramSelect(id, username, location.state.accessToken)}>
            <HStack>
              <Icon  />
              <Text>{username}</Text>
            </HStack>
          </RowItem>
        ))}
      </RowContainer>
    </Container>
  );
}

type RowContainerProps = {
  children: React.ReactNode;
  height?: string | number;
};

function RowContainer({ children, height = "auto" }: RowContainerProps) {
  return (
    <VStack
      alignItems={"stretch"}
      shadow={"lg"}
      height={height}
      backgroundColor={"white"}
      mt="40px"
      pt={10}
      px={10}
      py={5}
      gap={4}
      rounded={"lg"}
    >
      {children}
    </VStack>
  );
}

type RowItemProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function RowItem({ children, onClick }: RowItemProps) {
  return (
    <Box
      as="button"
      w="full"
      p={4}
      textAlign="left"
      onClick={onClick}
      _hover={{
        background: "gray.100",
      }}
    >
      {children}
    </Box>
  );
}

export default ChooseInstagram;
