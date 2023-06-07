import {
  Box,
  HStack,
  Text,
  Button,
  useDisclosure,
  Select,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttons from "@/components/Buttons/Button";
import Container from "@components/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { Funnel, Plus } from "@phosphor-icons/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { UserContext } from "@/App";
import { getInstagramQuery, getTiktokQuery } from "@/query";
import FilterModal from "@/components/Modal/FilterModal";
import TiktokCard from "@/components/Card/TiktokCard";
import Card from "@/components/Card/Card";
import { saveNewContent } from "@/utils";
import Loading from "@/components/Loading";
import { User } from "@/interfaces/user.interface";

function HomePage() {
  const User = useContext(UserContext) as User;
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
    return <Loading />;
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

export default HomePage;
