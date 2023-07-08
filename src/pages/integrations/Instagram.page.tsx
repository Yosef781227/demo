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
} from "@chakra-ui/react";
import Container from "@components/Container";
import insta from "@assets/icons/social/instagram.svg";
import { DotsThreeOutline } from "@phosphor-icons/react";
function InstagramPage() {
  const navigate = useNavigate();
  const [hashtag, setHashtag] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleAdd = () => {
    if (hashtag.trim()) {
      setHashtags([...hashtags, hashtag]);
      setHashtag("");
    }
  };

  return (
    <Container background={"neutral.50"}>
      <Box alignSelf={"center"} w={"70%"} gap={"40px"}>
        <Heading size={"lg"} mt={20}>
          Instagram
        </Heading>

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

        <RowContainer height={"500px"} width={"988px"}>
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
            <VStack>
              <HStack align={"start"}>
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
              <HStack wrap="wrap">
                {hashtags.map((tag, index) => (
                  <Tag
                    key={index}
                    size="lg"
                    borderRadius="full"
                    colorScheme="gray"
                    mr={2}
                    mb={2}
                  >
                    {tag}
                    
                  </Tag>
                ))}
              </HStack>
            </VStack>
          </VStack>
          <VStack align={"start"} pt={5}>
            <Text fontSize={"lg"}>
              <strong>Deleting a hashtag</strong> from your list will remove any
              content with that hashtag from your <br /> library.
            </Text>
            <Text fontSize={"lg"}>
              {" "}
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
};

function RowContainer({
  children,
  height = "auto",
  width = "auto",
}: RowContainerProps) {
  return (
    <VStack
      alignItems={"stretch"}
      shadow={"lg"}
      height={height}
      width={width}
      backgroundColor={"white"}
      mt="40px"
      px={10}
      py={5}
      gap={4}
      rounded={"lg"}
    >
      {children}
    </VStack>
  );
}

export default InstagramPage;
