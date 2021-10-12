import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

interface MapViewProps {
  width?: string;
  height?: string;
}

const MapView = ({ width, height }: MapViewProps) => {
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
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={13}
      />
    </RenderAfterNavermapsLoaded>
  );
};

export default MapView;
