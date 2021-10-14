import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import MapView from "../Components/MapView";
import PlaceInfo from "../Components/PlaceInfo";
import { Places } from "../Shared/atom";
import { PlaceType } from "../Shared/type";
import { Button } from "../styles/theme";

const PlaceMapView = ({
  place,
  setIsSearchOpened,
}: {
  place: PlaceType;
  setIsSearchOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [places, setPlaces] = useRecoilState(Places);

  const handleAddPlace = (place: PlaceType) => {
    setPlaces([...places, place]);
    setIsSearchOpened(false);
  };

  return (
    <Wrapper>
      <MapView
        height={"100vh"}
        markers={[
          {
            placeId: place.placeId,
            lat: place.coordinate.latitude,
            lng: place.coordinate.longitude,
          },
        ]}
      />
      <div className="place-info">
        <div className="photo" />
        <PlaceInfo {...{ place }} />
      </div>
      <AddBtn onClick={() => handleAddPlace(place)}>장소 추가</AddBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .photo {
    min-width: 10rem;
    height: 10rem;
    background-color: lightgray;
    border-radius: 0.8rem;
  }
  .place-info {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 9.7rem;
    background-color: #fff;
    margin: 0 2rem;
    box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
    border-radius: 1.6rem;
    padding: 1.8rem;
  }
`;

const AddBtn = styled(Button)`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 2rem;
  bottom: 3.5rem;
`;

export default PlaceMapView;
