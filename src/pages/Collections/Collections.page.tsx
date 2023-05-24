import {
  HStack,
  VStack,
  Text,
  Wrap,
  WrapItem,
  Image,
  Button as ChakrauiButton,
  Box,
} from "@chakra-ui/react";
import React from "react";
import HorizontalThreeDot from "@/assets/icons/Outline/HorizontalThreeDot";

import Container from "@components/Container";
import Button from "@components/Buttons/Button";
import AddIcon from "@/assets/icons/AddIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
function Collections() {
  return (
    <Container>
      <HStack justifyContent={"space-between"}>
        <Text>Content</Text>
        <HStack>
          <Button icon={<AddIcon />} text="New Collection" />
        </HStack>
      </HStack>
      <Wrap spacing={8} gap={2}>
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
    <VStack position={"relative"} overflow={"hidden"} shadow={"md"} mb={10}>
      <Box position={"absolute"} right="0" top="3">
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
      <Image
        roundedTop={"xl"}
        src={`https://picsum.photos/seed/${Date.now()}/250/150`}
      />
      <Text fontWeight={"thin"} alignSelf={"flex-start"} px={5} py={3}>
        {text}
      </Text>
    </VStack>
  );
}

export default Collections;
