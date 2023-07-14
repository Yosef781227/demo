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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
function RenameCollectionModal({
  renameModalDisclosure,
  renameCollectionMutation,
  renameCollection,
  setRenameCollection,
}: {
  renameCollection: any;
  setRenameCollection: Dispatch<SetStateAction<any>>;
  renameModalDisclosure: any;
  renameCollectionMutation: (
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
  const [renameInput, setRenameInput] = useState("");

  return (
    <Modal
      isCentered
      isOpen={renameModalDisclosure.isOpen}
      onClose={renameModalDisclosure.onClose}
    >
      <ModalOverlay
        bg="none"
        backdropBrightness={10}
        backdropFilter="auto"
        backdropBlur="3px"
      />
      <ModalContent maxW="480px" maxH="230px">
        <ModalHeader fontWeight={"extrabold"} fontSize={"xl"} mt={5}>
          Rename Collection
        </ModalHeader>
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
                    jsonInput: JSON.stringify({
                      id: renameCollection.id,
                      name: renameInput,
                    }),
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
  );
}

export default RenameCollectionModal;
