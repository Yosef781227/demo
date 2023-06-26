import { VStack, HStack, Avatar, Text } from "@chakra-ui/react";
import tiktok from "@/assets/icons/social/tiktok.svg";
import {
  Checkbox,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import {
  DownloadSimple,
  BookmarkSimple,
  DotsThreeOutline,
  Plus,
} from "@phosphor-icons/react";
const TiktokCard = ({ video }: { video: any }) => {
  return (
    <VStack
      mt={"20px"}
      ml={"660px"}
      display={"inline-block"}
      sx={{ breakInside: "avoid", breakAfter: "auto", breakBefore: "auto" }}
      border={"1px solidmt #EDEDED"}
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

      <Box position="relative" maxH="443px" minWidth="350px">
        <video
          width={"100%"}
          style={{ objectFit: "contain" }}
          controls={true}
          src={
            video.url.includes("https://") ? video.url : "https://" + video.url
          }
        />

        <Checkbox
          position="absolute"
          top="5"
          left="5"
          size="lg"
          colorScheme={"purple"}
        />

        <HStack position="absolute" top="5" right="5">
          <Menu closeOnSelect={false}>
            <MenuButton>
              <DownloadSimple size={30} color="white" weight="duotone" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Input placeholder="Top Creator" />
              </MenuItem>
              <MenuItem>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <HStack>
                    <Plus size={24} color="#121212" weight="fill" />
                    <Text>Top Create</Text>
                  </HStack>
                  <Text>Create</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton>
              <BookmarkSimple size={30} color="white" weight="fill" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Input
                  placeholder="Search or Create collection"
                  color={"neutral.50"}
                />
              </MenuItem>
              <MenuItem>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <HStack>
                    <Plus size={24} color="#121212" weight="fill" />
                    <Text>Add to</Text>
                  </HStack>
                  <Text>Create</Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Checkbox />
                  <Text>Select all</Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Checkbox />
                  <Text>Favourite</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>

      <HStack pb={5} justify={"space-between"} h={"50px"}>
        <Text>8 months ago</Text>
        <Menu direction="rtl">
          <MenuButton>
            <DotsThreeOutline size={24} color="black" weight="fill" />
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Open the original post</MenuItem>
            <MenuItem>Get public link</MenuItem>
            <MenuItem>Mute Content from @somthing</MenuItem>
            <MenuItem color={"red"}>Delete from Library</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
};

export default TiktokCard;
