import client from "@/client";
import { User } from "@/interfaces/user.interface";
import { gql } from "@apollo/client";
import { Box, Text, Button, Input, ModalFooter } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import React from "react";

function NewModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => any;
  user: User;
}) {
  const toast = useToast();
  const ref = React.useRef<HTMLInputElement>(null);
  const handleSaveNewContent = async (url: string) => {
    const tiktok_regex = /^https?:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+$/;
    const insta_regex = /^https:\/\/www\.instagram\.com\/(stories\/[^\/]+\/\d+\/?|p\/[^\/]+\/?)$/;
    if (!tiktok_regex.test(url) && !insta_regex.test(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid TikTok or Instagram URL",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (tiktok_regex.test(url)) {
      if (!user.hasTiktok) {
        toast({
          title: "You don't have a TikTok account linked",
          description: "Please connect your TikTok account first",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      } else {
        client.query({
          query: gql`
            query SaveTikTokVideoWithUrl($jsonInput: String!) {
              saveTikTokVideoWithUrl(json_input: $jsonInput) {
                success
                message
                url
                thumbnail
              }
            }
          `,
          variables: {
            jsonInput: JSON.stringify({
              url: url,
              tiktok_id: user.tiktokId,
            }),
          },
        }).then((res) => {
          if (res.data.saveTikTokVideoWithUrl.success) {
            toast({
              title: "Saved!",
              description: "Your TikTok has been saved",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            onClose();
          } else {
            toast({
              title: "Error",
              description: res.data.saveTikTokVideoWithUrl.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }).catch((err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });

      }
    } else {
      if (!user.hasInstagram) {
        toast({
          title: "You don't have an Instagram account linked",
          description: "Please connect your Instagram account first",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      client.query({
        query: gql`
          query SaveInstagramContentWithUrl($jsonInput: String!) {
            saveInstagramContentWithUrl(json_input: $jsonInput) {
              success
              message
              contents {
                url
                display_url
                is_video
              }
            }
          }
        `,
        variables: {
          jsonInput: JSON.stringify({
            url: url,
            instagram_id: user.instagramId,
          }),
        },
      }).then((res) => {
        if (res.data.saveInstagramContentWithUrl.success) {
          toast({
            title: "Saved!",
            description: "Your Instagram content has been saved",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        } else {
          toast({
            title: "Error",
            description: res.data.saveInstagramContentWithUrl.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      ).catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    }
  };
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
            ref={ref}
          />
          <Text fontSize={"sm"} ml={9} mt={2} textColor={"gray.500"}>
            Past a tik tok or instagram Link
          </Text>
        </ModalBody>

        <ModalFooter mb={10}>
          <Button variant="ghost" mr={3}>
            Go Back
          </Button>
          <Button colorScheme="primary" onClick={(e) => handleSaveNewContent(ref.current?.value as string)}>Save Post</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewModal;
