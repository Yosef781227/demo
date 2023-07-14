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
function NewCollectionModal({
  newCollectionModalDisclosure,
  newCollectionMutation,
}: {
  newCollectionMutation: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
  newCollectionModalDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}) {
  const [newCollectionInput, setNewCollectionInput] = useState("");
  return (
    <Modal
      isCentered
      isOpen={newCollectionModalDisclosure.isOpen}
      onClose={newCollectionModalDisclosure.onClose}
    >
      <ModalOverlay
        bg="none"
        backdropBrightness={10}
        backdropFilter="auto"
        backdropBlur="3px"
      />
      <ModalContent maxW="480px" maxH="230px">
        <ModalHeader fontWeight={"extrabold"} fontSize={"xl"} mt={5}>
          New Collection
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={0}>
          <Text>Please enter the new name for the collection:</Text>
          <Input
            value={newCollectionInput}
            onChange={(e) => setNewCollectionInput(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <HStack width={"full"} justifyContent={"space-around"}>
            <Button
              w="210px"
              h="48px"
              onClick={() => {
                setNewCollectionInput("");
                newCollectionModalDisclosure.onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              w="210px"
              h="48px"
              colorScheme="purple"
              onClick={() => {
                newCollectionModalDisclosure.onClose();
                newCollectionMutation({
                  variables: {
                    jsonInput: JSON.stringify({
                      name: newCollectionInput,
                    }),
                  },
                });
                setNewCollectionInput("");
              }}
            >
              New
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewCollectionModal;
