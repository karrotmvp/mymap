import { useEffect, useState } from "react";
import styled from "styled-components";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider";
import { PinType } from "../../Shared/type";

const DetailMapView = ({ pins }: { pins: PinType[] }) => {
  const _pins: Pin[] = pins.map((pin) => {
    return {
      id: pin.pinId,
      latitude: pin.place.coordinates.latitude,
      longitude: pin.place.coordinates.longitude,
      name: pin.place.name,
    };
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: pins[0].place.coordinates.latitude,
    lng: pins[0].place.coordinates.longitude,
  });

  // 핀 선택
  const handleSelectPin = (pin: Pin, idx: number) => {
    setCenter &&
      setCenter({
        lat: pin.latitude,
        lng: pin.longitude,
      });
    setCurrent(idx);
  };

  // 카드 이동
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCenter({
      lat: pins[current].place.coordinates.latitude,
      lng: pins[current].place.coordinates.longitude,
    });
  }, [current, pins]);

  return (
    <Wrapper>
      <MapView
        height="100vh"
        pins={_pins}
        {...{ center, setCenter, handleSelectPin }}
      />
      <PinSlider
        placeBoxType="type3"
        {...{ pins, current, setCurrent, setCenter }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DetailMapView;
