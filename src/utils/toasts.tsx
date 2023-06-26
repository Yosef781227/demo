import warning from "@assets/warning.svg";
import { VStack, Image, Text, Box, UseToastOptions } from "@chakra-ui/react";
export let warningToastContent: UseToastOptions = {
  position: "bottom-right",
  duration: 100000,
  render: () => (
    <Box
      h={"200px"}
      w={"500px"}
      bg={"white"}
      borderRadius={"12px"}
      stroke={"red"}
    >
      <VStack align={"start"} mb={"10px"}>
        <Image src={warning} alt="Icon" ml={"10px"} mt={"10px"} />
        <Text
          fontSize={"lg"}
          fontWeight={"bold"}
          fontFamily={"body"}
          ml={"20px"}
          mt={"10px"}
        >
          We are saving posts from @ beyond_lore
        </Text>
        <Text
          fontSize={"sm"}
          fontWeight={"medium"}
          fontFamily={"body"}
          ml={"20px"}
        >
          We will send you an email when all your posts <br /> have been saved.
        </Text>
      </VStack>
    </Box>
  ),
};
