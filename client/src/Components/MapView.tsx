import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

interface MapViewProps {
  width?: string;
  height?: string;
  markers?: MarkerType[];
}

interface MarkerType {
  placeId: string;
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    naver: any;
  }
}

const MapView = ({ width, height, markers }: MapViewProps) => {
  // const navermaps = window.naver.maps;

  const defaultCenter = markers
    ? { lat: markers[0].lat, lng: markers[0].lng }
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
        {markers?.map((marker) => (
          <Marker
            key={marker.placeId}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default MapView;
