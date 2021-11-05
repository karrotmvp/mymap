/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getAroundPlaces } from "../../api/place";
import { Close } from "../../assets";
import CreateButton from "../../Components/CreateButton";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { gap, Title, WrapperWithHeaderFooter } from "../../styles/theme";
import AroundMapView from "./AroundMapView";
import InfiniteScroll from "react-infinite-scroll-component";
import AroundBox from "../../Components/AroundBox";

const Around = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const handleShowMap = (place: PlaceType) => {
    setIsMapShown(true);
    setPlace(place);
  };

  const regionId = useRecoilValue(RegionId);
  const [leftPlaces, setLeftPlaces] = useState<PlaceType[] | []>([]);
  const [rightPlaces, setRightPlaces] = useState<PlaceType[] | []>([]);

  const [hasMore, setHasMore] = useState(true);
  const [leftPaginator, setLeftPaginator] = useState("");
  const [rightPaginator, setRightPaginator] = useState("");
  const [page, setPage] = useState(1);
  const handleNext = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const fetchAroundPlacesLeft = async () => {
      const leftData = await getAroundPlaces(regionId, {
        page,
        perPage: 20,
        paginator: leftPaginator ?? null,
      });
      if (leftData.places.length < 1) {
        setHasMore(false);
        return;
      }
      setLeftPlaces([...leftPlaces, ...leftData.places]);
      setLeftPaginator(leftData.paginator);
    };

    const fetchAroundPlacesRight = async () => {
      const rightData = await getAroundPlaces(regionId, {
        page,
        perPage: 20,
        paginator: rightPaginator ?? null,
      });
      if (rightData.places.length < 1) {
        setHasMore(false);
        return;
      }
      setRightPlaces([...rightPlaces, ...rightData.places]);
      setRightPaginator(rightData.paginator);
    };

    fetchAroundPlacesLeft();
    fetchAroundPlacesRight();
  }, [page]);

  return (
    <>
      <Wrapper>
        <Header title="장소 둘러보기">
          <Close className="left-icon" />
          {/* <Refresh
            onClick={() => {
              // history.push("/around");
              window.location.reload();
              window.scrollTo(0, 0);
            }}
            className="right-icon"
          /> */}
        </Header>

        <div id="around-scroll">
          <Title>{`우리 동네에는
이런 장소가 있어요!`}</Title>

          <InfiniteScroll
            dataLength={leftPlaces.length + rightPlaces.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<div />}
            scrollableTarget="around-scroll"
          >
            <div className="contents">
              <div className="places">
                {leftPlaces.map((place) => (
                  <div key={place.placeId} onClick={() => handleShowMap(place)}>
                    <AroundBox {...place} />
                  </div>
                ))}
              </div>
              <div className="places">
                {rightPlaces.map((place) => (
                  <div key={place.placeId} onClick={() => handleShowMap(place)}>
                    <AroundBox {...place} />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>

        {!isMapShown && <CreateButton targetId="around-scroll" />}

        <Footer />
      </Wrapper>

      {isMapShown && place && (
        <AroundMapView {...{ place }} close={() => setIsMapShown(false)} />
      )}
    </>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeaderFooter};
  padding-left: 2rem;
  padding-right: 2rem;
  #around-scroll {
    height: 100vh;
    padding-top: 3rem;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .contents {
    display: flex;
    margin-top: 2.3rem;
    width: 100%;
  }
  .places {
    width: 50%;
    .photo {
      width: 100%;
      height: 10rem;
      background-color: lightgray;
      border-radius: 0.8rem;
    }
    .name {
      margin-top: 0.7rem;
      font-size: 1.4rem;
      letter-spacing: -2%;
      line-height: 140%;
    }
    &:first-child {
      margin-right: 0.6rem;
    }
    &:last-child {
      margin-left: 0.6rem;
    }
    margin-top: 1.2rem;
    ${gap("1.2rem", "column")};
  }
`;

export default Around;
