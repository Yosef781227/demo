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
          /* width */
          "::-webkit-scrollbar": {
            width: "7px"
          },

          /* Track */
          "::-webkit-scrollbar-track ": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "5px",
          },

          /* Handle */
          "::-webkit-scrollbar-thumb": {
            background: "grey",
            borderRadius: "5px",
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
