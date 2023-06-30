import {VStack,Text,Wrap,WrapItem,Image,Button as ChakrauiButton,Box,} from "@chakra-ui/react";
import HorizontalThreeDot from "@/assets/icons/Outline/HorizontalThreeDot";
import Container from "@components/Container";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import CollectionPageTopNavBar from "@/components/Navbar/CollectionPageTopNavBar";

function Collections() {
  return (
    <Container  background ={"neutral.100"} >
      <CollectionPageTopNavBar />
      <Wrap pt={5}>
        {Array(...["Favorites", "Random", "Large Influencers"]).map(
          (text, i) => {
            return (
              <WrapItem key={i}>
                  <Card text={text} />
              </WrapItem>
            );
          }
        )}
      </Wrap>
    </Container>
  );
}

function Card({ text }: { text: string }) {
  return (
   
  <VStack position={"relative"} overflow={"hidden"} shadow={"md"} ml={5} backgroundColor={"white"} borderRadius={"12px"} >
  <Image
    position="relative"
    width="100%"
    objectFit="cover"
    roundedTop={"xl"}
    src={`https://picsum.photos/seed/${Date.now()}/250/150`}
  />
  <Box position={"absolute"} right="0" top="3" zIndex="1">
    <Menu>
      <MenuButton
        as={ChakrauiButton}
        variant={"ghost"}
        transform={"rotate(90deg)"}
        _hover={{ bg: "none" }}
      >
        <HorizontalThreeDot />
      </MenuButton>
      <MenuList>
        <MenuItem>Rename</MenuItem>
        <MenuItem color="red">Delete Random</MenuItem>
      </MenuList>
    </Menu>
  </Box>
  <Text fontWeight={"thin"} alignSelf={"flex-start"} px={5} py={3}>
    {text}
  </Text>
</VStack>

  );
}

export default Collections;
