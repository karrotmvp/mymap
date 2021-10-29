import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { PinType } from "../../Shared/type";
import { flexCenter } from "../../styles/theme";
import PlaceBox, { PlaceBoxType } from "../PlaceBox";
import Swiper from "./Swiper";

interface PinSliderProps {
  pins: PinType[];
  current: number;
  setCurrent: (index: number) => void;
  setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  placeBoxType: PlaceBoxType;
}

const PinSlider = ({
  pins,
  current,
  setCurrent,
  setCenter,
  placeBoxType,
}: PinSliderProps) => {
  const handleChangle = (index: number) => {
    setCurrent(index);
    setCenter({
      lat: pins[index].place.coordinates.latitude,
      lng: pins[index].place.coordinates.longitude,
    });
  };
  return (
    <Wrapper>
      <Swiper
        current={current}
        onChange={(i) => handleChangle(i)}
        contents={pins.map((pin) => (
          <div key={pin.pinId} className="carousel-cell">
            <PlaceBox
              place={pin.place}
              className="place-box"
              type={placeBoxType}
            />
          </div>
        ))}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1.9rem;
  z-index: 50;
  .flickity-slider {
    ${flexCenter};
    height: 100%;
  }
  .carousel-cell {
    margin-right: 0.8rem;
    padding: 1.6rem 0;
  }
  .place-box {
    width: 30.3rem;
  }
  .recommend {
    margin-top: 0.8rem;
  }
`;

export default PinSlider;
