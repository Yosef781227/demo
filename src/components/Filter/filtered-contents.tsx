import Masonry from "react-responsive-masonry";
import InstagramCard from "../Card/InstagramCard";
import TiktokCard from "../Card/TiktokCard";

const FilteredContents = (data: any, cardCheckboxSelected: any, setCardCheckBoxSelected: any) => {
    return (
        <Masonry gutter="10px">
            {[
                ...data?.instagrams?.map(
                    (instadata: any, i: any) => {
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
                ...data?.tiktoks?.map(
                    (video: any, index: any) => {
                        return (
                            <TiktokCard
                                cardCheckboxSelected={cardCheckboxSelected}
                                setCardCheckBoxSelected={setCardCheckBoxSelected}
                                video={video}
                                key={`t${index}`}
                            />
                        );
                    }
                ),
            ]}
        </Masonry>
    )
}

export default FilteredContents;