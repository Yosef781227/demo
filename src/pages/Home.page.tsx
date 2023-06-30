import { Box, useDisclosure } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Container from "@components/Container";
import { useState, useContext, ChangeEvent } from "react";
import { UserContext } from "@/App";
import FilterModal from "@/components/Modal/FilterModal";
import TiktokCard from "@/components/Card/TiktokCard";
import InstagramCard from "@/components/Card/InstagramCard";
import Loading from "@/components/Loading";
import { User } from "@/interfaces/user.interface";
import { useQuery } from "@apollo/client";
import useGetInstagramData from "@/hooks/instagram";
import useGetTiktokData from "@/hooks/tiktok";
import HomePageTopNavBar from "@/components/Navbar/HomePageTopNavBar";
import NewModal from "@/components/Modal/NewModal";
import { GetInstagramQuery } from "@/query/instagram";
import { GetTiktokQuery } from "@/query/tiktok";
import MasonryLayout from "@/layouts/MansoryLayout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
function HomePage() {
  const User = useContext(UserContext) as User;
  const hasInstagram = User.hasInstagram;
  const hasTiktok = User.hasTiktok;
  const [instagramIndex, setInstagramIndex] = useState(User.instagramIndex);
  const [instagramId, setInstagramId] = useState(User.instagramId);
  const [tiktokId, settiktokId] = useState(User.tiktokId);
  const [tiktokIndex, settiktokIndex] = useState(User.tiktokIndex);
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onClose: onNeWClose,
  } = useDisclosure();

  const [startDate, setStartDate] = useState(new Date());

  const changeTiktokAcount = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    localStorage.removeItem("selectedTiktokIndex");
    localStorage.setItem("selectedTiktokIndex", index.toString());
    const tiktokId = e.target.value;
    settiktokIndex(index);
    settiktokId(tiktokId);
  };
  const changeAcount = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    localStorage.removeItem("selectedInstagramIndex");
    localStorage.setItem("selectedInstagramIndex", index.toString());
    const instagramId = e.target.value;
    setInstagramIndex(index);
    setInstagramId(instagramId);
  };
  const {
    loading: instagramLoading,
    error: instagramError, //TODO: error handling
    data: instagramData,
  } = useQuery(GetInstagramQuery, {
    skip: !hasInstagram,
    variables: { jsonInput: JSON.stringify({ instagram_id: instagramId }) },
  });
  const {
    loading: tiktokLoading,
    error: tiktokError, //TODO: error handling
    data: tiktokData,
  } = useQuery(GetTiktokQuery, {
    skip: !hasTiktok,
    variables: {
      jsonInput: JSON.stringify({
        tik_tok_id: tiktokId,
      }),
    },
  });
  const instagramContents = useGetInstagramData(
    instagramData,
    instagramLoading
  );
  const tiktokContents = useGetTiktokData(tiktokData, tiktokLoading);
  if (tiktokLoading || tiktokLoading) {
    return <Loading />;
  }
  return (
    <>
      <NewModal isOpen={isNewOpen} onClose={onNeWClose} />
      <FilterModal
        setStartDate={setStartDate}
        startDate={startDate}
        isOpen={isFilterOpen}
        onClose={onFilterClose}
      />

      <Container>
        <HomePageTopNavBar
          changeTiktokAcount={changeTiktokAcount}
          changeAccount={changeAcount}
          onFilterOpen={onFilterOpen}
          onNewOpen={onNewOpen}
          tiktokId={tiktokId}
          instagramId={instagramId}
        />
        <Box bg="#FAFAFA" px={5} minH={"100vh"} width={"100%"}>
          <ResponsiveMasonry columnsCountBreakPoints={{ 575: 1, 720: 2, 900: 3, 1300: 4 }} >
            <Masonry gutter="10px">
              {[
                ...instagramContents.map((instadata, i) => {
                  return <InstagramCard data={instadata} key={i} />;
                }),
                ...tiktokContents.map((video, index) => {
                  return <TiktokCard video={video} key={index} />;
                }),
              ]}
            </Masonry>
          </ResponsiveMasonry>
          {/* <MasonryLayout
            items={[
              ...instagramContents.map((instadata, i) => {
                return <InstagramCard data={instadata} key={i} />;
              }),
              ...tiktokContents.map((video, index) => {
                return <TiktokCard video={video} key={index} />;
              }),
            ]}
            columnWidth={0}
            gap={10}
          /> */}
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
