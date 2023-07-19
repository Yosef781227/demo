import client from "@/client";
import { Message, MessageType } from "@/interfaces/message";
import { User } from "@/interfaces/user.interface";
import { gql } from "@apollo/client";
import { Box, Text, Button, Input, ModalFooter } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,

} from "@chakra-ui/react";
import React from "react";

function NewModal({
  isOpen,
  onClose,
  user,
  messageToast,
}: {
  messageToast: Message;
  isOpen: boolean;
  onClose: () => any;
  user: User;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  const handleSaveNewContent = async (url: string) => {
    const tiktok_regex =
      /^https?:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+$/;
    const insta_regex =
      /^https:\/\/www\.instagram\.com\/(stories\/[^\/]+\/\d+\/?|p\/[^\/]+\/?)$/;
    if (!tiktok_regex.test(url) && !insta_regex.test(url)) {
      onClose();
      messageToast.setType(MessageType.ERROR);
      messageToast.setMessage(
        "Please enter a valid TikTok or Instagram URL" as string
      );
      messageToast.setTimeout(3000);
      messageToast.setTitle("Invalid URL");
      messageToast.setIsShow(true);
      return;
    }
    if (tiktok_regex.test(url)) {

      if (!user.hasTiktok) {
        onClose();
        messageToast.setType(MessageType.ERROR);
        messageToast.setMessage(
          "Please connect your TikTok account first" as string
        );
        messageToast.setTimeout(3000);
        messageToast.setTitle("You don't have a TikTok account linked");
        messageToast.setIsShow(true);
        return;
      }

      else {


        client
          .query({
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
          })
          .then((res) => {
            if (res.data.saveTikTokVideoWithUrl.success) {
              onClose();
              messageToast.setType(MessageType.SUCCESS);
              messageToast.setMessage("Content Saved successfully");
              messageToast.setTimeout(3000);
              messageToast.setTitle("Saved");
              messageToast.setIsShow(true);
            } else {
              onClose();
              messageToast.setType(MessageType.ERROR);
              messageToast.setMessage(
                res.data.saveTikTokVideoWithUrl.message as string
              );
              messageToast.setTimeout(3000);
              messageToast.setTitle("Error");
              messageToast.setIsShow(true);
            }
          })
          .catch((err) => {
            onClose();
            messageToast.setType(MessageType.ERROR);
            messageToast.setMessage(err.message as string);
            messageToast.setTimeout(3000);
            messageToast.setTitle("Error");
            messageToast.setIsShow(true);
          });

      }
    } else {
      if (!user.hasInstagram) {
        messageToast.setType(MessageType.ERROR);
        messageToast.setMessage(
          "Please connect your Instagram account first" as string
        );
        messageToast.setTimeout(3000);
        messageToast.setTitle("You don't have an Instagram account linked");
        messageToast.setIsShow(true);
        return;
      }
      client
        .query({
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
        })
        .then((res) => {
          if (res.data.saveInstagramContentWithUrl.success) {
            onClose();
            messageToast.setType(MessageType.SUCCESS);
            messageToast.setMessage("Your Instagram content has been saved");
            messageToast.setTimeout(3000);
            messageToast.setTitle("Saved");
            messageToast.setIsShow(true);
          } else {
            onClose();
            messageToast.setType(MessageType.ERROR);
            messageToast.setMessage(
              res.data.saveInstagramContentWithUrl.message as string
            );
            messageToast.setTimeout(3000);
            messageToast.setTitle("Error");
            messageToast.setIsShow(true);
          }
        })
        .catch((err) => {
          onClose();
          messageToast.setType(MessageType.ERROR);
          messageToast.setMessage(err.message as string);
          messageToast.setTimeout(3000);
          messageToast.setTitle("Error");
          messageToast.setIsShow(true);
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
          <Button variant="ghost" mr={3} onClick={onClose || (() => { })}>
            Go Back
          </Button>

          <Button
            colorScheme="primary"
            onClick={(e) => handleSaveNewContent(ref.current?.value as string)}
          >
            Save Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewModal;
