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
  Input,
} from "@chakra-ui/react";
import HorizontalThreeDot from "@/assets/icons/Outline/HorizontalThreeDot";
import Container from "@components/Container";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { GetUserCollection } from "@/query/user";
import Loading from "@/components/Loading";
import { Dispatch, SetStateAction, useState } from "react";
import { DeleteCollection , RenameCollection } from "@/query/collection";
import { Link } from "react-router-dom";
import CollectionsPageTopNavBar from "@/components/Navbar/CollectionsPageTopNavBar";
import { UseDisclosureReturn } from "@chakra-ui/react";



function Collections() {
  const { data, loading, refetch } = useQuery(GetUserCollection);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCollection, setDeleteCollection] = useState<any>(null);
  const [
    deleteCollectionMutation,
    { data: dataDeleteCollection, loading: loadingDeleteCollection },
  ] = useMutation(DeleteCollection);

  const [renameCollection, setRenameCollection] = useState<any>(null);
  const [renameInput, setRenameInput] = useState<string>("");
  const [
    renameCollectionMutation,
    { data: dataRenameCollection, loading: loadingRenameCollection },
  ] = useMutation(RenameCollection);
  const renameModalDisclosure = useDisclosure();

  
  

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropBrightness={10}
      backdropFilter="auto"
      backdropBlur="3px"
    />
  );
  if (dataRenameCollection) {
    refetch();
}

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
  <ModalContent maxW="480px" maxH="202px">
    <ModalHeader fontWeight={"extrabold"} fontSize={"xl"} mt={5}>Do You Want to delete this collection ?</ModalHeader>
    <ModalCloseButton />
    <ModalBody mt={0}>
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
          w="210px"
          h="48px"
          onClick={() => {
            setDeleteCollection(null);
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          w="210px"
          h="48px"
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

<Modal isCentered isOpen={renameModalDisclosure.isOpen} onClose={renameModalDisclosure.onClose}>
    <Overlay />
    <ModalContent maxW="480px" maxH="230px">
        <ModalHeader fontWeight={"extrabold"} fontSize={"xl"} mt={5}>Rename Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={0}>
            <Text>Please enter the new name for the collection:</Text>
            <Input
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
            />
        </ModalBody>
        <ModalFooter>
            <HStack width={"full"} justifyContent={"space-around"}>
                <Button
                    w="210px"
                    h="48px"
                    onClick={() => {
                        setRenameCollection(null);
                        setRenameInput("");
                        renameModalDisclosure.onClose();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    w="210px"
                    h="48px"
                    colorScheme="purple"
                    onClick={() => {
                        renameModalDisclosure.onClose();
                        renameCollectionMutation({
                            variables: {
                                id: renameCollection.id,
                                newName: renameInput,
                            },
                        });
                        setRenameCollection(null);
                        setRenameInput("");
                    }}

                >
                    Rename
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
                renameModalDisclosure={renameModalDisclosure}
                setRenameCollection={setRenameCollection}
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
              > Rename</MenuItem>
              
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

export default Collections;
