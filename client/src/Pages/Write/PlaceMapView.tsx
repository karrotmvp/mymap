import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useHistory, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { putPostPin } from "../../api/post";
import { Back, Plus } from "../../assets";
import MapView, { Pin } from "../../Components/MapView";
import PlaceBox from "../../Components/PlaceCard/PlaceCard";
import { PageBeforeWrite, RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { Button, flexCenter, theme } from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";

const PlaceMapView = ({
  place,
  setIsSearchOpened,
  close,
  places,
  setPlaces,
}: {
  place: PlaceType;
  setIsSearchOpened: Dispatch<SetStateAction<boolean>>;
  close: MouseEventHandler;
  places: PlaceType[];
  setPlaces: Dispatch<SetStateAction<PlaceType[]>>;
}) => {
  const history = useHistory();
  const pageBeforeWrite = useRecoilValue(PageBeforeWrite);
  const { postId } = useParams<{ postId: string }>();
  const regionId = useRecoilValue(RegionId);

  const handleAddPlace = (place: PlaceType) => {
    Mixpanel.track("글작성 - 장소 추가");
    setPlaces([...places, place]);
    setIsSearchOpened(false);

    if (pageBeforeWrite === "emptyTheme") {
      const addPlaceToEmptyTheme = async () => {
        await putPostPin(
          { postId: [parseInt(postId)], regionId },
          { placeId: place.placeId }
        );
        history.push(`/detail/${postId}/finish`);
      };
      addPlaceToEmptyTheme();
    }
  };

  const pin: Pin = {
    id: place.placeId,
    latitude: place.coordinates.latitude,
    longitude: place.coordinates.longitude,
  };

  return (
    <Wrapper>
      <MapView
        mapId="place-map-view"
        height="100vh"
        pins={[pin]}
        center={{ lat: pin.latitude, lng: pin.longitude }}
      />
      <Back onClick={close} className="back-btn" />

      <div className="place-info">
        <PlaceBox type="write" {...{ place }} />
        <AddBtn onClick={() => handleAddPlace(place)}>
          <Plus className="add-icon" />이 장소 추가하기
        </AddBtn>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  .back-btn {
    position: fixed;
    top: 0;
    left: 0;
    fill: ${theme.color.gray7};
  }
  .place-info {
    width: 100%;
    ${flexCenter};
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 7.4rem;
  }
`;

const AddBtn = styled(Button)`
  position: fixed;
  width: 32rem;
  bottom: 1.8rem;
  .add-icon {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${theme.color.white};
  }
`;

export default PlaceMapView;
