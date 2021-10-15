import styled from "styled-components";
import { PinType } from "../Shared/type";
import PlaceCard from "./PlaceCard";

const PinSlider = ({ pins }: { pins: PinType[] }) => {
  return (
    <Wrapper>
      {pins.map((pin) => (
        <PlaceCard key={pin.pinId} place={pin.place} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
`;

export default PinSlider;
