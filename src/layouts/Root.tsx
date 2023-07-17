import SideBar from "@/components/SideBar/SideBar";
import { CSSReset } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Global } from "@emotion/react";
import SkimToast from "@/components/messages/skimtoast";

function Root() {
  return (
    <>
      <CSSReset />
      <Global
        styles={{
          /* width */
          "::-webkit-scrollbar": {
            width: "7px",
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
      <SideBar />
      <Outlet />
<<<<<<< Updated upstream
      {/* <Success /> */}
=======
      <SkimToast />
>>>>>>> Stashed changes
    </>
  );
}

export default Root;
