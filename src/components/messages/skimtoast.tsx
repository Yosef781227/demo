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
    <Box position="fixed" bottom="0" right="0" m="4" zIndex={1000}>
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
          >
            <Flex direction="column" align="start" justify="start" gap="4">
              {message.type === MessageType.ERROR ? (
                <ErrorSVG />
              ) : message.type === MessageType.SUCCESS ? (
                <SuccessSVG />
              ) : message.type === MessageType.WARNING ? (
                <WarningSVG />
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
