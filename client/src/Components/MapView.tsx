import { useEffect, useMemo, useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

interface MapViewProps {
  width?: string;
  height?: string;
  pins?: Pin[];
  handleSelectPin?: Function;
  center?: {
    lat: number;
    lng: number;
  };
}

declare global {
  interface Window {
    naver: any;
  }
}

export interface Pin {
  id?: number;
  placeId?: string;
  latitude: number;
  longitude: number;
}

const MapView = ({
  width,
  height,
  pins,
  handleSelectPin,
  center,
}: MapViewProps) => {
  const defaultMapCenter = useMemo(() => {
    return (
      center ??
      (pins
        ? {
            lat: pins[0]?.latitude,
            lng: pins[0]?.longitude,
          }
        : { lat: 37.3595704, lng: 127.105399 })
    );
  }, [center, pins]);

  const [mapCenter, setMapCenter] = useState(defaultMapCenter);

  useEffect(() => {
    setMapCenter(defaultMapCenter);
  }, [defaultMapCenter]);

  const handleClickMarker = (pin: Pin) => {
    handleSelectPin && handleSelectPin(pin);

    // 지도 이동
    setMapCenter({
      lat: pin.latitude,
      lng: pin.longitude,
    });
    // setTimeout(() => {
    //   setMapZoom(12);
    //   setdefaultMapCenter({
    //     lat: loc.snapshotJson.businessAddressJson.posLat,
    //     lng: loc.snapshotJson.businessAddressJson.posLong,
    //   });
    // }, 1000);
  };

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NAVER_MAPS_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<div />}
    >
      <NaverMap
        mapDivId={"react-naver-map"}
        style={{
          width: width ?? "100%",
          height: height ?? "230px",
          transition: "0.3s",
        }}
        defaultZoom={13}
        center={mapCenter}
      >
        {pins?.map((pin) => (
          <Marker
            key={pin.id}
            position={{
              lat: pin.latitude,
              lng: pin.longitude,
            }}
            onClick={() => handleClickMarker(pin)}
          />
        ))}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default MapView;
