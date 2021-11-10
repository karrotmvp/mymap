import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Back } from "../../assets";
import Header from "../../Components/Header";
import MapView, { Pin } from "../../Components/MapView";
import PlaceBox from "../../Components/PlaceCard";
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
    id: place.placeId,
    latitude: place.coordinates.latitude,
    longitude: place.coordinates.longitude,
  };
  return (
    <Wrapper>
      <Header isTransparent>
        <Back className="left-icon" onClick={close} />
      </Header>
      <MapView
        height="100vh"
        pins={[pin]}
        center={{ lat: pin.latitude, lng: pin.longitude }}
      />

      <div className="placebox">
        <PlaceBox type="map" {...{ place }} />
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
    bottom: 2.8rem;
    & > div {
      padding: 1.4rem 1.5rem;
    }
  }
`;

export default AroundMapView;
