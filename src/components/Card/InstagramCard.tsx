import instagram from "@/assets/icons/social/instagram.svg";
import LazyLoad from "react-lazyload";
import {
  VStack,
  HStack,
  Avatar,
  Text,
  Image,
  IconButton,
  Button,
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
import play from "@assets/images/play.ico"
import { Dispatch, SetStateAction, useRef, useState, SyntheticEvent, ChangeEvent, useEffect, useContext } from "react";
import { CreateUserCollection, GetUserCollection } from "@/query/user";
import { useMutation, useQuery } from "@apollo/client";
import { InstagramCollectionMutation } from "@/query/instagram";
import { handleDownload } from "@/utils";
import { shortenNumber, timeAgo } from "@/utils/data-modifier";
import client from "@/client";
import { UserContext } from "@/App";
import { User } from "@/interfaces/user.interface";

type cardCheckboxSelected = {
  ids: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  };
  urls: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  };
};
function InstagramCard({
  data,
  page,
  cardCheckboxSelected,
  setCardCheckBoxSelected,
  deleteInstagramContents,
  RemoveFromCollection,
}: {
  data: any;
  page: string;
  cardCheckboxSelected: cardCheckboxSelected;
  setCardCheckBoxSelected: (data: any) => void;
  deleteInstagramContents: ((data: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  }) => void) | null;
  RemoveFromCollection: (({ contentId, type }: { contentId: string; type: "post" | "reel" | "story" | "video"; }) => Promise<void>) | null;
}) {
  const User = useContext(UserContext) as User;
  const [showVideo, setShowVideo] = useState(false);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([]);

  const [
    createCollection,
    {
      data: createCollectionData,
      loading: createCollectionLoading,
      error: createCollectionError,
    },
  ] = useMutation(CreateUserCollection);

  useEffect(() => {
    if (createCollectionData?.createCollection) {
      User.setCollections((prev: any) => [...prev, {
        id: createCollectionData?.createCollection?.data?.id,
        name: createCollectionData?.createCollection?.data?.name,
      }])
      console.log(User.collections, User.collections)
    }
  }, [createCollectionData])

  function handleChange(e: SyntheticEvent<HTMLInputElement>) {
    setTextSearch(e.currentTarget.value);
    setCollections(
      User.collections.filter((item: any) => {
        return item.name.includes(e.currentTarget.value);
      })
    );
  }
  const handleAddTo = async () => {
    for (const item of selectedCheckboxes) {
      let variables: any = {
        collectionId: item.id,
      };
      data.type === "post" && (variables.postId = data.id);
      data.type === "reel" && (variables.reelId = data.id);
      data.type === "story" && (variables.storyId = data.id);
      const response = await client.mutate({
        mutation: data.type === "post" ? InstagramCollectionMutation.addPostToCollection : data.type === "reel" ? InstagramCollectionMutation.addReelToCollection : InstagramCollectionMutation.addStoryToCollection,
        variables: {
          jsonInput: JSON.stringify(variables),
        },
      });
      const { success, message, data: resData } = response.data[data.type === "post" ? "addPostToCollection" : data.type === "reel" ? "addReelToCollection" : "addStoryToCollection"];
      if (success) {

      } else {

      }
    }
  }

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
            <Text lineHeight={0.8}>{shortenNumber(data.owner_followers)} followers</Text>
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
              <Box
                position={"absolute"}
                top={"calc(50% - 25px)"}
                left={"calc(50% - 25px)"}
                onClick={() => setShowVideo(true)}
                aria-label="start video">

                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.666992" width="32" height="32" rx="16" fill="#8B5CF6" />
                  <path d="M24.001 16C24.0014 16.1698 23.9579 16.3368 23.8746 16.4847C23.7914 16.6327 23.6713 16.7566 23.526 16.8444L14.521 22.3531C14.3692 22.4461 14.1953 22.4969 14.0173 22.5001C13.8393 22.5034 13.6636 22.4592 13.5085 22.3719C13.3548 22.286 13.2268 22.1606 13.1376 22.0088C13.0484 21.857 13.0012 21.6842 13.001 21.5081V10.4919C13.0012 10.3158 13.0484 10.143 13.1376 9.99118C13.2268 9.83937 13.3548 9.71406 13.5085 9.62813C13.6636 9.54085 13.8393 9.49657 14.0173 9.49987C14.1953 9.50316 14.3692 9.55391 14.521 9.64688L23.526 15.1556C23.6713 15.2434 23.7914 15.3673 23.8746 15.5153C23.9579 15.6633 24.0014 15.8302 24.001 16Z" fill="white" />
                </svg>
              </Box>
              {/* <Button
                position={"absolute"}
                top={"calc(50% - 25px)"}
                size={"lg"}
                left={"calc(50% - 25px)"}
                onClick={() => setShowVideo(true)}
                aria-label="start video"
                shadow={"2xl"}
                borderRadius={"full"}
                width={"max-content"}
                height={"max-content"}
                colorScheme='teal' variant='outline'
              >
                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.666992" width="32" height="32" rx="16" fill="#8B5CF6" />
                  <path d="M24.001 16C24.0014 16.1698 23.9579 16.3368 23.8746 16.4847C23.7914 16.6327 23.6713 16.7566 23.526 16.8444L14.521 22.3531C14.3692 22.4461 14.1953 22.4969 14.0173 22.5001C13.8393 22.5034 13.6636 22.4592 13.5085 22.3719C13.3548 22.286 13.2268 22.1606 13.1376 22.0088C13.0484 21.857 13.0012 21.6842 13.001 21.5081V10.4919C13.0012 10.3158 13.0484 10.143 13.1376 9.99118C13.2268 9.83937 13.3548 9.71406 13.5085 9.62813C13.6636 9.54085 13.8393 9.49657 14.0173 9.49987C14.1953 9.50316 14.3692 9.55391 14.521 9.64688L23.526 15.1556C23.6713 15.2434 23.7914 15.3673 23.8746 15.5153C23.9579 15.6633 24.0014 15.8302 24.001 16Z" fill="white" />
                </svg>

              </Button> */}
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
              setCardCheckBoxSelected((prev: cardCheckboxSelected) => {
                let ids = { ...prev.ids };
                let urls = { ...prev.urls };
                data.type === "post" &&
                  ids.posts.push(data.id) &&
                  urls.posts.push(data.ig_content.url);
                data.type === "reel" &&
                  ids.reels.push(data.id) &&
                  urls.reels.push(data.ig_content.url);
                data.type === "story" &&
                  ids.stories.push(data.id) &&
                  urls.stories.push(data.ig_content.url);
                return {
                  ids,
                  urls,
                };
              });
            } else {
              setCardCheckBoxSelected((prev: cardCheckboxSelected) => {
                let { ids, urls } = prev;
                data.type === "post" &&
                  ids.posts.splice(ids.posts.indexOf(data.id), 1) &&
                  urls.posts.splice(urls.posts.indexOf(data.ig_content.url), 1);
                data.type === "reel" &&
                  ids.reels.splice(ids.reels.indexOf(data.id), 1) &&
                  urls.reels.splice(urls.reels.indexOf(data.ig_content.url), 1);
                data.type === "story" &&
                  ids.stories.splice(ids.stories.indexOf(data.id), 1) &&
                  urls.stories.splice(
                    urls.stories.indexOf(data.ig_content.url),
                    1
                  );
                return {
                  ids,
                  urls,
                };
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
          <IconButton
            onClick={(e) => {
              handleDownload(data.ig_content.url);
            }}
            aria-label="download"
            icon={<DownloadSimple size={30} color="white" weight="duotone" />}
          />
          <Menu
            onClose={() => { setCollections([]) }}
            onOpen={() => { setCollections(User.collections) }}
            closeOnSelect={false}
          >
            <MenuButton>
              <BookmarkSimple size={30} color="white" weight="fill" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Input
                  value={textSearch}
                  onChange={handleChange}
                  placeholder="Search or Create collection"
                  onClick={(e) => e.stopPropagation()}
                />
              </MenuItem>
              <MenuItem
                _hover={{
                  backgroundColor: "white",
                }}
              >
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <Button
                    isDisabled={
                      !Boolean(selectedCheckboxes.length) || !collections.length
                    }
                    display={"flex"}
                    onClick={handleAddTo}
                  >
                    <Plus size={24} color="#121212" weight="fill" />
                    <Text>Add to</Text>
                  </Button>
                  <Button
                    isDisabled={!!collections.length}
                    onClick={() => {
                      setTextSearch("");
                      setCollections(User.collections);
                      createCollection({
                        variables: {
                          jsonInput: JSON.stringify({
                            name: textSearch,
                          }),
                        },
                      });
                    }}
                  >
                    Create
                  </Button>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Checkbox />
                  <Text>Select all</Text>
                </HStack>
              </MenuItem>
              {collections.map((collection: any) => {
                return (
                  <MenuItem key={collection.id}>
                    <HStack>
                      <Checkbox
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.currentTarget.checked) {
                            setSelectedCheckboxes([
                              ...selectedCheckboxes,
                              collection,
                            ]);
                          } else {
                            setSelectedCheckboxes(
                              selectedCheckboxes.filter(
                                (selectedCheckBox) =>
                                  selectedCheckBox.id !== collection.id
                              )
                            );
                          }
                        }}
                      />

                      <Text>{collection.name}</Text>
                    </HStack>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          {/* <Menu closeOnSelect={false} autoSelect={false}>
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
          </Menu> */}
        </HStack>
      </Box>

      <HStack pb={5} px={5} justify={"space-between"}>
        <Text>{+data.ig_content.taken_at === 0 ? "Unknown Time" : timeAgo(new Date(+data.ig_content.taken_at * 1000))}</Text>
        <Menu placement="bottom-end">
          <MenuButton>
            <DotsThreeOutline size={24} color="black" weight="fill" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <a
                href={
                  data.ig_content.url.includes("https://")
                    ? data.ig_content.url
                    : "https://" + data.ig_content.url
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </MenuItem>
            {data.link && (
              <MenuItem>
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  Open the original post
                </a>
              </MenuItem>
            )}
            {data.link && (
              <MenuItem
                onClick={(e) => navigator.clipboard.writeText(data.link)}
              >
                Get public link
              </MenuItem>
            )}
            <MenuItem>Mute Content from @somthing</MenuItem>
            <MenuItem
              color={"red"}
              onClick={(e) => {
                if (page === "COLLECTION" && RemoveFromCollection) {
                  RemoveFromCollection({
                    contentId: data.id,
                    type: data.type,
                  })
                } else if ((page === "CONTENT" || page === "FILTER") && deleteInstagramContents) {
                  deleteInstagramContents({
                    posts: data.type === "post" ? [data.id] : [],
                    reels: data.type === "reel" ? [data.id] : [],
                    stories: data.type === "story" ? [data.id] : [],
                    videos: [],
                  })
                }
              }
              }
            >
              {page === "COLLECTION" && "Remove from collection" ||
                page === "CONTENT" && "Delete from Library"
              }
            </MenuItem>
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
