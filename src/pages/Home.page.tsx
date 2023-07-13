import { Box, useDisclosure } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Container from "@components/Container";
import { useState, useContext, ChangeEvent, useReducer } from "react";
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
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BottomCheckBox from "@/components/Modal/BottomCheckBox";
import { FilterContent } from "@/query";
import { reducer } from "@/utils/reducers/filterReducer";
import { GetUserCollection } from "@/query/user";
const currentDate = new Date();
const previousMonthDate = new Date(currentDate);
previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

function HomePage() {
  const User = useContext(UserContext) as User;
  const hasInstagram = User.hasInstagram;
  const hasTiktok = User.hasTiktok;
  const [instagramIndex, setInstagramIndex] = useState(User.instagramIndex);
  const [instagramId, setInstagramId] = useState(User.instagramId);
  const [tiktokId, settiktokId] = useState(User.tiktokId);
  const [tiktokIndex, settiktokIndex] = useState(User.tiktokIndex);
  const [cardCheckboxSelected, setCardCheckBoxSelected] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any>(null);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [filterState, dispatch] = useReducer(
    reducer,
    {
      postType: ["post", "reel", "story", "video"],
      verified: 2,
      usageRight: ["PENDING", "APPROVED", "REJECTED", "DEFAULT"],
      contentType: 2,
      postDateRange: {
        startDate: Math.floor(previousMonthDate.getTime() / 1000),
        endDate: Math.floor(currentDate.getTime() / 1000),
      },
      collectionInclude:
        User?.collections?.map((collection) => collection.name) ?? [],
      collectionExclude: [],
      userNames:
        User.instagrams?.map((instagram: any) => instagram.username) || [],
      uniqueIds: User?.tiktoks?.map((tiktok: any) => tiktok.uniqueId) || [],
    },
    (state) => {
      return {
        ...state,
        initialState: {
          ...state,
        },
      };
    }
  );

  const [applyFilterState, setApplyFilterState] = useState<any>(null);
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
  const changeFiltered = (filtered: any) => {
    console.log(filtered);
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
  const instagramContents = useGetInstagramData(instagramData, instagramLoading);
  const tiktokContents = useGetTiktokData(tiktokData, tiktokLoading);
  // const filteredContent = useQuery(FilterContent, {
  //   skip: !applyFilterState,
  //   variables: {
  //     filterContentsJsonInput: JSON.stringify({
  //       usernames: applyFilterState?.userNames,
  //       unique_ids: applyFilterState?.uniqueIds,
  //       type: applyFilterState?.postType,
  //       start_time: applyFilterState?.postDateRange?.startDate,
  //       end_time: applyFilterState?.postDateRange?.endDate,
  //       hashtags: [
  //         "#ethiopia",
  //         "#ethiopian",
  //         "#ethiopianfood",
  //         "#ethiopiancoffee",
  //         "#ethiopianc",
  //       ],
  //       content_type: applyFilterState?.contentType, // 0 => Image, 1 => Video, 2 => All
  //       usage_right: applyFilterState?.usageRight,
  //       followers: 5,
  //       verified: applyFilterState?.verified, // 1 => Verified, 0 => Not Verified, 2 => All
  //       collection_include: applyFilterState?.collectionInclude,
  //       collection_exclude: applyFilterState?.collectionExclude,
  //       likes: 10,
  //       comments: 20,
  //       shares: 50,
  //       views: 50,
  //       limit: 50,
  //       offset: 50,
  //     }),
  //   },
  // });
  if (tiktokLoading || tiktokLoading || filterLoading) {
    return <Loading />;
  }
  return (
    <>
      <NewModal isOpen={isNewOpen} onClose={onNeWClose} />
      <FilterModal
        dispatch={dispatch}
        isOpen={isFilterOpen}
        setApplyFilterState={setApplyFilterState}
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
        {
          filtered !== null ? <FilteredContents data={filtered} cardCheckboxSelected={cardCheckboxSelected} setCardCheckBoxSelected={setCardCheckBoxSelected} /> :
            <Box bg="#FAFAFA" px={5} minH={"100vh"} width={"100%"}>
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
                          key={`i${i}`}
                        />
                      );
                    }),
                    ...tiktokContents.map((video, index) => {
                      return (
                        <TiktokCard
                          cardCheckboxSelected={cardCheckboxSelected}
                          setCardCheckBoxSelected={setCardCheckBoxSelected}
                          video={video}
                          key={`t${index}`}
                        />
                      );
                    }),
                  ]}
                </Masonry>
              </ResponsiveMasonry>
            </Box>
        }
      </Container>
      <BottomCheckBox
        setCardCheckBoxSelected={setCardCheckBoxSelected}
        cardCheckboxSelected={cardCheckboxSelected}
      />
    </>
  );
}

const FilteredContents = ({ data, cardCheckboxSelected, setCardCheckBoxSelected }: { data: any, cardCheckboxSelected: any, setCardCheckBoxSelected: any }) => {
  console.log(data)
  let instaContents = data?.instagrams?.map((instagram: any, i: any) => {
    const instaposts: [] = instagram.posts == 0 ? [] : instagram.posts;

    let posts: any[] = [];

    instaposts.forEach((post) => {
      const { ig_contents }: { ig_contents: [] } = post;
      const {
        owner_username,
        owner_profile_pic_url,
        owner_full_name,
        owner_followers,
        caption,
        id,
      }: {
        owner_username: string;
        owner_profile_pic_url: string;
        owner_full_name: string;
        owner_followers: number;
        caption: string | null;
        id: string;
      } = post;
      posts = [
        ...posts,
        ...ig_contents.map((content) => {
          return {
            owner_username,
            owner_profile_pic_url,
            owner_full_name,
            owner_followers,
            id,
            caption,
            ig_content: content,
          };
        }),
      ];
    });

    const instastories: [] = instagram.stories == null ? [] : instagram.stories;
    let stories: any[] = [];

    instastories.forEach((story) => {
      const { ig_contents }: { ig_contents: [] } = story;
      const {
        owner_username,
        owner_profile_pic_url,
        owner_full_name,
        owner_followers,
        id,
      }: {
        owner_username: string;
        owner_profile_pic_url: string;
        owner_full_name: string;
        owner_followers: number;
        id: string;
      } = story;

      stories = [
        ...stories,
        ...ig_contents.map((content) => {
          return {
            owner_username,
            owner_profile_pic_url,
            owner_full_name,
            owner_followers,
            id,
            ig_content: content,
          };
        }),
      ];
    });
    return [...stories, ...posts, ...(instagram.reels == null ? [] : instagram.reels)];
  });
  //const instagramContents = useGetInstagramData(data, instagramLoading);  
  return (
    <Box bg="#FAFAFA" px={5} minH={"100vh"} width={"100%"}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 575: 1, 720: 2, 900: 3, 1300: 4 }}
      >
        <Masonry gutter="10px">
          {[
            ...instaContents?.map(
              (account: any[], i: any) => {
                return account.map((instadata, index) => {
                  return (
                    <InstagramCard
                      cardCheckboxSelected={cardCheckboxSelected}
                      setCardCheckBoxSelected={setCardCheckBoxSelected}
                      data={instadata}
                      key={`a${i}c${index}`}
                    />
                  );
                })
              }
            ),
            ...data?.tiktoks?.map((tiktok: any, index: any) => {
              return tiktok.videos.map((video: any, i: any) => {
                return (
                  <TiktokCard
                    cardCheckboxSelected={cardCheckboxSelected}
                    setCardCheckBoxSelected={setCardCheckBoxSelected}
                    video={video}
                    key={`${video.id}`}
                  />
                );
              });
            })
          ]}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  )
}

export default HomePage;


