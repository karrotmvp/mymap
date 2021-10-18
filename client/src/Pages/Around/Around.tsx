import { useState } from "react";
import styled from "styled-components";
import CreateButton from "../../Components/CreateButton";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { PlaceType } from "../../Shared/type";
import { gap, theme, Title, WrapperWithHeaderFooter } from "../../styles/theme";
import { dummyPlaces } from "../../utils/dummy";
import AroundMapView from "./AroundMapView";

const Around = () => {
  const leftPlaces = dummyPlaces.slice(0, dummyPlaces.length / 2);
  const rightPlaces = dummyPlaces.slice(leftPlaces.length, dummyPlaces.length);

  const [isMapShown, setIsMapShown] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const handleShowMap = (place: PlaceType) => {
    setIsMapShown(true);
    setPlace(place);
  };

  return (
    <>
      <Wrapper>
        <Header title="장소 둘러보기" />
        <Title style={{ color: theme.color.orange }}>{`우리 동네에는
이런 장소가 있어요!`}</Title>

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
