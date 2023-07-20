import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Heading,
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  Tag,
  TagCloseButton,
  Flex,
} from "@chakra-ui/react";
import Container from "@components/Container";
import insta from "@assets/icons/social/instagram.svg";
import { DotsThreeOutline } from "@phosphor-icons/react";
import logo from "@assets/logo.svg";
import screen from "@assets/images/screen.png";
function InstagramPage() {
  const navigate = useNavigate();
  const [hashtag, setHashtag] = useState<string>("");
  const [hashtags, setHashtags] = useState<{ id: string; text: string }[]>(
    () => {
      const savedHashtags = localStorage.getItem("hashtags");
      return savedHashtags ? JSON.parse(savedHashtags) : [];
    }
  );

  const handleAdd = () => {
    if (hashtag.trim()) {
      const newHashtags = [
        ...hashtags,
        { id: Date.now().toString() + Math.random(), text: hashtag },
      ];
      setHashtags(newHashtags);
      localStorage.setItem("hashtags", JSON.stringify(newHashtags));
      setHashtag("");
    }
  };

  const handleRemove = (idToRemove: string) => {
    const newHashtags = hashtags.filter((tag) => tag.id !== idToRemove);
    setHashtags(newHashtags);
    localStorage.setItem("hashtags", JSON.stringify(newHashtags));
  };
  return (
    <Container background={"neutral.50"}>
      <Box alignSelf={"center"} w={"70%"} gap={"40px"}>


        <RowContainer height={"214px"} width={"988px"}>
          <Heading fontSize={"2xl"} size={"md"}>
            Connected Account
          </Heading>
          <HStack justifyContent={"space-between"}>
            <HStack alignContent={"start"}>
              <Image
                mt={3}
                h={16}
                width={16}
                src={insta}
                alt="Instagram logo"
              />
              <VStack align={"start"} spacing={0}>
                <HStack alignContent={"start"} gap={5}>
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    @beyond_lore
                  </Text>
                  <Menu>
                    <MenuButton>
                      <DotsThreeOutline size={24} color="gray" weight="fill" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Remove</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
                <Text fontWeight={"regular"} fontSize={"lg"} pl={2}>
                  {" "}
                  beyond_lore
                </Text>
              </VStack>
            </HStack>
          </HStack>
        </RowContainer>

        <RowContainer height={"225px"} width={"988px"}>
          <Heading fontSize={"2xl"} fontWeight={"bold"} mt={5}>
            Automatic like @mention
          </Heading>
          <Text fontWeight={"lg"} fontSize={"lg"}>
            Turn this feature on to have Archive automatically "like" every
            Story that @mentions <br /> your brand.
          </Text>
          <HStack justifyContent={"space-between"} pr={5}>
            <Text fontWeight={"lg"} fontSize={"lg"}>
              Auto-like stories
            </Text>
            <Switch colorScheme="purple"></Switch>
          </HStack>
        </RowContainer>

        <RowContainer width={"988px"}>
          <Heading fontSize={"2xl"} fontWeight={"bold"} mt={5}>
            Hashtags
          </Heading>
          <Text fontSize={"lg"}>
            This is where you’ll manage the hashtags you want to track. Archive
            will automatically <br /> detect any content posted using the
            hashtags on your list.
          </Text>
          <VStack align={"start"}>
            <Text pt={8} fontSize={"xl"} fontWeight={"light"}>
              Your Hashtags
            </Text>
            <VStack align={"start"} justifyContent={"flex-start"}>
              <HStack>
                <Input
                  placeholder="#Hashtag..."
                  width={"650px"}
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                />
                <Button
                  color={"black"}
                  colorScheme="gray"
                  variant="outline"
                  w={24}
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </HStack>
              <Flex wrap="wrap" maxWidth={"80%"}>
                {hashtags.map(({ id, text }) => (
                  <Tag
                    key={id}
                    size="lg"
                    borderRadius="full"
                    colorScheme="gray"
                    mr={3}
                    mb={3}
                    mt={3}
                  >
                    {text}
                    <TagCloseButton mt={0} onClick={() => handleRemove(id)} />
                  </Tag>
                ))}
              </Flex>
            </VStack>
          </VStack>
          <VStack align={"start"} pt={5}>
            <Text fontSize={"lg"}>
              <strong>Deleting a hashtag</strong> from your list will remove any
              content with that hashtag from your <br /> library.
            </Text>
            <Text fontSize={"lg"}>
              {""}
              <strong>Tracking the hashtag again</strong> will restore
              previously saved content but new content
              <br /> will only be added while the hashtag is active on your
              list.
            </Text>
          </VStack>
        </RowContainer>
      </Box>
    </Container>
  );
}
type RowContainerProps = {
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  mt?: string | number;
  py?: string | number;
};

function RowContainer({
  children,
  height = "auto",
  width = "auto",
  mt = "50px",
  py = "10",
}: RowContainerProps) {
  return (
    <VStack
      alignItems={"stretch"}
      shadow={"lg"}
      height={height}
      width={width}
      backgroundColor={"white"}
      mt={mt}
      ml={"110px"}
      mb={"40px"}
      px={10}
      py={py}
      gap={4}
      rounded={"lg"}
    >
      {children}
    </VStack>
  );
}

export default InstagramPage;
