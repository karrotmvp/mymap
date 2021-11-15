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
  id?: string | number;
  placeId?: string;
  name?: string;
  latitude: number;
  longitude: number;
}

const MapView = ({
  width,
  height,
  pins,
  handleSelectPin,
  center = { lat: 37.3595704, lng: 127.105399 },
}: MapViewProps) => {
  const handleClickMarker = (pin: Pin, idx: number) => {
    handleSelectPin && handleSelectPin(pin, idx);
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
        defaultZoom={14}
        center={center ?? { lat: 37.3595704, lng: 127.105399 }}
      >
        {pins?.map((pin, i) => (
          <Marker
            key={pin.id}
            position={{
              lat: pin.latitude,
              lng: pin.longitude,
            }}
            onClick={() => handleClickMarker(pin, i)}
            icon={{
              content:
                center.lat === pin.latitude && center.lng === pin.longitude
                  ? pin.name
                    ? `<div><div class='pin-box'>${pin.name}</div><img class='pin-image' src='/map_pin_active.png' /></div>`
                    : "<img class='pin-image' src='/map_pin_active.png' />"
                  : "<img class='pin-image-inactive' src='/map_pin_inactive.png' />",
            }}
          />
        ))}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default MapView;
