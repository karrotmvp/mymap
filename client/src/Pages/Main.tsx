import { useState } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import MainSlide from "../Components/MainSlide";
import MapView, { Pin } from "../Components/MapView";
import { WrapperWithFooter } from "../styles/theme";
import { dummyPins } from "../utils/dummy";

const Main = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const pins: Pin[] = dummyPins.map((pin) => {
    return {
      id: pin.pinId,
      latitude: pin.place.coordinate.latitude,
      longitude: pin.place.coordinate.longitude,
    };
  });

  return (
    <Wrapper>
      <div onClick={() => setIsMapShown(true)}>
        <MapView height="100vh" pins={pins} />
      </div>
      <div onClick={() => setIsMapShown(false)}>
        <MainSlide {...{ isMapShown }} />
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithFooter};
`;

export default Main;
