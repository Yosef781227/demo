import {
  VStack,
  Text,
  Wrap,
  WrapItem,
  Image,
  Button as ChakrauiButton,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
} from "@chakra-ui/react";
import HorizontalThreeDot from "@/assets/icons/Outline/HorizontalThreeDot";
import Container from "@components/Container";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { GetUserCollection } from "@/query/user";
import Loading from "@/components/Loading";
import { Dispatch, SetStateAction, useState } from "react";
import { DeleteCollection } from "@/query/collection";
import { Link } from "react-router-dom";
import CollectionsPageTopNavBar from "@/components/Navbar/CollectionsPageTopNavBar";

function Collections() {
  const { data, loading, refetch } = useQuery(GetUserCollection);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCollection, setDeleteCollection] = useState<any>(null);
  const [
    deleteCollectionMutation,
    { data: dataDeleteCollection, loading: loadingDeleteCollection },
  ] = useMutation(DeleteCollection);

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropBrightness={10}
      backdropFilter="auto"
      backdropBlur="3px"
    />
  );
  if (dataDeleteCollection) {
    refetch();
  }
  if (loading || !data || loadingDeleteCollection) {
    return <Loading />;
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Overlay />
        <ModalContent>
          <ModalHeader>Do You Want to delete this collection ? </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This Action will{" "}
              <Text as="span" fontWeight="bold">
                permanently remove this collection .
              </Text>{" "}
              Are you sure you want to proceed?
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack width={"full"} justifyContent={"space-around"}>
              <Button
                onClick={() => {
                  setDeleteCollection(null);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  deleteCollectionMutation({
                    variables: {
                      jsonInput: JSON.stringify({ id: deleteCollection.id }),
                    },
                  });
                }}
              >
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container background={"neutral.100"}>
        <CollectionsPageTopNavBar />
        <Wrap pt={5}>
          {data?.me?.collections.map((collection: any) => {
            return (
              <WrapItem key={collection.id}>
                <Card
                  setDeleteCollection={setDeleteCollection}
                  onOpen={onOpen}
                  collection={collection}
                />
              </WrapItem>
            );
          })}
        </Wrap>
      </Container>
    </>
  );
}

function Card({
  collection,
  onOpen,
  setDeleteCollection,
}: {
  collection: any;
  onOpen: () => void;
  setDeleteCollection: Dispatch<SetStateAction<any>>;
}) {
  return (
    <Link to={`/collection/${collection.id}`}>
      <VStack
        position={"relative"}
        overflow={"hidden"}
        shadow={"md"}
        ml={5}
        backgroundColor={"white"}
        borderRadius={"12px"}
      >
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
              <MenuItem>Get Public Link</MenuItem>
              <MenuItem>Rename</MenuItem>
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
        <Text fontWeight={"thin"} alignSelf={"flex-start"} px={5} py={3}>
          {collection.name}
        </Text>
      </VStack>
    </Link>
  );
}

export default Collections;
