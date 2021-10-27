import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { PinType } from "../../Shared/type";
import PlaceBox from "../PlaceBox";
import Swiper from "./Swiper";

interface PinSliderProps {
  pins: PinType[];
  isRecommend?: boolean;
  current: number;
  setCurrent: (index: number) => void;
  setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const PinSlider = ({
  pins,
  isRecommend = false,
  current,
  setCurrent,
  setCenter,
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
            <PlaceBox place={pin.place} className="place-box">
              {isRecommend ? (
                <div className="recommend">
                  13명의 주민들이 이 장소를 추천했어요!
                </div>
              ) : (
                ""
              )}
            </PlaceBox>
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
  .flickity-viewport {
    height: auto;
  }
  .carousel-cell {
    margin-right: 0.8rem;
    padding: 1.6rem 0;
  }
  .place-box {
    padding: 1.5rem 1.3rem;
    width: 30.3rem;
  }
  .recommend {
    margin-top: 0.8rem;
  }
`;

export default PinSlider;
