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
import { mini } from "../../App";
import PlaceCard from "../../Components/PlaceCard";

const Around = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const handleShowMap = (place: PlaceType) => {
    setIsMapShown(true);
    setPlace(place);
  };

  const regionId = useRecoilValue(RegionId);
  const [places, setPlaces] = useState<PlaceType[] | []>([]);
  useEffect(() => {
    const fetchAroundPlaces = async () => {
      const data = await getAroundPlaces(regionId);
      setPlaces([...places, ...data.places]);
    };
    fetchAroundPlaces();
  }, []);

  return (
    <>
      <Wrapper>
        <Header title="장소 둘러보기">
          <Close className="left-icon" onClick={() => mini.close()} />
        </Header>

        <div id="around-scroll">
          <Title>{`우리 동네에는
이런 장소가 있어요!`}</Title>

          <div className="cards">
            {places.map((place) => (
              <div key={place.placeId} onClick={() => handleShowMap(place)}>
                <PlaceCard {...{ place }} type="list" />
              </div>
            ))}
          </div>
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
