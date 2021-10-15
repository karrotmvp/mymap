import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

interface MapViewProps {
  width?: string;
  height?: string;
  pins?: Pin[];
}

declare global {
  interface Window {
    naver: any;
  }
}

export interface Pin {
  id: number;
  latitude: number;
  longitude: number;
}

const MapView = ({ width, height, pins }: MapViewProps) => {
  // const navermaps = window.naver.maps;

  const defaultCenter = pins
    ? {
        lat: pins[0].latitude,
        lng: pins[0].longitude,
      }
    : { lat: 37.3595704, lng: 127.105399 };

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NAVER_MAPS_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: width ?? "100%",
          height: height ?? "230px",
        }}
        defaultCenter={defaultCenter}
        defaultZoom={16}
      >
        {pins?.map((pin) => (
          <Marker
            key={pin.id}
            position={{
              lat: pin.latitude,
              lng: pin.longitude,
            }}
          />
        ))}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default MapView;
