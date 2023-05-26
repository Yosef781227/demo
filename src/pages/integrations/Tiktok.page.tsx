import Buttons from "@/components/Buttons/Button";
import {
  Heading,
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Switch,
} from "@chakra-ui/react";
import Container from "@components/Container";
import tiktok from "@assets/icons/social/tiktok.svg";
import AddIcon from "@/assets/icons/AddIcon";
function TiktokPage() {
  return (
    <Container>
      <Box alignSelf={"center"} w={"70%"} gap={"32px"}>
        <Heading size={"md"} mt={5}>
          Integrations
        </Heading>
        <RowContainer>
          <Heading size={"md"}>Sources</Heading>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Image src={tiktok} alt="insta logo" />
              <Text>Instagram</Text>
            </HStack>
            <Buttons
              width="max-content"
              icon={<AddIcon />}
              text="Add another account"
            />{" "}
          </HStack>
          <VStack alignSelf={"start"} alignItems={"start"}>
            <Text>Connected</Text>
            <Text>@beyond_lore</Text>
          </VStack>
        </RowContainer>
        <RowContainer>
          <Heading size={"md"}>Automatic like @mention</Heading>
          <Text>
            Turn this feature on to have Archive automatically "like" every
            Story that @mentions your brand.
          </Text>
          <HStack justifyContent={"space-between"}>
            <Text>auto-like stories</Text>
            <Switch></Switch>
          </HStack>
        </RowContainer>
      </Box>
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
      mt="32px"
      px={10}
      py={5}
      gap={4}
      rounded={"lg"}
    >
      {children}
    </VStack>
  );
}

export default TiktokPage;
