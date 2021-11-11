import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { PlaceType } from "../../Shared/type";
import PlaceBox, { PlaceCardType } from "../PlaceCard";
import Swiper from "./Swiper";

interface PinSliderProps {
  pins: PlaceType[];
  current: number;
  setCurrent: (index: number) => void;
  setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  placeCardType: PlaceCardType;
  style?: React.CSSProperties;
}

const PinSlider = ({
  pins,
  current,
  setCurrent,
  setCenter,
  placeCardType,
  style,
}: PinSliderProps) => {
  const handleChangle = (index: number) => {
    setCurrent(index);
    setCenter({
      lat: pins[index].coordinates.latitude,
      lng: pins[index].coordinates.longitude,
    });
  };
  return (
    <Wrapper {...{ style }}>
      <Swiper
        current={current}
        onChange={handleChangle}
        contents={pins.map((pin) => (
          <div key={pin.placeId} className="carousel-cell">
            <PlaceBox place={pin} className="place-box" type={placeCardType} />
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
  bottom: 3.2rem;
  z-index: 50;
  .flickity-slider {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
  .carousel-cell {
    margin-right: 0.8rem;
  }
  .place-box {
    width: 30.3rem;
  }
  .recommend {
    margin-top: 0.8rem;
  }
`;

export default PinSlider;
