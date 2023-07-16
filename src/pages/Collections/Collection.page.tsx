import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { GetCollection } from "@/query/collection";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import InstagramCard from "@/components/Card/InstagramCard";
import TiktokCard from "@/components/Card/TiktokCard";
import BottomCheckBox from "@/components/Modal/BottomCheckBox";
import CollectionPageTopNavBar from "@/components/Navbar/CollectionPageTopNavBar";
import FilterModal from "@/components/Modal/FilterModal";
import { Box, useToast, useDisclosure } from "@chakra-ui/react";
import { reducer } from "@/utils/reducers/filterReducer";
import { UserContext } from "@/App";
import { User } from "@/interfaces/user.interface";
import client from "@/client";
import { set } from "date-fns";
import {
  ModifyCollectionInstaContents,
  ModifyCollectionTikTokContents,
} from "@/utils/data-modifier";
import { InstagramCollectionMutation } from "@/query/instagram";
import { RemoveVideoFromCollection } from "@/query/tiktok";
type cardCheckboxSelectedType = {
  ids: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  };
  urls: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  };
};
function Collection() {
  const { collectionId } = useParams();
  const [instagramContents, setInstagramContents] = useState<any[]>([]);
  const [tiktokContents, setTiktokContents] = useState<any[]>([]);
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const { data, loading, error } = useQuery(GetCollection, {
    variables: {
      jsonInput: JSON.stringify({ id: collectionId }),
    },
  });
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();
  const User = useContext(UserContext) as User;
  const [filterState, dispatch] = useReducer(
    reducer,
    {
      postType: ["post", "reel", "story", "video"],
      verified: 2,
      usageRight: ["PENDING", "APPROVED", "REJECTED", "DEFAULT"],
      contentType: 2,
      postDateRange: {
        startDate: new Date(0).getTime(),
        endDate: new Date().getTime(),
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
  const [cardCheckboxSelected, setCardCheckBoxSelected] =
    useState<cardCheckboxSelectedType>({
      ids: { posts: [], reels: [], stories: [], videos: [] },
      urls: { posts: [], reels: [], stories: [], videos: [] },
    });
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<any>(null);
  const toast = useToast();
  useEffect(() => {
    setInstagramContents(
      ModifyCollectionInstaContents(data?.getCollection, loading)
    );
    setTiktokContents(
      ModifyCollectionTikTokContents(data?.getCollection, loading)
    );
  }, [data]);
  console.log(tiktokContents);
  useEffect(() => {
    setDeleteCount(
      cardCheckboxSelected.ids.posts.length +
      cardCheckboxSelected.ids.reels.length +
      cardCheckboxSelected.ids.stories.length +
      cardCheckboxSelected.ids.videos.length
    );
  }, [cardCheckboxSelected]);

  const changeFiltered = (filtered: any) => {
    setFiltered(filtered);
  };

  const deleteInstagramContents = (data: {
    posts: string[];
    reels: string[];
    stories: string[];
    videos: string[];
  }) => {
    client
      .mutate({
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
      })
      .then((res) => {
        if (res.data.deleteContents.success) {
          if (
            data.posts.length > 0 ||
            data.reels.length > 0 ||
            data.stories.length > 0
          ) {
            const newInstagramContents = instagramContents.filter(
              (content) =>
                data.posts.includes(content.id) ||
                data.reels.includes(content.id) ||
                data.stories.includes(content.id)
            );
            setInstagramContents(newInstagramContents);
          }
          if (data.videos.length > 0) {
            const newTiktokContents = tiktokContents.filter((content) =>
              data.videos.includes(content.id)
            );
            setTiktokContents(newTiktokContents);
          }
        }
        console.log(res);
        toast({
          title: res.data.deleteContents.success ? "Success" : "Error",
          description: res.data.deleteContents.message,
          status: res.data.deleteContents.success ? "success" : "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const RemoveFromCollection = async ({ contentId, type }:
    { contentId: string; type: "post" | "reel" | "story" | "video"; }) => {
    let variables: any = {
      collectionId: collectionId,
    };
    type === "post" && (variables.postId = contentId);
    type === "reel" && (variables.reelId = contentId);
    type === "story" && (variables.storyId = contentId);
    type === "video" && (variables.videoId = contentId);

    const response = await client.mutate({
      mutation: type === "post" ? InstagramCollectionMutation.removePostFromCollection : type === "reel" ? InstagramCollectionMutation.removeReelFromCollection : type === "story" ? InstagramCollectionMutation.removeStoryFromCollection : RemoveVideoFromCollection,
      variables: {
        jsonInput: JSON.stringify(variables),
      },
    })

    const { success, message, data: resData } = response.data[type === "post" ? "removePostFromCollection" : type === "reel" ? "removeReelFromCollection" : type === "story" ? "removeStoryFromCollection" : "removeVideoFromCollection"];

    if (success) {
      if (type === "post" || type === "reel" || type === "story") {
        const newInstagramContents = instagramContents.filter(
          (content) => !contentId.includes(content.id)
        );
        setInstagramContents(newInstagramContents);
      } else {
        const newTiktokContents = tiktokContents.filter(
          (content) => !contentId.includes(content.id)
        );
        setTiktokContents(newTiktokContents);
      }
    }
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <FilterModal
        isOpen={isFilterOpen}
        changeFiltered={changeFiltered}
        setFilterLoading={setFilterLoading}
        onClose={onFilterClose}
        user={User}
      />
      <Container>
        <CollectionPageTopNavBar
          onFilterOpen={onFilterOpen}
          collectionName={data.getCollection.name}
        />
        <Box bg="#FAFAFA" px={5} minH={"100vh"} width={"100%"}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 575: 1, 720: 2, 900: 3, 1300: 4 }}
          >
            <Masonry gutter="10px">
              {[
                ...instagramContents.map((instadata, i) => {
                  return (
                    <InstagramCard
                      page="COLLECTION"
                      cardCheckboxSelected={cardCheckboxSelected}
                      setCardCheckBoxSelected={setCardCheckBoxSelected}
                      data={instadata}
                      deleteInstagramContents={null}
                      RemoveFromCollection={RemoveFromCollection}
                      key={`i${i}`}
                    />
                  );
                }),
                ...tiktokContents.map((video, index) => {
                  return (
                    <TiktokCard
                      page="COLLECTION"
                      cardCheckboxSelected={cardCheckboxSelected}
                      setCardCheckBoxSelected={setCardCheckBoxSelected}
                      deleteInstagramContents={null}
                      RemoveFromCollection={RemoveFromCollection}
                      video={video}
                      key={`t${index}`}
                    />
                  );
                }),
              ]}
            </Masonry>
          </ResponsiveMasonry>
        </Box>
      </Container>
      {filtered == null && (
        <BottomCheckBox
          deleteCount={deleteCount}
          setCardCheckBoxSelected={setCardCheckBoxSelected}
          cardCheckboxSelected={cardCheckboxSelected}
          deleteInstagramContents={deleteInstagramContents}
        />
      )}
    </>
  );
}

export default Collection;
