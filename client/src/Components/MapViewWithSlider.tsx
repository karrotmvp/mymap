import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import MapView, { Pin } from "./MapView";
import PinSlider from "./PinSlider";

const MapViewwithSlider = ({
  places,
  isDifferentRegion,
  postRegionName,
}: {
  places: PlaceType[];
  isDifferentRegion?: boolean;
  postRegionName?: string;
}) => {
  const _pins: Pin[] = places.map((pin) => {
    return {
      id: pin.placeId,
      latitude: pin.coordinates.latitude,
      longitude: pin.coordinates.longitude,
      name: pin.name,
    };
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: places[0].coordinates.latitude,
    lng: places[0].coordinates.longitude,
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
      lat: places[current].coordinates.latitude,
      lng: places[current].coordinates.longitude,
    });
  }, [current, places]);

  return (
    <Wrapper>
      <MapView
        mapId="map-view-with-slider"
        height="100vh"
        pins={_pins}
        {...{ center, setCenter, handleSelectPin }}
      />
      <PinSlider
        placeCardType="map"
        pins={places}
        {...{
          current,
          setCurrent,
          setCenter,
          isDifferentRegion,
          postRegionName,
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MapViewwithSlider;
