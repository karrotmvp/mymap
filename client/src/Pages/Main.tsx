import { useState } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MainSlide from "../Components/MainSlide";
import MapView from "../Components/MapView";
import { WrapperWithFooter } from "../styles/theme";

const Main = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  return (
    <Wrapper>
      <div onClick={() => setIsMapShown(true)}>
        <MapView height="100vh" />
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
