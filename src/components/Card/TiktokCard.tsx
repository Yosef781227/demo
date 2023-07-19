import {
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Image,
  IconButton,
} from "@chakra-ui/react";
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
import {
  ChangeEvent,
  SyntheticEvent,
  useRef,
  useState,
  useContext,
} from "react";
import { CreateUserCollection } from "@/query/user";
import { useMutation } from "@apollo/client";
import { AddVideoToCollection } from "@/query/tiktok";
import { handleDownload } from "@/utils";
import { shortenNumber, timeAgo } from "@/utils/data-modifier";
import { MessageContext, UserContext } from "@/App";
import { User } from "@/interfaces/user.interface";
import { Message, MessageType } from "@/interfaces/message";
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
const TiktokCard = ({
  page,
  video,
  cardCheckboxSelected,
  setCardCheckBoxSelected,
  deleteInstagramContents,
  RemoveFromCollection,
}: {
  page: string;
  video: any;
  cardCheckboxSelected: cardCheckboxSelected;
  setCardCheckBoxSelected: (data: any) => void;
  deleteInstagramContents:
  | ((data: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  }) => void)
  | null;
  RemoveFromCollection:
  | (({
    contentId,
    type,
  }: {
    contentId: string;
    type: "post" | "reel" | "story" | "video";
  }) => Promise<void>)
  | null;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([]);
  const User = useContext(UserContext) as User;
  const [
    createCollection,
    {
      data: createCollectionData,
      loading: createCollectionLoading,
      error: createCollectionError,
    },
  ] = useMutation(CreateUserCollection);
  const [
    addVideoToCollection,
    {
      data: addVideoToCollectionData,
      loading: addVideoToCollectionLoading,
      error: addVideoToCollectionError,
      reset,
    },
  ] = useMutation(AddVideoToCollection);
  const messageToast = useContext(MessageContext) as Message;
  function handleChange(e: SyntheticEvent<HTMLInputElement>) {
    setTextSearch(e.currentTarget.value);
    setCollections(
      User.collections.filter((item: any) => {
        return item.name.includes(e.currentTarget.value);
      })
    );
  }
  function handleAddTo() {
    selectedCheckboxes.forEach((item) => {
      addVideoToCollection({
        variables: {
          jsonInput: JSON.stringify({
            collectionId: item.id, //TODO: ABSOLUTE TRASH
            videoId: video.id,
          }),
        },
      });
    });
    setIsMenuOpen(false);
  }
  if (addVideoToCollectionData) {
    messageToast.setType(MessageType.SUCCESS);
    messageToast.setMessage("Content added to collection successfully");
    messageToast.setTimeout(3000);
    messageToast.setTitle("Success");
    messageToast.setIsShow(true);
    reset();
    // messageToast.setButtonLabel("View Collection");
    // messageToast.setOnButtonClick((data: any) => {
    //   alert("View Collection")
    // })
    // messageToast.setHasButton(true);
  } else if (addVideoToCollectionError) {
    messageToast.setType(MessageType.ERROR);
    // messageToast.setMessage(message as string); //TODO : SHOW ERROR MESSAGE
    messageToast.setTimeout(3000);
    messageToast.setTitle("Error");
    // messageToast.setIsShow(true);
    // messageToast.buttonLabel = "View Collection";
  }

  return (
    <VStack
      role="group"
      mt={"20px"}
      height={"auto"}
      overflow={"hidden"}
      display={"inline-block"}
      border={"1px solid #EDEDED"}
      backgroundColor={"white"}
      rounded={"xl"}
      boxShadow={"0px 8px 8px -4px rgba(16, 24, 40, 0.03);"}
    >
      <HStack px={4} pt={4} justify={"space-between"}>
        <HStack pb={2}>
          <Avatar
            name={video.owner.nickname}
            src={video.owner?.profileUrl}
          ></Avatar>
          <VStack align={"start"}>
            <Text lineHeight={0.8}>{video.owner.nickname} </Text>
            <Text lineHeight={0.8}>
              {shortenNumber(video.owner.followerCount)} followers
            </Text>
          </VStack>
        </HStack>
        <img width={"20"} src={tiktok} alt="social media icon" />
      </HStack>

      <Box position="relative">
        {showVideo ? (
          <video
            width={"100%"}
            style={{ objectFit: "contain" }}
            controls={true}
            autoPlay={true}
            src={
              video.url.includes("https://")
                ? video.url
                : "https://" + video.url
            }
          />
        ) : (
          <>
            <Box
              position={"absolute"}
              top={"calc(50% - 25px)"}
              left={"calc(50% - 25px)"}
              onClick={() => setShowVideo(true)}
              aria-label="start video"
              cursor={"pointer"}
            >
              <svg
                width="47"
                height="44"
                viewBox="0 0 47 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="47" height="44" rx="22" fill="#8B5CF6" />
                <path
                  d="M30.6812 21.1597C31.3227 21.5436 31.3316 22.4701 30.6974 22.8661L20.9225 28.9705C20.2601 29.3842 19.4003 28.9128 19.3929 28.1319L19.2781 16.1107C19.2707 15.3297 20.1213 14.842 20.7915 15.243L30.6812 21.1597Z"
                  fill="white"
                />
              </svg>
            </Box>
            <Image src={video.display_url} />
          </>
        )}

        <Checkbox
          position="absolute"
          top="5"
          left="5"
          size="lg"
          ref={checkBoxRef}
          isChecked={cardCheckboxSelected.ids.videos.includes(video.id)}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setCardCheckBoxSelected((prev: cardCheckboxSelected) => {
                let ids = prev.ids;
                let urls = prev.urls;
                return {
                  ids: {
                    posts: ids.posts,
                    reels: ids.reels,
                    stories: ids.stories,
                    videos: [...ids.videos, video.id],
                  },
                  urls: {
                    posts: urls.posts,
                    reels: urls.reels,
                    stories: urls.stories,
                    videos: [...urls.videos, video.url],
                  },
                };
              });
            } else {
              setCardCheckBoxSelected((prev: cardCheckboxSelected) => {
                let ids = prev.ids;
                let urls = prev.urls;
                return {
                  ids: {
                    posts: ids.posts,
                    reels: ids.reels,
                    stories: ids.stories,
                    videos: ids.videos.filter(
                      (item: string) => item !== video.id
                    ),
                  },
                  urls: {
                    posts: urls.posts,
                    reels: urls.reels,
                    stories: urls.stories,
                    videos: urls.videos.filter(
                      (item: string) => item !== video.url
                    ),
                  },
                };
              });
            }
          }}
        />

        <HStack position="absolute" top="5" right="5">
          <IconButton
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            onClick={() => {
              handleDownload(video.url);
            }}
            aria-label="download"
            icon={<DownloadSimple size={30} color="white" weight="bold" />}
          />

          <Menu
            onClose={() => {
              setIsMenuOpen(false);
              setCollections([]);
            }}
            // in
            onOpen={() => {
              setCollections(User.collections);
              setIsMenuOpen(true);
            }}
            isOpen={isMenuOpen}
            closeOnSelect={false}
          >
            <MenuButton
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <BookmarkSimple size={30} color="white" weight="bold" />
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
                    colorScheme={!!collections.length ? "gray" : "primary"}
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
                      setIsMenuOpen(false);
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
        </HStack>
      </Box>

      <HStack px={4} justify={"space-between"} h={"50px"}>
        <Text>
          {+video.timestamp === 0
            ? "Unknown Time"
            : timeAgo(new Date(+video.timestamp * 1000))}
        </Text>
        <Menu direction="rtl">
          <MenuButton>
            <DotsThreeOutline size={24} color="black" weight="fill" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <a
                href={
                  video.url.includes("https://")
                    ? video.url
                    : "https://" + video.url
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </MenuItem>
            {video.link && (
              <MenuItem>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  Open the original post
                </a>
              </MenuItem>
            )}
            {video.link && (
              <MenuItem
                onClick={(e) => {
                  navigator.clipboard.writeText(video.link);
                  messageToast.setType(MessageType.SUCCESS);
                  messageToast.setMessage("Public Url copied successfully");
                  messageToast.setTimeout(3000);
                  messageToast.setTitle("Success");
                  messageToast.setIsShow(true);
                }}
              >
                Get public link
              </MenuItem>
            )}
            <MenuItem>Mute Content from @somthing</MenuItem>
            <MenuItem
              color={"red"}
              onClick={(e) => {
                if (page === "COLLECTION" && RemoveFromCollection) {
                  RemoveFromCollection({ type: "video", contentId: video.id });
                } else if (
                  (page === "CONTENT" || page === "FILTER") &&
                  deleteInstagramContents
                ) {
                  deleteInstagramContents({
                    posts: [],
                    reels: [],
                    stories: [],
                    videos: [video.id],
                  });
                }
              }}
            >
              {(page === "COLLECTION" && "Remove from collection") ||
                (page === "CONTENT" && "Delete from Library")}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
};

export default TiktokCard;
