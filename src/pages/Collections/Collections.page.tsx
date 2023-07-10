import {
  VStack,
  Text,
  Wrap,
  WrapItem,
  Image,
  Button as ChakrauiButton,
  Box,
} from "@chakra-ui/react";
import HorizontalThreeDot from "@/assets/icons/Outline/HorizontalThreeDot";
import Container from "@components/Container";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import CollectionPageTopNavBar from "@/components/Navbar/CollectionPageTopNavBar";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { CreateUserCollection, GetUserCollection } from "@/query/user";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { DeleteCollection } from "@/query/collection";

function Collections() {
  const { data, loading, error, refetch } = useQuery(GetUserCollection);

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <Container background={"neutral.100"}>
      <CollectionPageTopNavBar />
      <Wrap pt={5}>
        {data?.me?.collections.map((collection: any, i: number) => {
          return (
            <WrapItem key={collection.id}>
              <Card refetch={refetch} collection={collection} />
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
}

function Card({
  collection,
  refetch,
}: {
  collection: any;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}) {
  const [
    deleteCollection,
    {
      data: dataDeleteCollection,
      loading: loadingDeleteCollection,
      error: errorDeleteCollection,
    },
  ] = useMutation(DeleteCollection);
  if (loadingDeleteCollection) {
    return <Loading />;
  }
  if (dataDeleteCollection) {
    refetch();
  }
  return (
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
                deleteCollection({
                  variables: {
                    jsonInput: JSON.stringify({
                      id: collection.id,
                    }),
                  },
                });
              }}
              color="red"
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
  );
}

export default Collections;
