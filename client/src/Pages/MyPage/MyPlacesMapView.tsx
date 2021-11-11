import { useEffect, useState } from "react";
import styled from "styled-components";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider";
import { PlaceType } from "../../Shared/type";

const MyPlacesMapView = (places: PlaceType[]) => {
  // 핀 선택
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: places[0].coordinates.latitude,
    lng: places[0].coordinates.longitude,
  });

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
      lat: places[current].coordinates.latitude,
      lng: places[current].coordinates.longitude,
    });
  }, [current, places]);

  const _pins: Pin[] = places.map((pin) => {
    return {
      id: pin.placeId,
      latitude: pin.coordinates.latitude,
      longitude: pin.coordinates.longitude,
      name: pin.name,
    };
  });

  return (
    <Wrapper>
      <MapView
        height="100vh"
        pins={_pins}
        {...{ center, setCenter, handleSelectPin }}
      />
      <PinSlider
        placeCardType="map"
        pins={places}
        {...{ current, setCurrent, setCenter }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MyPlacesMapView;
