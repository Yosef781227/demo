import instagram from "@/assets/icons/social/instagram.svg";
import LazyLoad from "react-lazyload";
import {
  VStack,
  HStack,
  Avatar,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
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
  PlayCircle,
} from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

function InstagramCard({
  data,
  cardCheckboxSelected,
  setCardCheckBoxSelected,
  deleteInstagramContents,
}: {
  data: any;
  cardCheckboxSelected: { posts: string[], reels: string[], stories: string[], videos: string[] };
  setCardCheckBoxSelected: (data: any) => void;
  deleteInstagramContents: (data: { posts: string[], reels: string[], stories: string[], videos: string[] }) => void;
}) {
  const [showVideo, setShowVideo] = useState(false);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  return (
    <VStack
      role="group"
      mt={"20px"}
      overflow={"hidden"}
      minW={"17vw"}
      maxW={"max-content"}
      display={"inline-block"}
      border={"1px  solid #EDEDED"}
      backgroundColor={"white"}
      rounded={"xl"}
      boxShadow={"0px 8px 8px -4px rgba(16, 24, 40, 0.03);"}
    >
      <HStack px={4} mt={2} py={2} flex="1" justify={"space-between"}>
        <HStack>
          <Avatar
            name={data.owner_full_name}
            src={data.owner_profile_pic_url}
          ></Avatar>
          <VStack align={"start"}>
            <Text lineHeight={0.8}>{data.owner_full_name} </Text>
            <Text lineHeight={0.8}>{data.owner_followers} followers</Text>
          </VStack>
        </HStack>
        <img width={"20"} src={instagram} alt="social media icon" />
      </HStack>

      <Box position="relative">
        {data?.ig_content?.is_video ? (
          showVideo ? (
            getAccess(data)
          ) : (
            <>
              <IconButton
                position={"absolute"}
                top={"calc(50% - 25px)"}
                size={"lg"}
                left={"calc(50% - 25px)"}
                onClick={() => setShowVideo(true)}
                aria-label="start video"
                shadow={"2xl"}
                icon={<PlayCircle size={50} />}
              />
              <Image src={data?.ig_content?.display_url} />
            </>
          )
        ) : (
          getAccess(data)
        )}
        <Checkbox
          position="absolute"
          top="5"
          display="none"
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setCardCheckBoxSelected((prev: { posts: string[], reels: string[], stories: string[], videos: string[] }) => {
                let temp = { ...prev };
                data.type === "post" && temp.posts.push(data.id);
                data.type === "reel" && temp.reels.push(data.id);
                data.type === "story" && temp.stories.push(data.id);
                return temp;
              });
            } else {
              setCardCheckBoxSelected((prev: { posts: string[], reels: string[], stories: string[], videos: string[] }) => {
                let temp = { ...prev };
                data.type === "post" && temp.posts.splice(temp.posts.indexOf(data.id), 1);
                data.type === "reel" && temp.reels.splice(temp.reels.indexOf(data.id), 1);
                data.type === "story" && temp.stories.splice(temp.stories.indexOf(data.id), 1);
                return temp;
              });
            }
          }}
          _checked={{ display: "block" }}
          _groupHover={{ display: "block" }}
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
                <Input
                  placeholder="Top Creator"
                  onClick={(e) => e.stopPropagation()}
                />
              </MenuItem>
              <MenuItem>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <HStack>
                    <Plus size={24} color="#121212" weight="fill" />
                    <Text>Top Create</Text>
                  </HStack>
                  <Text
                    bg="blue.500"
                    color="white"
                    px={4}
                    py={1}
                    borderRadius="md"
                  >
                    Create
                  </Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false} autoSelect={false}>
            <MenuButton>
              <BookmarkSimple size={30} color="white" weight="fill" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Input
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search or Create collection"
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

      <HStack pb={5} px={5} justify={"space-between"}>
        <Text>8 months ago</Text>
        <Menu placement="bottom-end">
          <MenuButton>
            <DotsThreeOutline size={24} color="black" weight="fill" />
          </MenuButton>
          <MenuList>
            <MenuItem><a href={data.ig_content.url.includes("https://") ? data.ig_content.url : "https://" + data.ig_content.url} target="_blank" rel="noopener noreferrer">Download</a></MenuItem>
            {data.link && <MenuItem><a href={data.link} target="_blank" rel="noopener noreferrer">Open the original post</a></MenuItem>}
            {data.link && <MenuItem onClick={e => navigator.clipboard.writeText(data.link)}>Get public link</MenuItem>}
            <MenuItem>Mute Content from @somthing</MenuItem>
            <MenuItem color={"red"} onClick={e => deleteInstagramContents({ posts: data.type === 'post' ? [data.id] : [], reels: data.type === 'reel' ? [data.id] : [], stories: data.type === 'story' ? [data.id] : [], videos: [] })}>Delete from Library</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
}

function getAccess(data: any) {
  return (
    <LazyLoad>
      {data?.ig_content?.is_video ? (
        <video
          width={"100%"}
          style={{ objectFit: "contain" }}
          controls={true}
          src={
            data?.ig_content.url.includes("https://")
              ? data?.ig_content.url
              : "https://" + data?.ig_content.url
          }
        />
      ) : (
        <Image
          width={"100%"}
          objectFit={"contain"}
          src={data?.ig_content?.display_url}
          alt="Loading..."
        />
      )}
    </LazyLoad>
  );
}

function dataAccess(data: any) {
  return data?.ig_contents
    ? data?.ig_contents[0]?.display_url
    : data?.ig_content?.display_url;
}

export default InstagramCard;
