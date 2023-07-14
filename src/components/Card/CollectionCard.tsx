import {
  VStack,
  Text,
  Image,
  Button as ChakrauiButton,
  Box,
} from "@chakra-ui/react";
import HorizontalThreeDot from "@/assets/icons/Outline/HorizontalThreeDot";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { UseDisclosureReturn } from "@chakra-ui/react";

function CollectionCard({
  collection,
  onOpen,
  setDeleteCollection,
  renameModalDisclosure,
  setRenameCollection,
}: {
  collection: any;
  onOpen: () => void;
  setDeleteCollection: Dispatch<SetStateAction<any>>;
  renameModalDisclosure: UseDisclosureReturn;
  setRenameCollection: Dispatch<SetStateAction<any>>;
}) {
  return (
    <VStack
      position={"relative"}
      overflow={"hidden"}
      shadow={"md"}
      ml={5}
      backgroundColor={"white"}
      borderRadius={"12px"}
    >
      <Link to={`/collection/${collection.id}`}>
        <Image
          position="relative"
          width="100%"
          objectFit="cover"
          roundedTop={"xl"}
          src={`https://picsum.photos/seed/${Date.now()}/250/150`}
        />
      </Link>
      <Box position={"absolute"} right="0" top="3" zIndex="1">
        <Menu>
          <MenuButton
            as={ChakrauiButton}
            variant={"ghost"}
            transform={"rotate(90deg)"}
            _hover={{ bg: "none" }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <HorizontalThreeDot />
          </MenuButton>
          <MenuList>
            <MenuItem>Get Public Link</MenuItem>
            <MenuItem
              onClick={() => {
                setRenameCollection(collection);
                renameModalDisclosure.onOpen();
              }}
            >
              {" "}
              Rename
            </MenuItem>

            <MenuItem
              onClick={() => {
                setDeleteCollection(collection);
                onOpen();
              }}
              color="#ff0000"
            >
              Delete Collection
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Text fontWeight={"semibold"} alignSelf={"flex-start"} px={5} py={3}>
        {collection.name}
      </Text>
    </VStack>
  );
}

export default CollectionCard;
