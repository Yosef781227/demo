import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import {
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

function DeleteCollectionModal({
  isOpen,
  onClose,
  deleteCollectionMutation,
  setDeleteCollection,
  deleteCollection,
}: {
  isOpen: boolean;
  onClose: () => void;
  setDeleteCollection: Dispatch<SetStateAction<any>>;
  deleteCollection: any;
  deleteCollectionMutation: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="none"
        backdropBrightness={10}
        backdropFilter="auto"
        backdropBlur="3px"
      />
      <ModalContent maxW="480px" maxH="202px">
        <ModalHeader fontWeight={"extrabold"} fontSize={"xl"} mt={5}>
          Do You Want to delete this collection ?
        </ModalHeader>
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
  );
}

export default DeleteCollectionModal;
