import SideBar from "@/components/SideBar/SideBar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <Box>
      <SideBar />
      <Outlet />
    </Box>
  );
}

export default Root;
