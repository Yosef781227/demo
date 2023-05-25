import { Avatar, Box, HStack, Text, VStack, chakra } from "@chakra-ui/react";
import ContentIcon from "@/assets/icons/Filled/ContentIcon";
import IntegrationIcon from "@/assets/icons/Filled/IntegrationIcon";
import CollectionIcon from "@/assets/icons/Filled/CollectionIcon";
import SettingIcon from "@/assets/icons/Filled/SettingIcon";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
const ChakraNavLink = chakra(NavLink);

const sideBarElements = [
  {
    text: "Content",
    link: "/home",
    icon: <ContentIcon />,
  },
  {
    text: "Integration",
    link: "/home/integration",
    icon: <IntegrationIcon />,
  },
  {
    text: "Collections",
    link: "/home/collections",
    icon: <CollectionIcon />,
  },
  {
    text: "Settings",
    link: "/home/settings",
    icon: <SettingIcon />,
  },
];
function sideBarListBuilder() {
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
      {sideBarElements.map(({ link, text, icon }, i) => {
        return (
          <ChakraNavLink
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
        {sideBarListBuilder()}
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