import { handleDownload } from "@/utils";
import { HStack, Button, Text, Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

const MultipleDownload = (cardCheckboxSelected: string[]) => {
  for (let i = 0; i < cardCheckboxSelected.length; i++) {
    let item = cardCheckboxSelected[i].includes("https://") ? cardCheckboxSelected[i] : "https://" + cardCheckboxSelected[i];
    const anchor = document.createElement("a");
    anchor.href = item;
    anchor.target = "_blank";
    anchor.download = item;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
type cardCheckboxSelectedType = {
  ids: { posts: string[], reels: string[], stories: string[], videos: string[] },
  urls: { posts: string[], reels: string[], stories: string[], videos: string[] },
}
function BottomCheckBox({
  deleteCount,
  cardCheckboxSelected,
  setCardCheckBoxSelected,
}: {
  deleteCount: number;
  cardCheckboxSelected: cardCheckboxSelectedType;
  setCardCheckBoxSelected: (data: any) => void;
}) {

  const handleMultipleDownload = () => {
    // for (let i = 0; i < cardCheckboxSelected.length; i++) {
    //   let item = cardCheckboxSelected[i];
    //   item.checkBoxRef.current.checked = !item.checkBoxRef.current.checked;
    //   item.checkBoxRef.current.click();
    //   const anchor = document.createElement("a");
    //   anchor.href = item.data.url;
    //   anchor.download = item.data.url;
    //   anchor.style.display = "none";
    //   document.body.appendChild(anchor);
    //   anchor.click();
    //   document.body.removeChild(anchor);
    // }
    MultipleDownload(cardCheckboxSelected.urls.posts);
    MultipleDownload(cardCheckboxSelected.urls.reels);
    MultipleDownload(cardCheckboxSelected.urls.stories);
    MultipleDownload(cardCheckboxSelected.urls.videos);
    setCardCheckBoxSelected([]);
  };
  console.log(deleteCount);
  if (deleteCount === 0) {
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
          <Text>{deleteCount} Selected</Text>
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
