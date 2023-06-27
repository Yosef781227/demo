import { Box, Text, Button, Input, ModalFooter } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function NewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => any;
}) {
  return (
    <Modal isOpen={isOpen} isCentered={false} size={"md"} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        containerProps={{
          justifyContent: "flex-end",
        }}
        sx={{
          "&:first-child": {
            margin: 0,
            height: "100vh",
            overflowY: "scroll",
          },
        }}
      >
        <ModalCloseButton size={"lg"} mt={4} mr={4} color={"gray.500"} />

        <ModalBody mt={20} ml={2}>
          <Text fontWeight={"bold"} ml={6} fontSize={"2xl"}>
            Save New Content
          </Text>
          <Box mt={2} ml={6}>
            Sometimes Social Profiles forget to @mention your brand, but it's
            all good. Copy and paste a link to the UGC here; we'll add it to
            your asset library with all the usual details.
          </Box>
          <Text mt={35} ml={6}>
            Link
          </Text>
          <Input
            ml={8}
            mt={3}
            width={"330px"}
            height={"40px"}
            placeholder="https://"
          />
          <Text fontSize={"sm"} ml={9} mt={2} textColor={"gray.500"}>
            Past a tik tok or instagram Link
          </Text>
        </ModalBody>

        <ModalFooter mb={10}>
          <Button variant="ghost" mr={3}>
            Go Back
          </Button>
          <Button colorScheme="primary">Save Post</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewModal;
