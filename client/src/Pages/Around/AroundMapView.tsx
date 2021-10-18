import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Back } from "../../assets";
import Header from "../../Components/Header";
import MapView, { Pin } from "../../Components/MapView";
import PlaceBox from "../../Components/PlaceBox";
import { PlaceType } from "../../Shared/type";
import { flexCenter } from "../../styles/theme";

const AroundMapView = ({
  place,
  close,
}: {
  place: PlaceType;
  close: MouseEventHandler;
}) => {
  const pin: Pin = {
    id: parseInt(place.placeId),
    latitude: place.coordinate.latitude,
    longitude: place.coordinate.longitude,
  };
  return (
    <Wrapper>
      <Header isGradient>
        <Back className="left-icon" onClick={close} />
      </Header>
      <MapView height="100vh" pins={[pin]} />

      <div className="placebox">
        <PlaceBox {...{ place }}>
          <>
            <div className="phone">010-0000-0000</div>
            <div className="time">09:00 - 22:00 연중무휴</div>
            <div className="recommend">
              13명의 주민들이 이 장소를 추천했어요!
            </div>
          </>
        </PlaceBox>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 200;
  .placebox {
    ${flexCenter};
    width: 100%;
    position: fixed;
    z-index: 300;
    bottom: 3.5rem;
    & > div {
      padding: 1.4rem 1.5rem;
    }
  }
`;

export default AroundMapView;
