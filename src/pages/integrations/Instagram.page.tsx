import { useNavigate } from "react-router-dom";
import {
  Heading,
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Switch,
} from "@chakra-ui/react";
import Container from "@components/Container";
import insta from "@assets/icons/social/instagram.svg";
import AddIcon from "@/assets/icons/AddIcon";
import Buttons from "@/components/Buttons/Button";
function InstagramPage() {
  const navigate = useNavigate();
  
  return (
    <Container background={"neutral.50"}>
      <Box alignSelf={"center"} w={"70%"} gap={"32px"}>
        <Heading size={"md"} mt={5}>
          Integrations
        </Heading>
        <RowContainer>
          <Heading size={"md"}>Sources</Heading>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Image src={insta} alt="tiktok logo" />
              <Text>Instagram</Text>
            </HStack>
            <Buttons
              width="max-content"
              icon={<AddIcon />}
              text="Add another account"
   
              onClick={() => navigate("/nextpage")}
            />
            {" "}
          </HStack>
          <VStack alignSelf={"start"} alignItems={"start"}>
            <Text>Connect</Text>
            {/* <Text>@beyond_lore</Text> */}
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
      backgroundColor={"white"}
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
export default InstagramPage;
