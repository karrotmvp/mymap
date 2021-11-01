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
  id?: string;
  placeId?: string;
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
  // const defaultMapCenter = useMemo(() => {
  //   return (
  //     center ??
  //     (pins && {
  //       lat: pins[0]?.latitude,
  //       lng: pins[0]?.longitude,
  //     })
  //   );
  // }, [center, pins]);

  // const [mapCenter, setMapCenter] = useState(defaultMapCenter);

  // useEffect(() => {
  //   setMapCenter(defaultMapCenter);
  // }, [defaultMapCenter]);

  const handleClickMarker = (pin: Pin, idx: number) => {
    handleSelectPin && handleSelectPin(pin, idx);
    // 지도 이동
    // setCenter &&
    //   setCenter({
    //     lat: pin.latitude,
    //     lng: pin.longitude,
    //   });
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
        center={center}
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
                  ? "<img class='pin-image' src='/map_pin_active.png' />"
                  : "<img class='pin-image-inactive' src='/map_pin_inactive.png' />",
            }}
          />
        ))}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default MapView;
