import SideBar from "@/components/SideBar/SideBar";
import { Box, CSSReset } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Global } from "@emotion/react";

function Root() {
  return (
    <>
      <CSSReset />
      <Global
        styles={{
          "::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      />
      <Box>
        <SideBar />
        <Outlet />
      </Box>
    </>
  );
}

export default Root;
