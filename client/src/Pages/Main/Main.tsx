import { useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import MainSlide from "./MainSlide";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider/PinSlider";
import { dummyPins } from "../../utils/dummy";
import { Back, Close } from "../../assets";

const Main = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const pins: Pin[] = dummyPins.map((pin) => {
    return {
      id: pin.pinId,
      latitude: pin.place.coordinate.latitude,
      longitude: pin.place.coordinate.longitude,
    };
  });

  // 핀 선택
  const [isPinSelected, setIsPinSelected] = useState(false);
  const handleSelectPin = (pin: Pin) => {
    console.log(pin);
    setIsPinSelected(true);
  };

  // scroll up
  const [isScrollUp, setIsScrollUp] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.innerHeight - window.scrollY < 380) {
      setIsScrollUp(true);
    } else {
      setIsScrollUp(false);
    }
  });

  return (
    <Wrapper>
      <Header title={!isPinSelected ? "서비스명" : ""} isGradient={!isScrollUp}>
        {isPinSelected ? (
          <Back className="left-icon" onClick={() => setIsPinSelected(false)} />
        ) : (
          <Close className="left-icon" />
        )}
      </Header>

      <div onClick={() => setIsMapShown(true)}>
        <MapView height="100vh" pins={pins} handleSelectPin={handleSelectPin} />
      </div>

      {!isPinSelected ? (
        <>
          <div onClick={() => setIsMapShown(false)}>
            <MainSlide {...{ isMapShown, isScrollUp }} />
          </div>
          <Footer />
        </>
      ) : (
        <PinSlider pins={dummyPins} isRecommend />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Main;
