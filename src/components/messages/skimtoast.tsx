import React, { useEffect } from "react";
import { Box, Button, Slide, Text, Flex } from "@chakra-ui/react";
import { MessageContext } from "@/App";
import { Message, MessageType } from "@/interfaces/message";

const SkimToast = () => {
  const message = React.useContext(MessageContext) as Message;
  useEffect(() => {
    if (message.isShow) {
      setTimeout(() => {
        message.setIsShow(false);
      }, message.timeout);
    } else {
      message.setTimeout(0);
    }
  }, [message.isShow]);
  return (
    <Box position="fixed" bottom="0" right="0" m="4" zIndex={1000} >
      {message.isShow && (
        <Slide direction="bottom" in={message.isShow}>
          <Box
            p="4"
            bg="white"
            boxShadow="md"
            rounded="md"
            position="absolute"
            bottom="0"
            width={359}
            right="0"
            m="4"
            borderColor={"red"}
          >
            <Flex direction="column" align="start" justify="start" gap="4">
              {message.type === MessageType.ERROR ? (
                <ErrorSVG />
              ) : message.type === MessageType.SUCCESS ? (
                <SuccessSVG />
              ) : message.type === MessageType.WARNING ? (
                <WarningSVG />
              ) : message.type === MessageType.INFO ? (
                <InfoSVG />
              ) : null}
              <Flex direction="column" align="start" justify="start" gap="4">
                <Text color="#101828" fontSize="14px" fontWeight="700">
                  {message.title}
                </Text>
                <Text color="#475467" fontSize="14px" fontWeight="400">
                  {message.message}
                </Text>
                <Flex direction="row" align="center" justify="start" gap="3">
                  {message.hasButton && (
                    <Button
                      onClick={message.onButtonClick}
                      colorScheme="primary"
                    >
                      {message.buttonLabel}
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Box position="absolute" top="1" right="1"></Box>
            </Flex>
          </Box>
        </Slide>
      )}
    </Box>
  );
};

export default SkimToast;

const SuccessSVG = () => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <rect
          x="6"
          y="6"
          width="26"
          height="26"
          rx="13"
          stroke="#079455"
          stroke-width="2"
        />
      </g>
      <g opacity="0.1">
        <rect
          x="1"
          y="1"
          width="36"
          height="36"
          rx="18"
          stroke="#079455"
          stroke-width="2"
        />
      </g>
      <g clip-path="url(#clip0_1385_18782)">
        <path
          d="M15.2493 19L17.7493 21.5L22.7493 16.5M27.3327 19C27.3327 23.6024 23.6017 27.3333 18.9993 27.3333C14.397 27.3333 10.666 23.6024 10.666 19C10.666 14.3976 14.397 10.6667 18.9993 10.6667C23.6017 10.6667 27.3327 14.3976 27.3327 19Z"
          stroke="#079455"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1385_18782">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(9 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const ErrorSVG = () => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <rect
          x="6"
          y="6"
          width="26"
          height="26"
          rx="13"
          stroke="#D92D20"
          stroke-width="2"
        />
      </g>
      <g opacity="0.1">
        <rect
          x="1"
          y="1"
          width="36"
          height="36"
          rx="18"
          stroke="#D92D20"
          stroke-width="2"
        />
      </g>
      <g clip-path="url(#clip0_1385_18820)">
        <path
          d="M18.9993 15.6667V19M18.9993 22.3334H19.0077M27.3327 19C27.3327 23.6024 23.6017 27.3334 18.9993 27.3334C14.397 27.3334 10.666 23.6024 10.666 19C10.666 14.3976 14.397 10.6667 18.9993 10.6667C23.6017 10.6667 27.3327 14.3976 27.3327 19Z"
          stroke="#D92D20"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1385_18820">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(9 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const WarningSVG = () => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <rect
          x="6"
          y="6"
          width="26"
          height="26"
          rx="13"
          stroke="#DC6803"
          stroke-width="2"
        />
      </g>
      <g opacity="0.1">
        <rect
          x="1"
          y="1"
          width="36"
          height="36"
          rx="18"
          stroke="#DC6803"
          stroke-width="2"
        />
      </g>
      <g clip-path="url(#clip0_1385_18807)">
        <path
          d="M18.9993 15.6667V19M18.9993 22.3333H19.0077M27.3327 19C27.3327 23.6024 23.6017 27.3333 18.9993 27.3333C14.397 27.3333 10.666 23.6024 10.666 19C10.666 14.3976 14.397 10.6667 18.9993 10.6667C23.6017 10.6667 27.3327 14.3976 27.3327 19Z"
          stroke="#DC6803"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1385_18807">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(9 9)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const InfoSVG = () => {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_942_5720)">
        <g opacity="0.3">
          <path d="M32 19C32 11.8203 26.1797 6 19 6C11.8203 6 6 11.8203 6 19C6 26.1797 11.8203 32 19 32C26.1797 32 32 26.1797 32 19Z" stroke="#5800E9" stroke-width="2" />
        </g>
        <g opacity="0.1">
          <path d="M37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 28.9411 9.05887 37 19 37C28.9411 37 37 28.9411 37 19Z" stroke="#5700E6" stroke-width="2" />
        </g>
        <mask id="mask0_942_5720" maskUnits="userSpaceOnUse" x="9" y="9" width="20" height="20">
          <path d="M29 9H9V29H29V9Z" fill="white" />
        </mask>
        <g mask="url(#mask0_942_5720)">
          <path d="M15.2493 19.0003L17.7493 21.5003L22.7493 16.5003M27.3327 19.0003C27.3327 23.6027 23.6017 27.3336 18.9993 27.3336C14.397 27.3336 10.666 23.6027 10.666 19.0003C10.666 14.3979 14.397 10.667 18.9993 10.667C23.6017 10.667 27.3327 14.3979 27.3327 19.0003Z" stroke="#8B5CF6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_942_5720">
          <rect width="38" height="38" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
};
