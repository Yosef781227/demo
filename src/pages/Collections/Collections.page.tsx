import { Wrap, WrapItem, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Container from "@components/Container";
import { useMutation, useQuery } from "@apollo/client";
import { GetUserCollection } from "@/query/user";
import Loading from "@/components/Loading";
import { useState } from "react";
import { DeleteCollection, RenameCollection } from "@/query/collection";
import CollectionsPageTopNavBar from "@/components/Navbar/CollectionsPageTopNavBar";
import DeleteCollectionModal from "@/components/Modal/DeleteCollectionModal";
import RenameCollectionModal from "@/components/Modal/RenameCollectionModal";
import CollectionCard from "@/components/Card/CollectionCard";

function Collections() {
  const { data, loading, refetch } = useQuery(GetUserCollection);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCollection, setDeleteCollection] = useState<any>(null);
  const [renameCollection, setRenameCollection] = useState<any>(null);
  const [
    deleteCollectionMutation,
    { data: dataDeleteCollection, loading: loadingDeleteCollection },
  ] = useMutation(DeleteCollection);

  const [
    renameCollectionMutation,
    { data: dataRenameCollection, loading: loadingRenameCollection },
  ] = useMutation(RenameCollection);
  const renameModalDisclosure = useDisclosure();

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
      <DeleteCollectionModal
        isOpen={isOpen}
        deleteCollection={deleteCollection}
        setDeleteCollection={setDeleteCollection}
        onClose={onClose}
        deleteCollectionMutation={deleteCollectionMutation}
      />

      <RenameCollectionModal
        renameModalDisclosure={renameModalDisclosure}
        renameCollectionMutation={renameCollectionMutation}
        renameCollection={renameCollection}
        setRenameCollection={setRenameCollection}
      />

      <Container background={"neutral.100"}>
        <CollectionsPageTopNavBar />
        <Wrap pt={5}>
          {data?.me?.collections.map((collection: any) => {
            return (
              <WrapItem key={collection.id}>
                <CollectionCard
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

export default Collections;
