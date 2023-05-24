import {
  Avatar,
  Box,
  CircularProgressLabel,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Button 
} from "@chakra-ui/react";
import Buttons from "@/components/Buttons/Button";
import AddIcon from "@/assets/icons/AddIcon";
import instagram from "@/assets/icons/social/instagram.svg";
import Container from "@components/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { AiOutlineDownload } from "react-icons/ai";
import { Funnel } from "@phosphor-icons/react";
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
    .post(BASE_URL, { 
      query : `
          mutation Mutation {
            saveStories {
              message
              success
            }
            savePostsAndReels {
              message
              success
            }
          }`
     }, { withCredentials: true })
    .then((result) => {
      if (result.data.errors) {
        console.error("GraphQL errors", result.data.errors);
      } else if (!result.data.data || !result.data.data.instagram) {
        console.error("Unexpected server response", result.data);
      } else {
        
      }
    })
    .catch((error) => {
      console.error(error);
      //setIsLoading(false);
    });
};

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

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
        <CircularProgressLabel color="green.500" />
      </Box>
    );
  }
  const { instagram } = data;
  const { stories, reels, posts } = instagram;
  //console.log(instagram);
  return (
    <Container>
      <HStack justifyContent={"space-between"}>
        <Text color={"black"} fontWeight={"bold"} fontSize={"18px"}>Content</Text>
        <HStack>
          <Buttons
            icon={<Funnel size={16} color="gray" weight="fill" />}
            text="Filters"
            textColor="#525252"
            size="md"
            variant="outline"
            
          />
          <Button colorScheme='blue' onClick={saveNewContent}>Save New Content</Button>
        </HStack>
      </HStack>
      <Box sx={{ columnCount: [4] , gap:"16px"}}>
        {[...stories, ...reels, ...posts].map((instadata, i) => {
          return <Card data={instadata} key={i} />;
        })}
      </Box>
    </Container>
  );
}
function Card({ data }: { data: any }) {
  return (
    <VStack
      display={"inline-block"}
      sx={{ breakInside: "avoid" }}
      border={"1px solid #EDEDED"}
      align={"stretch"}
      my={4}
      rounded={"xl"}
      boxShadow={"0px 8px 8px -4px rgba(16, 24, 40, 0.03);"}
      w="330px"
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

      <HStack px={5} py={5} justify={"space-between"}>
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
            src={data?.ig_contents[0].url.includes("https://") ? data?.ig_contents[0].url : "https://wildsocial." + data?.ig_contents[0].url}
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
            src={data?.ig_content.url.includes("https://") ? data?.ig_content.url : "https://" + data?.ig_content.url}
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
function dataAccessDownload(data: any) {
  return data?.ig_contents ? data?.ig_contents[0]?.url : data?.ig_content?.url;
}
export default HomePage;
