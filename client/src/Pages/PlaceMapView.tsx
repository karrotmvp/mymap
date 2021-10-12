import styled from "styled-components";
import MapView from "../Components/MapView";
import PlaceInfo from "../Components/PlaceInfo";

const PlaceMapView = () => {
  return (
    <Wrapper>
      <MapView height={"100vh"} />
      <div className="place-info">
        <PlaceInfo />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .place-info {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 269px;
  }
`;

export default PlaceMapView;
