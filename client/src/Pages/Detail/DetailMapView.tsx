import styled from "styled-components";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider/PinSlider";
import { PinType } from "../../Shared/type";

const DetailMapView = ({ pins }: { pins: PinType[] }) => {
  const _pins: Pin[] = pins.map((pin) => {
    return {
      id: pin.pinId,
      latitude: pin.place.coordinates.latitude,
      longitude: pin.place.coordinates.longitude,
    };
  });

  return (
    <Wrapper>
      <MapView height="100vh" pins={_pins} />
      <PinSlider {...{ pins }} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DetailMapView;
