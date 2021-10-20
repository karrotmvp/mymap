/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getAroundPlaces } from "../../api/place";
import { Refresh } from "../../assets";
import CreateButton from "../../Components/CreateButton";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { gap, theme, Title, WrapperWithHeaderFooter } from "../../styles/theme";
import AroundMapView from "./AroundMapView";
import InfiniteScroll from "react-infinite-scroll-component";

const Around = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const handleShowMap = (place: PlaceType) => {
    setIsMapShown(true);
    setPlace(place);
  };

  const regionId = useRecoilValue(RegionId);
  const [places, setPlaces] = useState<PlaceType[] | []>([]);
  const [hasMore, setHasMore] = useState(true);
  const [paginator, setPaginator] = useState("");
  const [page, setPage] = useState(1);
  const handleNext = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const fetchAroundPlaces = async () => {
      const data = await getAroundPlaces(regionId, {
        page,
        paginator: paginator ?? null,
      });
      if (data.places.length < 1) {
        setHasMore(false);
        return;
      }
      setPlaces([...places, ...data.places]);
      setPaginator(data.paginator);
    };
    fetchAroundPlaces();
  }, [page]);

  const [leftPlaces, setLeftPlaces] = useState<PlaceType[] | []>([]);
  const [rightPlaces, setRightPlaces] = useState<PlaceType[] | []>([]);
  useEffect(() => {
    const mid = Math.floor(places.length / 2);
    const left = places.slice(0, mid);
    const right = places.slice(mid, places.length);
    setLeftPlaces(left);
    setRightPlaces(right);
  }, [places]);

  return (
    <>
      <Wrapper>
        <Header title="장소 둘러보기">
          <Refresh
            onClick={() => window.location.reload()}
            className="right-icon"
          />
        </Header>
        <Title style={{ color: theme.color.orange }}>{`우리 동네에는
이런 장소가 있어요!`}</Title>

        <InfiniteScroll
          dataLength={places.length}
          next={handleNext}
          style={{ fontSize: 0 }}
          hasMore={hasMore}
          loader={<div />}
        >
          <div className="contents">
            <div className="places">
              {leftPlaces.map((place) => (
                <div key={place.placeId} onClick={() => handleShowMap(place)}>
                  <div className="photo" />
                  <div className="name">{place.name}</div>
                </div>
              ))}
            </div>
            <div className="places">
              {rightPlaces.map((place) => (
                <div key={place.placeId} onClick={() => handleShowMap(place)}>
                  <div className="photo" />
                  <div className="name">{place.name}</div>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>

        {!isMapShown && <CreateButton />}

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
  .contents {
    display: flex;
    flex: 1;
    ${gap("0.8rem")};
  }
  .places {
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
    flex: 0.5;
    margin-top: 1.2rem;
    ${gap("2rem", "column")};
  }
`;

export default Around;
