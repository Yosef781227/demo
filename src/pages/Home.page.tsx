import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Button,
  CircularProgress,
  useDisclosure,
  Checkbox,
  Select,
  Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttons from "@/components/Buttons/Button";
import instagram from "@/assets/icons/social/instagram.svg";
import Container from "@components/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { AiOutlineDownload } from "react-icons/ai";
import { Funnel, Plus } from "@phosphor-icons/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import theme from "@/constants/theme";
const query = `
  query {
    instagram {
      stories {
        id
        owner_profile_pic_url
        owner_full_name
        owner_followers
        ig_contents {
          display_url
          is_video
          taken_at
          id
          url
        }
      }
      reels {
        id
        owner_followers
        owner_full_name
        owner_profile_pic_url
        ig_content {
          display_url
          taken_at
          url
          id
          is_video
        }
      }
      posts {
        id
        caption
        owner_followers
        owner_profile_pic_url
        owner_full_name
        ig_contents {
          display_url
          taken_at
          is_video
          url
        }
      }
      username
      followers
      id
      connected
      active
    }
  }
`;
const handleDownload = (url: string) => {
  window.open(url.includes("https://") ? url : "https://" + url, "_current");
};

const saveNewContent = async () => {
  axios
    .post(
      BASE_URL,
      {
        query: `
          mutation Mutation {
            saveStories {
              message
              success
            }
            savePostsAndReels {
              message
              success
            }
          }`,
      },
      { withCredentials: true }
    )
    .then((result) => {
      if (result.data.errors) {
        console.error("GraphQL errors", result.data.errors);
        toast.error("GraphQL errors: " + JSON.stringify(result.data.errors));
      } else if (
        !result.data.data ||
        !result.data.data.saveStories ||
        !result.data.data.savePostsAndReels
      ) {
        console.error("Unexpected server response", result.data);
        toast.error(
          "Unexpected server response: " + JSON.stringify(result.data)
        );
      } else {
        let toastMessage = "";
        if (result.data.data.saveStories.success) {
          toastMessage +=
            "Stories: " + result.data.data.saveStories.message + "\n";
        } else {
          toastMessage +=
            "Stories: Error - " + result.data.data.saveStories.message + "\n";
        }
        if (result.data.data.savePostsAndReels.success) {
          toastMessage +=
            "Posts and Reels: " + result.data.data.savePostsAndReels.message;
        } else {
          toastMessage +=
            "Posts and Reels: Error - " +
            result.data.data.savePostsAndReels.message;
        }

        toast(toastMessage);
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error("Network error: " + error.message);
    });
};

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    axios
      .post(BASE_URL, { query }, { withCredentials: true })
      .then((result) => {
        if (result.data.errors) {
          console.error("GraphQL errors", result.data.errors);
        } else if (!result.data.data || !result.data.data.instagram) {
          console.error("Unexpected server response", result.data);
        } else {
          setData(result.data.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  if (isLoading || !data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress isIndeterminate color="#8B5CF6" />
      </Box>
    );
  }
  const { instagram } = data;

  const { stories, reels, posts } = instagram;
  const allData = [...stories, ...reels, ...posts].flatMap((instadata: any) => {
    if (instadata?.ig_contents) {
      return instadata?.ig_contents.map((content: any) => ({
        ...instadata,
        ig_contents: [content],
      }));
    } else if (instadata?.ig_content) {
      return [{ ...instadata, ig_content: instadata.ig_content }];
    }
    return [];
  });

  return (
    <>
      <Modal isOpen={isOpen1} isCentered={false} size={"md"} onClose={onClose1}>
        <ModalOverlay />

        <ModalContent
          containerProps={{
            justifyContent: "flex-end",
            paddingRight: "0.9rem",
            paddingTop: "0.9rem",
          }}
          sx={{
            "&:first-child": {
              margin: 0,
              height: "100vh",
              overflowY: "scroll",
            },
          }}
        >
          
          <ModalCloseButton size={"lg"} mt={4} mr={4} color={"gray.500"} />

          <ModalBody mt={20} ml={2}>
            <Text fontWeight={"bold"} ml={6} fontSize={"2xl"}>Save New Content</Text>
            <Box mt={2} ml={6}>
              
                Sometimes Social Profiles forget to @mention your brand, but
                it's all good. Copy and paste a link to the UGC here; we'll add
                it to your asset library with all the usual details.
              
            </Box>
            <Text mt={35} ml={6}>Link</Text>
                 <Input ml={8}  mt={3} width={"330px"} height={"40px"} placeholder="https://"/>
                 <Text fontSize={"sm"} ml={9} mt={2} textColor={"gray.500"}>Past a tik tok or instagram Link</Text>
          </ModalBody>

          <ModalFooter mb={10}>
            <Button variant="ghost"  mr={3}>
              Go Back
            </Button>
            <Button colorScheme={"purple"}>Save Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} isCentered={false} size={"md"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          containerProps={{
            justifyContent: "flex-end",
            paddingRight: "0.9rem",
            paddingTop: "0.9rem",
          }}
          sx={{
            "&:first-child": {
              margin: 0,
              height: "100vh",
              overflowY: "scroll",
            },
          }}
        >
          <ModalHeader fontSize={"xl"} fontWeight={"bold"} mt={5}>
            Filters
          </ModalHeader>
          <ModalCloseButton />

          <Box borderBottom="1px" borderColor="gray.100" width="100%" my={2} />
          <ModalBody mt={5} ml={2}>
            <Box>
              <Text textColor={"gray.500"}>Post Type</Text>

              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) =>
                  setStartDate((prevDate) => date || prevDate)
                }
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
                    <Checkbox>Reel</Checkbox>
                    <Checkbox>Feed</Checkbox>
                    <Checkbox>Story</Checkbox>
                  </HStack>
                </Box>
                <Box mt={3}>
                  <Text textColor={"gray.500"} fontSize={"sm"}>
                    Tiktok
                  </Text>
                  <Checkbox mt={3}>Video</Checkbox>
                </Box>
              </Box>
            </Box>
            <Box mt={5}>
              <Text textColor={"gray.500"}>Source</Text>
              <Box mt={3}>
                <Box>
                  <Text textColor={"gray.500"} fontSize={"sm"} mt={2}>
                    Instagram
                  </Text>
                  <Checkbox size={"sm"}>@beyond_lore</Checkbox>
                </Box>
                <Box mt={2}>
                  <Text textColor={"gray.500"} fontSize={"sm"} mt={2}>
                    Tiktok
                  </Text>
                  <Checkbox size={"sm"}>@beyond_lore</Checkbox>
                </Box>
              </Box>
            </Box>
            <Box mt={8}>
              <Text>Tags</Text>
              <Tabs>
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
                </TabPanels>
              </Tabs>
            </Box>
            <Box>
              <Text>Usage Right</Text>
              <HStack>
                <Checkbox>Pending</Checkbox>
                <Checkbox>Approved</Checkbox>
                <Checkbox>Rejected</Checkbox>
              </HStack>
            </Box>
            <Box>
              <Text>Followers</Text>
              <HStack>
                <Select placeholder="Select">
                  <option value="option1" selected>
                    1k
                  </option>
                  <option value="option2">2k</option>
                  <option value="option3">3k</option>
                </Select>
                <Select placeholder="Select">
                  <option value="option1">1k</option>
                  <option value="option2"> 2k</option>
                  <option value="option3" selected>
                    {" "}
                    3k
                  </option>
                </Select>
              </HStack>
            </Box>
            <Box>
              <Text>Content Type</Text>
              <HStack>
                <Checkbox>Video</Checkbox>
                <Checkbox>Audio</Checkbox>
              </HStack>
            </Box>
            <Box>
              <Text>Engagement</Text>
              <VStack>
                <Checkbox alignSelf={"flex-start"} checked={true}>
                  {" "}
                  Views
                </Checkbox>
                <HStack>
                  <Select placeholder="Select">
                    <option value="option1" selected>
                      1k
                    </option>
                    <option value="option2">2k</option>
                    <option value="option3">3k</option>
                  </Select>
                  <Select placeholder="Select">
                    <option value="option1">1k</option>
                    <option value="option2"> 2k</option>
                    <option value="option3" selected>
                      {" "}
                      3k
                    </option>
                  </Select>
                </HStack>
              </VStack>
              <VStack>
                <Checkbox alignSelf={"flex-start"} checked={true}>
                  {" "}
                  Plays
                </Checkbox>
                <HStack>
                  <Select placeholder="Select">
                    <option value="option1" selected>
                      1k
                    </option>
                    <option value="option2">2k</option>
                    <option value="option3">3k</option>
                  </Select>
                  <Select placeholder="Select">
                    <option value="option1">1k</option>
                    <option value="option2"> 2k</option>
                    <option value="option3" selected>
                      {" "}
                      3k
                    </option>
                  </Select>
                </HStack>
              </VStack>
              <VStack alignItems={"flex-start"}>
                <Checkbox> Likes</Checkbox>
                <Checkbox> Comments</Checkbox>
                <Checkbox> Share</Checkbox>
              </VStack>
            </Box>
            <Box>
              <Text>Collections</Text>
              <Tabs>
                <TabList>
                  <Tab>Include</Tab>
                  <Tab>Exclude</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <HStack>
                      <Checkbox>All Collection</Checkbox>
                      <Checkbox>Random</Checkbox>
                      <Checkbox>Large Inflencers</Checkbox>
                    </HStack>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            <Box>
              <Text>Verification</Text>
              <HStack>
                <Checkbox>Verified</Checkbox>
                <Checkbox>Not Verified</Checkbox>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Container>
        <HStack justifyContent={"space-between"}>
          <Text color={"black"} fontWeight={"bold"} fontSize={"18px"}>
            Content
          </Text>
          <HStack>
            <Buttons
              icon={<Funnel size={16} color="gray" weight="fill" />}
              text="Filters"
              textColor="#525252"
              onClick={onOpen}
              height="40px"
              width="91px"
              variant="outline"
            />

            <Button
              colorScheme="primary"
              width={"91px"}
              height={"40px"}
              leftIcon={<Plus size={16} color="white" weight="fill" />}
              fontSize={"md"}
              onClick={onOpen1}
            >
              New
            </Button>
            <Button colorScheme="primary" onClick={saveNewContent}>
              Save New Content
            </Button>
          </HStack>
        </HStack>
        <Box sx={{ columnCount: [1, 1, 3, 4], gap: "16px" }}>
          {allData.map((instadata, i) => {
            return <Card data={instadata} key={i} />;
          })}
        </Box>
      </Container>
    </>
  );
}
function Card({ data }: { data: any }) {
  return (
    <VStack
      display={"inline-block"}
      sx={{ breakInside: "avoid", breakAfter: "auto", breakBefore: "auto" }}
      border={"1px solid #EDEDED"}
      align={"stretch"}
      my={4}
      rounded={"xl"}
      boxShadow={"0px 8px 8px -4px rgba(16, 24, 40, 0.03);"}
    >
      <HStack px={4} mt={2} py={2} justify={"space-between"}>
        <HStack>
          <Avatar name="Kent Dodds" src={data.owner_profile_pic_url}></Avatar>
          <VStack align={"start"}>
            <Text lineHeight={0.8}>{data.owner_full_name} </Text>
            <Text lineHeight={0.8}>{data.owner_followers} followers</Text>
          </VStack>
        </HStack>
        <img width={"20"} src={instagram} alt="social media icon" />
      </HStack>
      {Array.isArray(data?.ig_contents)
        ? data?.ig_contents[0]?.is_video
        : data?.ig_content?.is_video}
      {getAccess(data)}

      <HStack px={5} justify={"space-between"}>
        <Text>8 months ago</Text>
        <IconButton
          aria-label="Download"
          icon={<AiOutlineDownload />}
          variant="ghost"
          size="lg"
          fontWeight={"bold"}
          onClick={() => handleDownload(dataAccess(data))}
        />
      </HStack>
    </VStack>
  );
}
function getAccess(data: any) {
  if (data?.ig_contents) {
    return (
      <>
        {data?.ig_contents[0]?.is_video ? (
          <video
            controls={true}
            width={"100%"}
            style={{ objectFit: "contain" }}
            src={
              data?.ig_contents[0].url.includes("https://")
                ? data?.ig_contents[0].url
                : "https://wildsocial." + data?.ig_contents[0].url
            }
          />
        ) : (
          <Image
            width={"100%"}
            objectFit={"contain"}
            src={dataAccess(data)}
            alt="content img"
          />
        )}
      </>
    );
  }
  if (data?.ig_content) {
    return (
      <>
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
            src={dataAccess(data)}
            alt="content img"
          />
        )}
      </>
    );
  }
  return null;
}
function dataAccess(data: any) {
  return data?.ig_contents
    ? data?.ig_contents[0]?.display_url
    : data?.ig_content?.display_url;
}
// function dataAccessDownload(data: any) {
//   return data?.ig_contents ? data?.ig_contents[0]?.url : data?.ig_content?.url;
// }
export default HomePage;
