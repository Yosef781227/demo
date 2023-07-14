//@ts-nocheck
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Checkbox,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  VStack,
  ModalFooter,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import { Dispatch, SetStateAction, useReducer, useState } from "react";
import "react-google-flight-datepicker/dist/main.css";
import { User } from "@/interfaces/user.interface";
import { GetUserCollection } from "@/query/user";
import { set } from "date-fns";
import client from "@/client";
import { FilterContent } from "@/query";
import { gql } from '@apollo/client';
const currentDate = new Date();
const previousMonthDate = new Date(currentDate);
previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

function FilterModal({
  isOpen,
  onClose,
  user,
  changeFiltered,
  setFilterLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  changeFiltered: (data: any) => void;
  setFilterLoading: (data: boolean) => void;
  user: User;
}) {
  const [startDate, setStartDate] = useState<number>(Math.floor(previousMonthDate.getTime() / 1000));
  const [endDate, setEndDate] = useState<number>(Math.floor(currentDate.getTime() / 1000));
  const [type, setPostType] = useState<string[]>(["post", "reel", "story", "video"]);
  const [collection_include, setCollection_include] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [unique_ids, setUnique_ids] = useState<string[]>([]);
  const [usage_right, setUsage_right] = useState<string[]>(["DEFAULT"]);
  const [content_type, setContent_type] = useState<number>(2);
  const [verified, setVerified] = useState<number>(2);

  const onDateChange = (startDate: Date, endDate: Date) => {
    if (startDate !== null && endDate !== null) {
      setStartDate(Math.floor(new Date(startDate).getTime() / 1000));
      setEndDate(Math.floor(new Date(endDate).getTime() / 1000));
    }
  };

  const handleFiter = async () => {
    try {
      onClose();
      setFilterLoading(true);
      const { data } = await client.query({
        query: generateQuery(type),
        variables: {
          filterContentsJsonInput: JSON.stringify({
            usernames,
            unique_ids,
            type,
            start_time: startDate,
            end_time: endDate,
            hashtags: [],
            content_type, // 0 => Image, 1 => Video, 2 => All
            usage_right,
            followers: 2,
            verified, // 1 => Verified, 0 => Not Verified, 2 => All
            collection_include,
            collection_exclude: [],
            likes: 10,
            comments: 20,
            shares: 50,
            views: 50,
            limit: 50,
            offset: 50,
          }),
        },
      });
      setFilterLoading(false);
      //console.log(data.filterContents);
      changeFiltered(data.filterContents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        isCentered={false}
        size={["md", "lg"]}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          containerProps={{
            justifyContent: "flex-end",
          }}
          sx={{
            "&:first-child": {
              margin: 0,
              height: "100vh",
              overflowY: "auto",
            },
          }}
        >
          <ModalHeader fontSize={"xl"} fontWeight={"bold"} mt={6}>
            Filters
          </ModalHeader>
          <ModalCloseButton size={"lg"} color={"gray.500"} mt={2} />

          <Box borderBottom="1px" borderColor="gray.100" width="100%" my={2} />
          <ModalBody mt={5} ml={2}>
            <>
              <Box>
                <Text textColor={"gray.500"}>Post Date</Text>
                <RangeDatePicker
                  startDate={previousMonthDate}
                  endDate={currentDate}
                  onChange={(startDate, endDate) => {
                    onDateChange(startDate, endDate);
                  }}
                  minDate={new Date(2012, 0, 1)}
                  maxDate={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  dateFormat="D-MM-YY"
                  monthFormat="MMM YYYY"
                  startDatePlaceholder="Start Date"
                  endDatePlaceholder="End Date"
                  disabled={false}
                  className="my-own-class-name"
                  startWeekDay="monday"
                />
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Post Type</Text>
                <Box mt={3}>
                  <Box>
                    <Text textColor={"gray.500"} fontSize={"sm"}>
                      Instagram
                    </Text>
                    <HStack mt={1.5}>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? setPostType((prev) => !prev.includes("reel") ? [...prev, "reel"] : prev)
                            : setPostType((prev) => prev.filter((type) => type !== "reel"));
                        }}
                        isChecked={type.includes("reel")}
                      >
                        Reel
                      </Checkbox>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? setPostType((prev) => !prev.includes("post") ? [...prev, "post"] : prev)
                            : setPostType((prev) => prev.filter((type) => type !== "post"));
                        }}
                        isChecked={type.includes("post")}
                      >
                        Feed
                      </Checkbox>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? setPostType((prev) => !prev.includes("story") ? [...prev, "story"] : prev)
                            : setPostType((prev) => prev.filter((type) => type !== "story"));
                        }}
                        isChecked={type.includes("story")}
                      >
                        Story
                      </Checkbox>
                    </HStack>
                  </Box>
                  <Box mt={3}>
                    <Text textColor={"gray.500"} fontSize={"sm"}>
                      Tiktok
                    </Text>
                    <Checkbox
                      onChange={(e) => {
                        e.target.checked
                          ? setPostType((prev) => !prev.includes("video") ? [...prev, "video"] : prev)
                          : setPostType((prev) => prev.filter((type) => type !== "video"));
                      }}
                      isChecked={type.includes("video")}
                      mt={3}
                    >
                      Video
                    </Checkbox>
                  </Box>
                </Box>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Source</Text>
                <Box mt={3}>
                  {user?.instagrams?.length > 0 && (
                    <Box>
                      <Text textColor={"gray.500"} fontSize={"sm"} mt={2}>
                        Instagram
                      </Text>
                      {user?.instagrams?.map((instagram, index) => (
                        <Checkbox
                          key={index}
                          size={"sm"}
                          mt={2}
                          onChange={(e) => {
                            e.target.checked
                              ? setUsernames((prev) => [...prev, instagram.username])
                              : setUsernames((prev) => prev.filter((username) => username !== instagram.username));
                          }}
                          isChecked={usernames.includes(instagram.username)}
                        >
                          {instagram.username}
                        </Checkbox>
                      ))}
                    </Box>
                  )}
                  {user?.tiktoks?.length > 0 && (
                    <Box mt={2}>
                      <Text textColor={"gray.500"} fontSize={"sm"} mt={2}>
                        Tiktok
                      </Text>
                      {user?.tiktoks?.map((tiktok, index) => (
                        <Checkbox
                          key={index}
                          size={"sm"}
                          mt={2}

                          onChange={(e) => {
                            e.target.checked ? setUnique_ids((prev) => [...prev, tiktok.uniqueId]) : setUnique_ids((prev) => prev.filter((unique_id) => unique_id !== tiktok.uniqueId));
                          }}
                          isChecked={unique_ids.includes(tiktok.uniqueId)}
                        >
                          {tiktok.uniqueId}
                        </Checkbox>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Tags</Text>
                <Tabs w={"max-content"}>
                  <TabList>
                    <Tab>All</Tab>
                    <Tab>Assets</Tab>
                    <Tab>Social Profile</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <HStack>
                        <Checkbox>No Tags</Checkbox>
                      </HStack>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>three!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Usage Right</Text>
                <HStack mt={3}>
                  <Checkbox
                    isChecked={usage_right.includes("PENDING")}
                    onChange={(e) => {
                      e.target.checked ? setUsage_right((prev) => !prev.includes("PENDING") ? [...prev, "PENDING"] : prev) : setUsage_right((prev) => prev.filter((usage) => usage !== "PENDING"));
                    }}
                  >
                    Pending
                  </Checkbox>
                  <Checkbox
                    isChecked={usage_right.includes("APPROVED")}
                    onChange={(e) => {
                      e.target.checked ? setUsage_right((prev) => !prev.includes("APPROVED") ? [...prev, "APPROVED"] : prev) : setUsage_right((prev) => prev.filter((usage) => usage !== "APPROVED"));
                    }}
                  >
                    Approved
                  </Checkbox>
                  <Checkbox
                    isChecked={usage_right.includes("REJECTED")}
                    onChange={(e) => {
                      e.target.checked ? setUsage_right((prev) => !prev.includes("REJECTED") ? [...prev, "REJECTED"] : prev) : setUsage_right((prev) => prev.filter((usage) => usage !== "REJECTED"));
                    }}
                  >
                    Rejected
                  </Checkbox>
                  <Checkbox
                    isChecked={usage_right.includes("DEFAULT")}
                    defaultChecked={true}
                    onChange={(e) => {
                      e.target.checked ? setUsage_right((prev) => !prev.includes("DEFAULT") ? [...prev, "DEFAULT"] : prev) : setUsage_right((prev) => prev.filter((usage) => usage !== "DEFAULT"));
                    }}
                  >
                    Default
                  </Checkbox>
                </HStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Followers</Text>
                <HStack mt={3} ml="10%" w="max-content">
                  <Select placeholder="Select" defaultValue={"option1"}>
                    <option value="option1">1k</option>
                    <option value="option2">2k</option>
                    <option value="option3">3k</option>
                  </Select>
                  <Select placeholder="Select" defaultValue={"option3"}>
                    <option value="option1">1k</option>
                    <option value="option2"> 2k</option>
                    <option value="option3"> 3k</option>
                  </Select>
                </HStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Content Type</Text>
                <HStack mt={3}>
                  <Checkbox
                    isChecked={content_type === 2 || content_type === 1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setContent_type(2);
                      } else {
                        setContent_type(0);
                      }
                    }}
                  >
                    Video
                  </Checkbox>
                  <Checkbox
                    isChecked={content_type === 2 || content_type === 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setContent_type(2);
                      } else {
                        setContent_type(1);
                      }
                    }}
                  >
                    Image
                  </Checkbox>
                </HStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Engagement</Text>
                <VStack alignItems={"flex-start"} mt={3}>
                  <Checkbox checked={true}>Views</Checkbox>
                  <HStack pl="10%">
                    <Select placeholder="Select" defaultValue={"option1"}>
                      <option value="option1">1k</option>
                      <option value="option2">2k</option>
                      <option value="option3">3k</option>
                    </Select>
                    <Select placeholder="Select" defaultValue={"option3"}>
                      <option value="option1">1k</option>
                      <option value="option2"> 2k</option>
                      <option value="option3"> 3k</option>
                    </Select>
                  </HStack>
                </VStack>
                <VStack alignItems={"flex-start"}>
                  <Checkbox checked={true}> Plays</Checkbox>
                  <HStack pl="10%">
                    <Select placeholder="Select" defaultValue={"1k"}>
                      <option value="1k">1k</option>
                      <option value="2k">2k</option>
                      <option value="3k">3k</option>
                    </Select>
                    <Select placeholder="Select" defaultValue={"option3"}>
                      <option value="option1">1k</option>
                      <option value="option2"> 2k</option>
                      <option value="option3"> 3k</option>
                    </Select>
                  </HStack>
                </VStack>
                <VStack mt={3} alignItems={"flex-start"}>
                  <Checkbox> Likes</Checkbox>
                  <Checkbox> Comments</Checkbox>
                  <Checkbox> Share</Checkbox>
                </VStack>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Collections</Text>
                <Tabs w="max-content">
                  <TabList>
                    <Tab>Include</Tab>
                    <Tab>Exclude</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <HStack>
                        <Checkbox isChecked={user?.collections?.length === collection_include.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCollection_include(user.collections?.map((collection) => collection.name));
                            } else {
                              setCollection_include([]);
                            }
                          }}
                        >
                          All Collection
                        </Checkbox>
                        {user.collections?.map((collection) => {
                          return (
                            <Checkbox
                              isChecked={collection_include.includes(collection.name)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCollection_include((prev) => [...prev, collection.name]);
                                } else {
                                  setCollection_include((prev) => prev.filter((collection_name) => collection_name !== collection.name));
                                }
                              }}
                              key={collection.id}
                            >
                              {collection.name}
                            </Checkbox>
                          );
                        })}
                      </HStack>
                    </TabPanel>
                    <TabPanel>
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                          } else {

                          }
                        }}
                      >
                        All Collection
                      </Checkbox>
                      {user.collections?.map((collection) => {
                        return (
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {

                              } else {

                              }
                            }}
                            key={collection.id}
                          >
                            {collection.name}
                          </Checkbox>
                        );
                      })}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box mt={5}>
                <Text textColor={"gray.500"}>Verification</Text>
                <HStack mt={3}>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setVerified(2);
                      } else {
                        setVerified(0);
                      }
                    }}
                    isChecked={verified === 2 || verified == 1}
                  >
                    Verified
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => {
                      e.target.checked ? setVerified(2) : setVerified(1);
                    }}
                    isChecked={verified === 2 || verified == 0}
                  >
                    Not Verified
                  </Checkbox>
                </HStack>
              </Box>
            </>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setStartDate(Math.floor(previousMonthDate.getTime() / 1000));
                setEndDate(Math.floor(currentDate.getTime() / 1000));
                setCollection_include([]);
                setVerified(2);
                setContent_type(2);
                setPostType(["post", "reel", "story", "video"])
                setUsernames([]);
                setUnique_ids([]);
                setUsage_rights(["DEFAULT"]);
              }}
            >
              Reset All
            </Button>
            <Button
              colorScheme="primary"
              mr={3}
              onClick={handleFiter}
            >
              Apply All
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const generateQuery = (type: string[]) => {
  let query = `query FilterContents($filterContentsJsonInput: String!) {
    filterContents(json_input: $filterContentsJsonInput) {
      success
      message
      id
      tiktoks {
        id
        uniqueId
        followerCount
        followingCount
        heartCount
        videoCount
        profilePic
        nickname
        bio
        videos {
          id
          t_id
          width
          height
          duration
          caption
          timestamp
          usage_right
          display_url
          url
          owner {
            id
            uniqueId
            followerCount
            followingCount
            heartCount
            videoCount
            profileUrl
            nickname
            bio
          }
        }
      }
      instagrams {
        id
        full_name
        username
        profile_pic_url
        followers
        following
        posts_count
        reels_count
        stories_count
        ${type.includes("post") ?
      `posts {
          id
          caption
          mentions
          owner_username
          owner_full_name
          owner_profile_pic_url
          owner_followers
          owner_verified
          usage_right
          ig_contents {
            id
            url
            width
            height
            has_audio
            duration
            display_url
            taken_at
            is_video
          }
        }` : ""}
        ${type.includes("reel") ?
      `reels {
          id
          caption
          mentions
          usage_right
          owner_username
          owner_full_name
          owner_profile_pic_url
          owner_followers
          owner_verified
          ig_content {
            id
            url
            width
            height
            has_audio
            duration
            display_url
            taken_at
            is_video
          }
        }` : ""
    }
        ${type.includes("story") ?
      `stories {
          id
          mentions
          usage_right
          owner_username
          owner_full_name
          owner_profile_pic_url
          owner_followers
          owner_verified
          ig_contents {
            id
            url
            width
            height
            has_audio
            duration
            display_url
            taken_at
            is_video
          }
        }` : ""
    }
      }
    }
  }`
  return gql(query);
}

export default FilterModal;