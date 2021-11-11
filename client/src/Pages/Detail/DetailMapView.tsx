import { useEffect, useState } from "react";
import styled from "styled-components";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider";
import { PlaceType } from "../../Shared/type";

const DetailMapView = ({ pins }: { pins: PlaceType[] }) => {
  const _pins: Pin[] = pins.map((pin) => {
    return {
      id: pin.placeId,
      latitude: pin.coordinates.latitude,
      longitude: pin.coordinates.longitude,
      name: pin.name,
    };
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: pins[0].coordinates.latitude,
    lng: pins[0].coordinates.longitude,
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
      lat: pins[current].coordinates.latitude,
      lng: pins[current].coordinates.longitude,
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
        placeCardType="map"
        {...{ pins, current, setCurrent, setCenter }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DetailMapView;
