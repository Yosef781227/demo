//@ts-nocheck
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
  Select,
  Input,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttons from "@/components/Buttons/Button";
import tiktok from "@/assets/icons/social/tiktok.svg";
import Container from "@components/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
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
import { UserContext } from "@/App";
import { getInstagramQuery, getTiktokQuery } from "@/query";
import { handleDownload } from "@/components/utils";
import FilterModal from "@/components/Modal/FilterModal";

function HomePage() {
  const User = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInstagram, setHasInstagram] = useState(User.hasInstagram);
  const [instagrams, setInstagrams] = useState(User.instagrams);
  const [instagramIndex, setInstagramIndex] = useState(User.instagramIndex);
  const [instagramId, setInstagramId] = useState(User.instagramId);
  const [tiktokId, settiktokId] = useState(User.tiktokId);
  const [tiktoks, settiktoks] = useState(User.tiktoks);
  const [tiktokIndex, settiktokIndex] = useState(User.tiktokIndex);
  const [hasTiktok, setHasTiktok] = useState(User.hasTiktok);
  const [data, setData] = useState({});
  const [contents, setContents] = useState([{}]);
  const [videos, setVideos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const [startDate, setStartDate] = useState(new Date());

  const changeTiktokAcount = (e: any) => {
    const index = e.target.selectedIndex;
    localStorage.removeItem("selectedTiktokIndex");
    localStorage.setItem("selectedTiktokIndex", index.toString());
    const tiktokId = e.target.value;
    settiktokIndex(index);
    settiktokId(tiktokId);
  };
  const changeAcount = (e: any) => {
    const index = e.target.selectedIndex;
    localStorage.removeItem("selectedInstagramIndex");
    localStorage.setItem("selectedInstagramIndex", index.toString());
    const instagramId = e.target.value;
    setInstagramIndex(index);
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
      //console.log(response.data);
      if (response.data.data.logout.success) {
        localStorage.removeItem("selectedInstagramIndex");
        localStorage.removeItem("instagrams");
        //navigate("/login");
        window.location.reload();
      } else {
        toast.error(response.data.data.logout.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (User.isAuth && !hasInstagram) {
      navigate("/nextpage");
    } else {
      let jsonInput = JSON.stringify({
        instagram_id: instagramId,
      });

      axios
        .post(
          BASE_URL,
          { query: getInstagramQuery, variables: { jsonInput } },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.data.errors) {
            console.log("Got you");
            console.error("GraphQL errors", result.data.errors.message);
          } else if (
            !result.data.data ||
            !result.data.data.getInstagramAccount
          ) {
            console.error("Unexpected server response", result.data);
          } else {
            const instaposts: [] = result.data.data.getInstagramAccount.posts;

            let posts: any[] = [];

            instaposts.forEach((post) => {
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
              posts = [
                ...posts,
                ...ig_contents.map((content) => {
                  return {
                    owner_username,
                    owner_profile_pic_url,
                    owner_full_name,
                    owner_followers,
                    id,
                    caption,
                    ig_content: content,
                  };
                }),
              ];
            });

            const instastories: [] =
              result.data.data.getInstagramAccount.stories;
            let stories: any[] = [];

            instastories.forEach((story) => {
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

              stories = [
                ...stories,
                ...ig_contents.map((content) => {
                  return {
                    owner_username,
                    owner_profile_pic_url,
                    owner_full_name,
                    owner_followers,
                    id,
                    ig_content: content,
                  };
                }),
              ];
            });
            const { connected, followers, full_name, id } =
              result.data.data.getInstagramAccount;
            setContents([
              ...stories,
              ...posts,
              ...result.data.data.getInstagramAccount.reels,
            ]);
          }
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          //console.error(error.message);
        });
      if (hasTiktok) {
        //console.log(tiktokId);
        jsonInput = JSON.stringify({
          tik_tok_id: tiktokId,
        });
        setIsLoading(true);
        axios
          .post(
            BASE_URL,
            { query: getTiktokQuery, variables: { jsonInput } },
            { withCredentials: true }
          )
          .then((result) => {
            //console.log(result.data);
            if (result.data.errors) {
              console.error("GraphQL errors", result.data.errors);
            } else if (
              !result.data.data ||
              !result.data.data.getTikTokAccount
            ) {
              console.error("Unexpected server response", result.data);
            } else {
              const videos: [] = result.data.data.getTikTokAccount.videos;
              setVideos(videos);
            }
            setIsLoading(false);
          })
          .catch((error: any) => {
            setIsLoading(false);
            console.error(error.message);
          });
      }
    }
  }, [instagramIndex, tiktokId]);
  if (isLoading) {
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

      <FilterModal
        setStartDate={setStartDate}
        startDate={startDate}
        isOpen={isOpen}
        onClose={onClose}
      />

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
            <Select
              width={"auto"}
              onChange={changeAcount}
              defaultValue={instagramId}
            >
              {User.instagrams.map((instagram: any, index: number) => {
                return (
                  <option key={index + 1} value={instagram.id}>
                    {instagram.username}
                  </option>
                );
              })}
            </Select>
            <Select
              width={"auto"}
              onChange={changeTiktokAcount}
              defaultValue={tiktokId}
            >
              {User.tiktoks.map((tiktok: any, index: number) => {
                return (
                  <option key={index + 1} value={tiktok.id}>
                    {tiktok.uniqueId}
                  </option>
                );
              })}
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
          {videos.map((video, index) => {
            return <TiktokCard video={video} key={index} />;
          })}
        </Box>
      </Container>
    </>
  );
}

const saveNewContent = async () => {
  const index: number =
    localStorage.getItem("selectedInstagramIndex") !== null
      ? parseInt(localStorage.getItem("selectedInstagramIndex") || "")
      : 0;

  const instas: any =
    JSON.parse(localStorage.getItem("instagrams") || "[]") || [];
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

export default HomePage;
