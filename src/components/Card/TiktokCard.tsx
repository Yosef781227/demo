import { VStack, HStack, Avatar, IconButton, Text } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleDownload } from "../../utils";
import tiktok from "@/assets/icons/social/tiktok.svg";

const TiktokCard = ({ video }: { video: any }) => {
  return (
    <VStack
      display={"inline-block"}
      sx={{ breakInside: "avoid", breakAfter: "auto", breakBefore: "auto" }}
      border={"1px solid #EDEDED"}
      backgroundColor={"white"}
      align={"stretch"}
      my={4}
      rounded={"xl"}
      boxShadow={"0px 8px 8px -4px rgba(16, 24, 40, 0.03);"}
    >
      <HStack px={4} mt={2} py={2} justify={"space-between"}>
        <HStack>
          <Avatar
            name={video.owner.nickname}
            src={video.owner?.profileUrl}
          ></Avatar>
          <VStack align={"start"}>
            <Text lineHeight={0.8}>{video.owner.nickname} </Text>
            <Text lineHeight={0.8}>{video.owner.followerCount} followers</Text>
          </VStack>
        </HStack>
        <img width={"20"} src={tiktok} alt="social media icon" />
      </HStack>
      <video
        width={"100%"}
        style={{ objectFit: "contain" }}
        controls={true}
        src={
          video.url.includes("https://") ? video.url : "https://" + video.url
        }
      />

      <HStack px={5} justify={"space-between"}>
        <Text>8 months ago</Text>
        <IconButton
          aria-label="Download"
          icon={<AiOutlineDownload />}
          variant="ghost"
          size="lg"
          fontWeight={"bold"}
          onClick={() => handleDownload(video.display_url)}
        />
      </HStack>
    </VStack>
  );
};

export default TiktokCard;
