import { Box, useToast, useDisclosure } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Container from "@components/Container";
import { useState, useContext, ChangeEvent, useReducer, useEffect } from "react";
import { UserContext } from "@/App";
import FilterModal from "@/components/Modal/FilterModal";
import TiktokCard from "@/components/Card/TiktokCard";
import InstagramCard from "@/components/Card/InstagramCard";
import Loading from "@/components/Loading";
import { User } from "@/interfaces/user.interface";
import { gql, useQuery } from "@apollo/client";
import useGetInstagramData from "@/hooks/instagram";
import useGetTiktokData from "@/hooks/tiktok";
import HomePageTopNavBar from "@/components/Navbar/HomePageTopNavBar";
import NewModal from "@/components/Modal/NewModal";
import { GetInstagramQuery } from "@/query/instagram";
import { GetTiktokQuery } from "@/query/tiktok";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BottomCheckBox from "@/components/Modal/BottomCheckBox";
import { FilterContent } from "@/query";
import { reducer } from "@/utils/reducers/filterReducer";
import { GetUserCollection } from "@/query/user";
import { useNavigate } from "react-router-dom";
import client from "@/client";
import { vi } from "date-fns/locale";
import { ModifyFilterInstagramData, ModifyFilterTikTokData, ModifyInstagramData, ModifyTikTokData } from "@/utils/data-modifier";
const currentDate = new Date();
const previousMonthDate = new Date(currentDate);
previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
type cardCheckboxSelected = {
  ids: { posts: string[], reels: string[], stories: string[], videos: string[] },
  urls: { posts: string[], reels: string[], stories: string[], videos: string[] },
}
function HomePage() {
  const User = useContext(UserContext) as User;
  const navigate = useNavigate();
  const hasInstagram = User.hasInstagram;
  const hasTiktok = User.hasTiktok;
  const [instagramIndex, setInstagramIndex] = useState(User.instagramIndex);
  const [instagramId, setInstagramId] = useState(User.instagramId);
  const [tiktokId, settiktokId] = useState(User.tiktokId);
  const [tiktokIndex, settiktokIndex] = useState(User.tiktokIndex);
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [cardCheckboxSelected, setCardCheckBoxSelected] = useState<cardCheckboxSelected>({ ids: { posts: [], reels: [], stories: [], videos: [] }, urls: { posts: [], reels: [], stories: [], videos: [] } });
  const [filtered, setFiltered] = useState<any>(null);
  const [instagramContents, setInstagramContents] = useState<any[]>([]);
  const [tiktokContents, setTiktokContents] = useState<any[]>([]);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const toast = useToast();

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
  if (User.instagrams.length === 0 && User.tiktoks.length === 0) {
    navigate("/download");
  }
  useEffect(() => {
    setDeleteCount(cardCheckboxSelected.ids.posts.length + cardCheckboxSelected.ids.reels.length + cardCheckboxSelected.ids.stories.length + cardCheckboxSelected.ids.videos.length);
  }, [cardCheckboxSelected]);
  const changeFiltered = (filtered: any) => {
    setFiltered(filtered);
  };

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

  useEffect(() => {
    setInstagramContents(ModifyInstagramData(instagramData?.getInstagramAccount, instagramLoading))
  }, [instagramData]);
  useEffect(() => {
    setTiktokContents(ModifyTikTokData(tiktokData, tiktokLoading))
  }, [tiktokData]);

  const deleteInstagramContents = (data: { posts: string[], reels: string[], stories: string[], videos: string[] }) => {
    client.mutate({
      mutation: gql`
        mutation Mutation($jsonInput: String!) {
          deleteContents(json_input: $jsonInput) {
            success
            message
            data
          }
        }
      `,
      variables: {
        jsonInput: JSON.stringify(data),
      },
    }).then((res) => {
      if (res.data.deleteContents.success) {
        if (data.posts.length > 0 || data.reels.length > 0 || data.stories.length > 0) {
          const newInstagramContents = instagramContents.filter(
            (content) => data.posts.includes(content.id) || data.reels.includes(content.id) || data.stories.includes(content.id)
          );
          setInstagramContents(newInstagramContents);
        }
        if (data.videos.length > 0) {
          const newTiktokContents = tiktokContents.filter(
            (content) => data.videos.includes(content.id)
          );
          setTiktokContents(newTiktokContents);
        }
      }
      toast({
        title: res.data.deleteContents.success ? "Success" : "Error",
        description: res.data.deleteContents.message,
        status: res.data.deleteContents.success ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
    }).catch((err) => {
      console.log(err)
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    })
  };

  if (tiktokLoading || tiktokLoading || filterLoading) {
    return <Loading />;
  }
  return (
    <>
      <NewModal isOpen={isNewOpen} onClose={onNeWClose} user={User} />
      <FilterModal
        isOpen={isFilterOpen}
        changeFiltered={changeFiltered}
        setFilterLoading={setFilterLoading}
        onClose={onFilterClose}
        user={User}
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
        {filtered !== null ? (
          <FilteredContents
            data={filtered}
            allCollections={User.collections}
            cardCheckboxSelected={cardCheckboxSelected}
            setCardCheckBoxSelected={setCardCheckBoxSelected}
          />
        ) : (
          <Box bg="neutral.100" px={5} minH={"100vh"} width={"100%"} >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 575: 1, 720: 2, 900: 3, 1300: 4 }}
            >
              <Masonry gutter="10px">
                {[
                  ...instagramContents.map((instadata, i) => {
                    return (
                      <InstagramCard
                        cardCheckboxSelected={cardCheckboxSelected}
                        setCardCheckBoxSelected={setCardCheckBoxSelected}
                        data={instadata}
                        deleteInstagramContents={deleteInstagramContents}
                        key={`i${i}`}
                      />
                    );
                  }),
                  ...tiktokContents.map((video, index) => {
                    return (
                      <TiktokCard
                        page="CONTENT"
                        cardCheckboxSelected={cardCheckboxSelected}
                        video={video}
                        key={`t${index}`}
                        setCardCheckBoxSelected={setCardCheckBoxSelected}
                        deleteInstagramContents={deleteInstagramContents}
                      />
                    );
                  }),
                ]}
              </Masonry>
            </ResponsiveMasonry>
          </Box>
        )}
      </Container>
      {filtered == null && <BottomCheckBox
        deleteCount={deleteCount}
        setCardCheckBoxSelected={setCardCheckBoxSelected}
        cardCheckboxSelected={cardCheckboxSelected}
        deleteInstagramContents={deleteInstagramContents}
      />}
    </>
  );
}

const FilteredContents = ({ data, allCollections, cardCheckboxSelected, setCardCheckBoxSelected }: {
  data: any;
  allCollections: any[];
  cardCheckboxSelected: any;
  setCardCheckBoxSelected: any;
}) => {
  const [instagramContents, setInstagramContents] = useState<any[]>(ModifyFilterInstagramData(data?.instagrams));

  const [tiktokContents, setTiktokContents] = useState<any[]>(ModifyFilterTikTokData(data?.tiktoks));
  const deleteInstagramContents = (data: { posts: string[], reels: string[], stories: string[], videos: string[] }) => {
    client.mutate({
      mutation: gql`
        mutation Mutation($jsonInput: String!) {
          deleteContents(json_input: $jsonInput) {
            success
            message
            data
          }
        }
      `,
      variables: {
        jsonInput: JSON.stringify(data),
      },
    }).then((res) => {
      if (res.data.deleteContents.success) {
        if (data.posts.length > 0 || data.reels.length > 0 || data.stories.length > 0) {
          const newInstagramContents = instagramContents.filter(
            (content) => data.posts.includes(content.id) || data.reels.includes(content.id) || data.stories.includes(content.id)
          );
          setInstagramContents(newInstagramContents);
        }
        if (data.videos.length > 0) {
          const newTiktokContents = tiktokContents.filter(
            (content) => data.videos.includes(content.id)
          );
          setTiktokContents(newTiktokContents);
        }
      }
      console.log(res)
      toast({
        title: res.data.deleteContents.success ? "Success" : "Error",
        description: res.data.deleteContents.message,
        status: res.data.deleteContents.success ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
    }).catch((err) => {
      console.log(err)
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    })
  };

  const toast = useToast();

  return (
    <Box bg="#FAFAFA" px={5} pb={8} minH={"100vh"} width={"100%"}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 575: 1, 720: 2, 900: 3, 1300: 4 }}
      >
        <Masonry gutter="10px">
          {[
            ...instagramContents?.map(
              (account: any[], i: any) => {
                return account.map((instadata, index) => {
                  return (
                    <InstagramCard
                      data={instadata}
                      cardCheckboxSelected={cardCheckboxSelected}
                      key={`a${i}c${index}`}
                      setCardCheckBoxSelected={setCardCheckBoxSelected}
                      deleteInstagramContents={deleteInstagramContents}

                    />
                  );
                })
              }
            ),
            ...tiktokContents.map((video, index) => {
              return <TiktokCard
                page="FILTER"
                cardCheckboxSelected={cardCheckboxSelected}
                video={video}
                key={`${video.id}`}
                setCardCheckBoxSelected={setCardCheckBoxSelected}
                deleteInstagramContents={deleteInstagramContents}
              />
            }),
          ]}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  );
};

export default HomePage;
