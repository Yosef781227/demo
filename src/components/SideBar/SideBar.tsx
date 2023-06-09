import { Avatar, Box, HStack, Text, VStack, chakra } from "@chakra-ui/react";
import ContentIcon from "@/assets/icons/Filled/ContentIcon";
import IntegrationIcon from "@/assets/icons/Filled/IntegrationIcon";
import CollectionIcon from "@/assets/icons/Filled/CollectionIcon";
import SettingIcon from "@/assets/icons/Filled/SettingIcon";
import Logo from "../Logo";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "@/App";
import { logout } from "@/utils";
const ChakraNavLink = chakra(NavLink);

const sideBarElements = [
  {
    id: "content",
    text: "Content",
    link: "/",
    icon: <ContentIcon />,
  },
  {
    id: "collections",
    text: "Collections",
    link: "/collections",
    icon: <CollectionIcon />,
  },
  {
    id: "integration",
    text: "Integration",
    link: "/integration/instagram",
    icon: <IntegrationIcon />,
  },
  {
    id: "settings",
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
  const user = useContext(UserContext);
  const matches: any = [];
  const navigate = useNavigate();
  return (
    <VStack
      position={"fixed"}
      h="100vh"
      padding={4}
      w={"20vw"}
      alignItems={"stretch"}
      justifyContent={"space-between"}
      className="sidebar"
    >
      <VStack>
        <Box width={"full"} alignSelf={"flex-start"}>
          <Logo />
        </Box>
        {sideBarListBuilder(matches[matches.length - 1]?.pathname)}
      </VStack>
      <HStack pb={"15px"}>
        <Avatar name="Jone Doe" bg={"primary.400"} />
        <VStack alignItems={"flex-start"}>
          <Text
            lineHeight={"text"}
            color="whiteAlpha.800
"
          >
            {user?.name}
          </Text>
          <Text
            color="whiteAlpha.800
"
            lineHeight={"text"}
          >
            {user?.email}
          </Text>
        </VStack>
        <Menu>
          <MenuButton>
            <SettingIcon />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                navigate("/settings");
              }}
            >
              <Link to="settings">Setting</Link>
            </MenuItem>
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
}

export default SideBar;
