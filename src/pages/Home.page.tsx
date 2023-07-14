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

function HomePage() {
  const User = useContext(UserContext) as User;
  const navigate = useNavigate();
  const hasInstagram = User.hasInstagram;
  const hasTiktok = User.hasTiktok;
  const [instagramIndex, setInstagramIndex] = useState(User.instagramIndex);
  const [instagramId, setInstagramId] = useState(User.instagramId);
  const [tiktokId, settiktokId] = useState(User.tiktokId);
  const [tiktokIndex, settiktokIndex] = useState(User.tiktokIndex);
  const [cardCheckboxSelected, setCardCheckBoxSelected] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any>(null);
  const [instagramContents, setInstagramContents] = useState<any[]>([]);
  const [tiktokContents, setTiktokContents] = useState<any[]>([]);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const toast = useToast();
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
  if (User.instagrams.length === 0 && User.tiktoks.length === 0) {
    navigate("/download");
  }

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
    setInstagramContents(ModifyInstagramData(instagramData, instagramLoading))
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
        isOpen={isFilterOpen}
        changeFiltered={changeFiltered}
        setFilterLoading={setFilterLoading}
        onClose={onFilterClose}
        user={User}
      />

      <Container minH={"full"}>
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
            cardCheckboxSelected={cardCheckboxSelected}
            setCardCheckBoxSelected={setCardCheckBoxSelected}
          />
        ) : (
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
                        deleteInstagramContents={deleteInstagramContents}
                        key={`i${i}`}
                      />
                    );
                  }),
                  ...tiktokContents.map((video, index) => {
                    return (
                      <TiktokCard
                        cardCheckboxSelected={cardCheckboxSelected}
                        setCardCheckBoxSelected={setCardCheckBoxSelected}
                        deleteInstagramContents={deleteInstagramContents}
                        video={video}
                        key={`t${index}`}
                      />
                    );
                  }),
                ]}
              </Masonry>
            </ResponsiveMasonry>
          </Box>
        )}
      </Container>
      <BottomCheckBox
        setCardCheckBoxSelected={setCardCheckBoxSelected}
        cardCheckboxSelected={cardCheckboxSelected}
      />
    </>
  );
}

const FilteredContents = ({
  data,
  cardCheckboxSelected,
  setCardCheckBoxSelected,
}: {
  data: any;
  cardCheckboxSelected: any;
  setCardCheckBoxSelected: any;
}) => {
  const [instagramContents, setInstagramContents] = useState<any[]>(ModifyFilterInstagramData(data?.instagrams));

  const [tiktokContents, setTiktokContents] = useState<any[]>(ModifyFilterTikTokData(data?.tiktoks));

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
  return [
    ...stories,
    ...posts,
    ...(instagram.reels == null ? [] : instagram.reels),
  ];
});
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
  <Box bg="#FAFAFA" px={5} minH={"100vh"} width={"100%"}>
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
                    cardCheckboxSelected={cardCheckboxSelected}
                    setCardCheckBoxSelected={setCardCheckBoxSelected}
                    data={instadata}
                    deleteInstagramContents={deleteInstagramContents}
                    key={`a${i}c${index}`}
                  />
                );
              })
            }
          ),
          ...tiktokContents.map((video, index) => {
            return <TiktokCard
              cardCheckboxSelected={cardCheckboxSelected}
              setCardCheckBoxSelected={setCardCheckBoxSelected}
              video={video}
              deleteInstagramContents={deleteInstagramContents}
              key={`${video.id}`}
            />
          }),
        ]}
      </Masonry>
    </ResponsiveMasonry>
  </Box>
);
};

export default HomePage;
