import { handleDownload } from "@/utils";
import { HStack, Button, Text, Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

function BottomCheckBox({
  cardCheckboxSelected,
  setCardCheckBoxSelected,
}: {
  cardCheckboxSelected: any[];
  setCardCheckBoxSelected: Dispatch<SetStateAction<any[]>>;
}) {
  console.log(cardCheckboxSelected);
  const handleMultipleDownload = () => {
    cardCheckboxSelected.forEach((item) => {
      handleDownload(item.data.url as string);
      item.checkBoxRef.current.checked = false;
    });
  };
  if (cardCheckboxSelected.length == 0) {
    return null;
  } else {
    return (
      <Box
        height={"10vh"}
        bgColor={"white"}
        width="100vw"
        position={"fixed"}
        zIndex={"modal"}
        bottom={0}
        borderRadius={"xl"}
        display={"flex"}
        px="10"
        alignItems={"center"}
      >
        <HStack width="full" justifyContent={"space-between"}>
          <Text>{cardCheckboxSelected.length} Selected</Text>
          <HStack>
            <Button onClick={handleMultipleDownload}>Download</Button>
            <Button>Delete</Button>
            <Button>Select all</Button>
          </HStack>
        </HStack>
      </Box>
    );
  }
}

export default BottomCheckBox;
