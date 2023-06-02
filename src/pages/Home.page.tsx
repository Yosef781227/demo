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
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttons from "@/components/Buttons/Button";
import instagram from "@/assets/icons/social/instagram.svg";
import Container from "@components/Container";
import { useNavigate } from "react-router-dom";
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
const query = `
query Query($jsonInput: String!) {
  getInstagramAccount(json_input: $jsonInput) {
    connected
    followers
    full_name
    id
    posts {
      owner_username
      owner_profile_pic_url
      owner_full_name
      owner_followers
      id
      caption
      ig_contents {
        display_url
        id
        is_video
        url
      }
    }
    reels {
      caption
      id
      owner_username
      owner_profile_pic_url
      owner_followers
      owner_full_name
      ig_content {
        display_url
        url
        is_video
        id
      }
    }
    stories {
      owner_username
      owner_profile_pic_url
      owner_full_name
      owner_followers
      id
      ig_contents {
        url
        display_url
        id
        is_video
      }
    }
  }
}
`;
const handleDownload = (url: string) => {
  window.open(url.includes("https://") ? url : "https://" + url, "_current");
};

const saveNewContent = async () => {
  const index: number = localStorage.getItem("selectedInstagramIndex") !== null ? parseInt(localStorage.getItem("selectedInstagramIndex") || "") : 0;

  const instas: any = JSON.parse(localStorage.getItem("instagrams") || "[]") || [];
  const instagramId = instas[index]?.id;
  axios
    .post(
      BASE_URL,
      {
        query: `
        mutation Mutation($jsonInput: String!) {
          savePostsAndReels(json_input: $jsonInput) {
            success
            message
          }
        } 
        `,
        variables: {
          jsonInput: JSON.stringify({
            instagram_id: instagramId,
            // include any other data required by your API
          }),
        },
      },
      { withCredentials: true }
    )
    .then((result) => {
      if (result.data.errors) {
        console.error("GraphQL errors", result.data.errors);
        toast.error("GraphQL errors: " + JSON.stringify(result.data.errors));
      } else if (!result.data.data) {
        console.error("Unexpected server response", result.data);
        toast.error(
          "Unexpected server response: " + JSON.stringify(result.data)
        );
      } else {
        let toastMessage = "";
        // if (result.data.data.saveStories.success) {
        //   toastMessage +=
        //     "Stories: " + result.data.data.saveStories.message + "\n";
        // } else {
        //   toastMessage +=
        //     "Stories: Error - " + result.data.data.saveStories.message + "\n";
        // }
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
  const [instagrams, setInstagrams] = useState([{}]); // [{id: "", username: "", connected: false}
  const [instaID, setInstaID] = useState(0);
  const [instagramId, setInstagramId] = useState("");
  const [data, setData] = useState({});
  const [contents, setContents] = useState([{}]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const [startDate, setStartDate] = useState(new Date());

  const Authenticate = async () => {
    try {
      const response = await axios.post(
        BASE_URL,
        {
          query: `
          query Query {
            me {
              id
              has_tiktok
              has_instagram
              instagrams {
                id
                username
                connected
              }
            }
          }
          `,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.data == null || response.data?.errors) {
        console.log("User is not logged in");
        navigate("/login");
        return {
          loggedIn: false,
        }
      } else if (!response.data.data.me.has_instagram) {
        navigate("/nextpage");
        return {
          loggedIn: true,
          hasInstagram: false,
        }
      } else {
        const index: number = localStorage.getItem("selectedInstagramIndex") !== null ? parseInt(localStorage.getItem("selectedInstagramIndex") || "") : 0;

        const instas: any = JSON.parse(localStorage.getItem("instagrams") || "[]") || [];
        if (instas.length === 0) {
          localStorage.setItem('selectedInstagramIndex', "0");
          localStorage.setItem('instagrams', JSON.stringify(response.data.data.me.instagrams));
        } else {
          setInstaID(index);
          setInstagramId(instas[index]?.id);
          setInstagrams(response.data.data.me.instagrams);
        }
        return {
          loggedIn: true,
          hasInstagram: true,
        }
      }
    } catch (error) {

    }
  };
  const changeAcount = (e: any) => {
    const index = e.target.selectedIndex - 1;
    localStorage.removeItem("selectedInstagramIndex");
    localStorage.setItem("selectedInstagramIndex", index.toString());
    const instagramId = e.target.value;
    setInstaID(index);
    setInstagramId(instagramId);
  };
  const logout = async () => {
    try {
      const response: any = await axios.post(
        BASE_URL,
        {
          query: `
          mutation Mutation {
            logout {
              success
              message
            }
          }
          `,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.data.logout.success) {
        localStorage.removeItem("selectedInstagramIndex");
        localStorage.removeItem("instagrams");
        navigate("/login");
      } else {
        toast.error(response.data.data.logout.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    Authenticate().then((result: any) => {
      if (!result.loggedIn || (result.loggedIn && !result.hasInstagram)) {
        return;
      }
      const jsonInput = JSON.stringify({
        instagram_id: instagramId, // use the Instagram ID from state
        // include any other data required by your API
      });

      axios
        .post(
          BASE_URL,
          { query, variables: { jsonInput } },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.data.errors) {
            console.error("GraphQL errors", result.data.errors);
          } else if (!result.data.data || !result.data.data.getInstagramAccount) {
            console.error("Unexpected server response", result.data);
          } else {
            const instaposts: [] = result.data.data.getInstagramAccount.posts;

            let posts: any[] = [];

            instaposts.forEach(post => {
              const { ig_contents }: { ig_contents: [] } = post;
              const {
                owner_username,
                owner_profile_pic_url,
                owner_full_name,
                owner_followers,
                caption,
                id,
              }: {
                owner_username: string;
                owner_profile_pic_url: string;
                owner_full_name: string;
                owner_followers: number;
                caption: string | null;
                id: string;
              } = post;
              posts = [...posts, ...ig_contents.map((content) => {
                return {
                  owner_username,
                  owner_profile_pic_url,
                  owner_full_name,
                  owner_followers,
                  id,
                  caption,
                  ig_content: content,
                };
              })]
            });

            const instastories: [] = result.data.data.getInstagramAccount.stories;
            let stories: any[] = [];

            instastories.forEach(story => {
              const { ig_contents }: { ig_contents: [] } = story;
              const {
                owner_username,
                owner_profile_pic_url,
                owner_full_name,
                owner_followers,
                id,
              }: {
                owner_username: string;
                owner_profile_pic_url: string;
                owner_full_name: string;
                owner_followers: number;
                id: string;
              } = story;

              stories = [...stories, ...ig_contents.map((content) => {
                return {
                  owner_username,
                  owner_profile_pic_url,
                  owner_full_name,
                  owner_followers,
                  id,
                  ig_content: content,
                };
              })]
            })
            const { connected, followers, full_name, id } =
              result.data.data.getInstagramAccount;
            setData({
              connected,
              followers,
              full_name,
              id,
            });
            setContents([...stories, ...posts, ...result.data.data.getInstagramAccount.reels]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    });



  }, [instagramId]);

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

  return (
    <>
      {/* <Modal isOpen={isOpen1} isCentered={false} size={"md"} onClose={onClose1}>
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
            <Text fontWeight={"bold"} ml={6} fontSize={"2xl"}>
              Save New Content
            </Text>
            <Box mt={2} ml={6}>
              Sometimes Social Profiles forget to @mention your brand, but it's
              all good. Copy and paste a link to the UGC here; we'll add it to
              your asset library with all the usual details.
            </Box>
            <Text mt={35} ml={6}>
              Link
            </Text>
            <Input
              ml={8}
              mt={3}
              width={"330px"}
              height={"40px"}
              placeholder="https://"
            />
            <Text fontSize={"sm"} ml={9} mt={2} textColor={"gray.500"}>
              Past a tik tok or instagram Link
            </Text>
          </ModalBody>

          <ModalFooter mb={10}>
            <Button variant="ghost" mr={3}>
              Go Back
            </Button>
            <Button colorScheme="primary">Save Post</Button>
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
          <ModalHeader fontSize={"xl"} fontWeight={"bold"} mt={6}>
            Filters
          </ModalHeader>
          <ModalCloseButton size={"lg"} color={"gray.500"} mt={2} />

          <Box borderBottom="1px" borderColor="gray.100" width="100%" my={2} />
          <ModalBody mt={5} ml={2}>
            <Box>
              <Text textColor={"gray.500"}>Post Date</Text>

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
                </TabPanels>
              </Tabs>
            </Box>
            <Box mt={5}>
              <Text textColor={"gray.500"}>Usage Right</Text>
              <HStack mt={3}>
                <Checkbox>Pending</Checkbox>
                <Checkbox>Approved</Checkbox>
                <Checkbox>Rejected</Checkbox>
              </HStack>
            </Box>
            <Box mt={5}>
              <Text textColor={"gray.500"}>Followers</Text>
              <HStack mt={3} ml="10%" w="max-content">
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
            <Box mt={5}>
              <Text textColor={"gray.500"}>Content Type</Text>
              <HStack mt={3}>
                <Checkbox>Video</Checkbox>
                <Checkbox>Audio</Checkbox>
              </HStack>
            </Box>
            <Box mt={5}>
              <Text textColor={"gray.500"}>Engagement</Text>
              <VStack alignItems={"flex-start"} mt={3}>
                <Checkbox checked={true}>Views</Checkbox>
                <HStack pl="10%">
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
                <Checkbox checked={true}> Plays</Checkbox>
                <HStack pl="10%">
                  <Select placeholder="Select">
                    <option value="1k" selected>1k</option>
                    <option value="2k">2k</option>
                    <option value="3k">3k</option>
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
            <Box mt={5}>
              <Text textColor={"gray.500"}>Verification</Text>
              <HStack mt={3}>
                <Checkbox>Verified</Checkbox>
                <Checkbox>Not Verified</Checkbox>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">
              Reset All
            </Button>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Apply All
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

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
            <Select placeholder="Select" width={24} onChange={changeAcount} value={instaID + 1}>
              {
                instagrams.map((instagram: any, index: number) => {
                  return <option key={index + 1} value={instagram.id}  >{instagram.username}</option>
                }
                )
              }
            </Select>
            <Button colorScheme="primary" onClick={logout}>
              Logout
            </Button>
          </HStack>
        </HStack>
        <Box borderBottom="1px" borderColor="gray.200" width="100%" pt={5} />
        <Box pt={10} sx={{ columnCount: [1, 1, 3, 4], gap: "16px" }}>
          {contents.map((instadata, i) => {
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
      backgroundColor={"white"}
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

export default HomePage;
