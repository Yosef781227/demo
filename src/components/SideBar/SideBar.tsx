import { Avatar, Box, HStack, Text, VStack, chakra } from "@chakra-ui/react";
import ContentIcon from "@/assets/icons/Filled/ContentIcon";
import IntegrationIcon from "@/assets/icons/Filled/IntegrationIcon";
import CollectionIcon from "@/assets/icons/Filled/CollectionIcon";
import SettingIcon from "@/assets/icons/Filled/SettingIcon";
import Logo from "../Logo";
import { NavLink, Navigate, useMatches } from "react-router-dom";
const ChakraNavLink = chakra(NavLink);

const sideBarElements = [
  {
    id: 'content',
    text: "Content",
    link: "/",
    icon: <ContentIcon />,
  },
  {
    id: 'collections',
    text: "Collections",
    link: "/collections",
    icon: <CollectionIcon />,
  },
  {
    id: 'integration',
    text: "Integration",
    link: "/integration/instagram",
    icon: <IntegrationIcon />,
  },
  {
    id: 'settings',
    text: "Settings",
    link: "/settings",
    icon: <SettingIcon />,
  },
];
function sideBarListBuilder(pathname: string) {
  return (
    <VStack
      sx={{
        ".active": {
          backdropFilter: "blur(13px) saturate(200%)",
          backgroundColor: "primary.700",
          borderWidth: "thin",
          borderColor: "primary.500",
        },
      }}
      alignItems={"flex-start"}
      width={"full"}
      gap={3}
      pt={8}
      pr={5}
    >
      {sideBarElements.map(({ id, link, text, icon }, i) => {
        if ("/integration" === pathname) {
          return <Navigate to="/integration/tiktok" />;
        }
        return (
          <ChakraNavLink
            key={id}
            rounded={"lg"}
            end={true}
            style={{ width: "100%" }}
            to={`${link}`}
          >
            <HStack cursor={"pointer"} px={4} py={2} width={"full"} key={i}>
              {icon}
              <Text color="white">{text}</Text>
            </HStack>
          </ChakraNavLink>
        );
      })}
    </VStack>
  );
}
function SideBar() {
  const matches = useMatches();
  return (
    <VStack
      position={"fixed"}
      h="100vh"
      padding={4}
      w={"20vw"}
      alignItems={"stretch"}
      justifyContent={"space-between"}
    >
      <VStack>
        <Box width={"full"} alignSelf={"flex-start"}>
          <Logo />
        </Box>
        {sideBarListBuilder(matches[matches.length - 1].pathname)}
      </VStack>
      <HStack>
        <Avatar name="Jone Doe" />
        <VStack alignItems={"flex-start"}>
          <Text
            lineHeight={"text"}
            color="whiteAlpha.800
"
          >
            John Doe
          </Text>
          <Text
            color="whiteAlpha.800
"
            lineHeight={"text"}
          >
            johndoe@gmail.com
          </Text>
        </VStack>
        <SettingIcon />
      </HStack>
    </VStack>
  );
}

export default SideBar;
