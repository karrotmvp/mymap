import { useCallback } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

interface MapViewProps {
  width?: string;
  height?: string;
  pins?: Pin[];
  handleSelectPin?: Function;
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

const MapView = ({ width, height, pins, handleSelectPin }: MapViewProps) => {
  const ReturnMap = useCallback(() => {
    const defaultCenter = pins
      ? {
          lat: pins[0]?.latitude,
          lng: pins[0]?.longitude,
        }
      : { lat: 37.3595704, lng: 127.105399 };

    // 핀 여러개일 때 사용
    // const [mapCenter, setMapCenter] = useState(defaultCenter);
    const handleClickMarker = (pin: Pin) => {
      handleSelectPin && handleSelectPin(pin);

      // 지도 이동
      // setMapCenter({
      //   lat: pin.latitude,
      //   lng: pin.longitude,
      // });
      // setTimeout(() => {
      //   setMapZoom(12);
      //   setMapCenter({
      //     lat: loc.snapshotJson.businessAddressJson.posLat,
      //     lng: loc.snapshotJson.businessAddressJson.posLong,
      //   });
      // }, 1000);
    };

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
          // onZoomChanged={setMapZoom}
          // onCenterChanged={setMapCenter}
        >
          {pins?.map((pin) => (
            <Marker
              key={pin.id}
              position={{
                lat: pin.latitude,
                lng: pin.longitude,
              }}
              onClick={handleSelectPin && (() => handleClickMarker(pin))}
            />
          ))}
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    );
  }, [pins, handleSelectPin, height, width]);

  return <ReturnMap />;
};

export default MapView;
