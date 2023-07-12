import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { GetCollection } from "@/query/collection";
import { useQuery } from "@apollo/client";
import React, { useContext, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import InstagramCard from "@/components/Card/InstagramCard";
import TiktokCard from "@/components/Card/TiktokCard";
import BottomCheckBox from "@/components/Modal/BottomCheckBox";
import CollectionPageTopNavBar from "@/components/Navbar/CollectionPageTopNavBar";
import FilterModal from "@/components/Modal/FilterModal";
import { useDisclosure } from "@chakra-ui/react";
import { reducer } from "@/utils/reducers/filterReducer";
import { UserContext } from "@/App";
import { User } from "@/interfaces/user.interface";

function Collection() {
  const { collectionId } = useParams();
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
  const [filterState, dispatch] = useReducer(reducer, {
    postType: ["post", "reel", "story", "video"],
  });
  const [applyFilterState, setApplyFilterState] = useState<any>(null);
  const [cardCheckboxSelected, setCardCheckBoxSelected] = useState<any[]>([]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <FilterModal
        filterState={filterState}
        dispatch={dispatch}
        isOpen={isFilterOpen}
        setApplyFilterState={setApplyFilterState}
        onClose={onFilterClose}
        user={User}
      />
      <Container>
        <CollectionPageTopNavBar
          onFilterOpen={onFilterOpen}
          collectionName={data.getCollection.name}
        />
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 575: 1, 720: 2, 900: 3, 1300: 4 }}
        >
          <Masonry gutter="10px">
            {[
              ...[...data.getCollection.posts, ...data.getCollection.reels].map(
                (instadata, i) => {
                  return (
                    <InstagramCard
                      cardCheckboxSelected={cardCheckboxSelected}
                      setCardCheckBoxSelected={setCardCheckBoxSelected}
                      data={instadata}
                      key={`i${i}`}
                    />
                  );
                }
              ),
              ...[...data.getCollection.videos].map((video, index) => {
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
      </Container>
      <BottomCheckBox
        setCardCheckBoxSelected={setCardCheckBoxSelected}
        cardCheckboxSelected={cardCheckboxSelected}
      />
    </>
  );
}

export default Collection;
