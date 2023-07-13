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
  PlayCircle,
} from "@phosphor-icons/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { CreateUserCollection, GetUserCollection } from "@/query/user";
import { useMutation, useQuery } from "@apollo/client";
import { AddVideoToCollection } from "@/query/tiktok";
const TiktokCard = ({
  video,
  cardCheckboxSelected,
  setCardCheckBoxSelected,
}: {
  video: any;
  cardCheckboxSelected: any[];
  setCardCheckBoxSelected: Dispatch<SetStateAction<any[]>>;
}) => {
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [textSearch, setTextSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([]);
  const {
    data: collectionData,
    loading: loadingCollection,
    error: errorCollection,
    refetch,
  } = useQuery(GetUserCollection);
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
    },
  ] = useMutation(AddVideoToCollection);
  useEffect(() => {
    if (collectionData) {
      setCollections(collectionData.me.collections);
    }
  }, [collectionData]);
  function handleChange(e: SyntheticEvent<HTMLInputElement>) {
    setTextSearch(e.currentTarget.value);
    setCollections(
      collectionData.me.collections.filter((item: any) => {
        return item.name.includes(e.currentTarget.value);
      })
    );
  }
  function handleAddTo() {
    selectedCheckboxes.forEach((item) => {
      addVideoToCollection({
        variables: {
          jsonInput: JSON.stringify({
            collectionId: item.id,
            videoId: video.id,
          }),
        },
      });
    });
  }
  if (createCollectionData) {
    refetch();
  }
  if (loadingCollection || createCollectionLoading) {
    return null;
  }

  return (
    <VStack
      role="group"
      mt={"20px"}
      height={"auto"}
      overflow={"hidden"}
      // minW={"18vw"}
      // maxW={"max-content"}
      display={"inline-block"}
      border={"1px solid #EDEDED"}
      backgroundColor={"white"}
      rounded={"xl"}
      boxShadow={"0px 8px 8px -4px rgba(16, 24, 40, 0.03);"}
    >
      <HStack px={4} pt={4} justify={"space-between"}>
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
            <IconButton
              position={"absolute"}
              top={"50%"}
              size={"lg"}
              left={"50%"}
              onClick={() => setShowVideo(true)}
              aria-label="start video"
              shadow={"2xl"}
              icon={<PlayCircle size={50} />}
            />
            <Image src={video.display_url} />
          </>
        )}

        <Checkbox
          position="absolute"
          top="5"
          left="5"
          size="lg"
          ref={checkBoxRef}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setCardCheckBoxSelected([
                ...cardCheckboxSelected,
                { data: video, checkBoxRef },
              ]);
            } else {
              setCardCheckBoxSelected(
                cardCheckboxSelected.filter((item) => item.data.id !== video.id)
              );
            }
          }}
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

          <Menu
            onClose={() => {
              setCollections(collectionData.me.collections);
            }}
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
                    isDisabled={!Boolean(selectedCheckboxes.length)}
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
                      setCollections(collectionData.me.collections);
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
              {/* <MenuItem>
                <HStack>
                  <Checkbox />
                  <Text>Select all</Text>
                </HStack>
              </MenuItem> */}
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
