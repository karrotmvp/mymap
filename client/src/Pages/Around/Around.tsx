/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import AroundSlide from "./AroundSlide";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider";
import { Close, MapBack, Search, SearchClose } from "../../assets";
import { PlaceType } from "../../Shared/type";
import { useRecoilValue } from "recoil";
import { Installed, RegionId } from "../../Shared/atom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  flexCenter,
  input,
  theme,
  WrapperWithFooter,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import { handleClose } from "../../utils/preset";
import { useGetRegion } from "../../api/region";
import useInput from "../../Hooks/useInput";
import { useGetAroundPlaces, useGetSearch } from "../../api/place";
import useDebounce from "../../Hooks/useDebounce";

const Around = () => {
  const installed = useRecoilValue(Installed);
  const [isMapShown, setIsMapShown] = useState(false);
  const regionId = useRecoilValue(RegionId);
  const { data: regionName } = useGetRegion(regionId);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.3595704,
    lng: 127.105399,
  });

  const [aroundPins, setAroundPins] = useState<Pin[] | []>([]);
  const { data: aroundPlaces } = useGetAroundPlaces(regionId);

  useEffect(() => {
    const _aroundPlaces: Pin[] = [];
    aroundPlaces?.places?.forEach((place) => {
      _aroundPlaces.push({
        id: place.placeId,
        placeId: place.placeId,
        name: place.name,
        latitude: place.coordinates.latitude,
        longitude: place.coordinates.longitude,
      });
    });
    setAroundPins(_aroundPlaces);
    setCenter({
      lat: aroundPlaces?.coordinates.latitude ?? 0,
      lng: aroundPlaces?.coordinates.longitude ?? 0,
    });
  }, [aroundPlaces]);

  // 핀 선택
  const [isPinSelected, setIsPinSelected] = useState(false);
  const handleSelectPin = (pin: Pin, idx: number) => {
    setIsPinSelected(true);
    setCenter({
      lat: pin.latitude,
      lng: pin.longitude,
    });
    setCurrent(idx);
  };

  // 카드 이동
  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    setCenter({
      lat: aroundPins[current]?.latitude,
      lng: aroundPins[current]?.longitude,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // scroll up
  const [isScrollUp, setIsScrollUp] = useState(false);
  useEffect(() => {
    if (!isPinSelected) {
      const targetElement = document.querySelector("#around-scroll")!;

      const onScroll = () => {
        setIsScrollUp(window.innerHeight - targetElement.scrollTop < 450);
        setIsMapShown(targetElement.scrollTop <= 0);
      };
      targetElement.addEventListener("scroll", onScroll);
      return () => targetElement.removeEventListener("scroll", onScroll);
    }
  }, [isPinSelected]);

  const handleBack = () => {
    setCenter({ lat: 0, lng: 0 });
    setIsPinSelected(false);
    setCurrent(-1);
    setIsMapShown(false);
  };

  useEffect(() => {
    Mixpanel.track("둘러보기 진입");
  }, []);

  // 검색
  const [resultHasMore, setResultHasMore] = useState(true);
  const [resultPage, setResultPage] = useState(1);
  const searchVal = useInput("");
  const [result, setResult] = useState<PlaceType[] | []>([]);
  const { data: searchResult, refetch: refetchSearchResult } = useGetSearch(
    regionId,
    {
      query: searchVal.value,
      page: resultPage,
    }
  );
  const getSearchItems = useCallback(async () => {
    await refetchSearchResult();
    if (searchResult) setResult(searchResult);
  }, [searchVal.value]);
  const debouncedSearchVal = useDebounce(getSearchItems, 200);

  useEffect(() => {
    setResultPage(1);
    setResultHasMore(true);
    if (searchVal.value.length > 0) debouncedSearchVal();
  }, [searchVal.value]);

  const handleResultNext = () => {
    setResultPage(resultPage + 1);
  };

  return (
    <Wrapper>
      {isPinSelected ? (
        <div className="map-back">
          <MapBack onClick={handleBack} />
        </div>
      ) : (
        <>
          <Header title={regionName}>
            <Close
              className="left-icon"
              onClick={() => handleClose(installed)}
            />
          </Header>
          <div className="search-box">
            <Search className="search-icon" />
            <SearchInput
              value={searchVal.value}
              onChange={searchVal.onChange}
              placeholder="우리 동네 장소를 검색해봐요"
            />
            {searchVal.value.length > 0 && (
              <SearchClose
                className="search-close"
                onClick={() => searchVal.setValue("")}
              />
            )}
          </div>
        </>
      )}

      <div onClick={() => setIsMapShown(true)}>
        <MapView
          mapId="around"
          height="100vh"
          pins={aroundPins}
          handleSelectPin={handleSelectPin}
          center={center!}
        />
      </div>

      {!isPinSelected ? (
        <>
          <AroundScroll
            id="around-scroll"
            $isMapShown={isMapShown}
            onClick={() => setIsMapShown(true)}
          >
            {aroundPlaces && (
              <AroundSlide
                {...{ isScrollUp, setIsMapShown }}
                places={aroundPlaces.places}
              />
            )}
          </AroundScroll>
          <Footer />
        </>
      ) : (
        current > -1 &&
        aroundPlaces && (
          <PinSlider
            placeCardType="map"
            {...{ current, setCurrent, setCenter }}
            pins={aroundPlaces.places}
          />
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .map-back {
    ${flexCenter};
    position: fixed;
    top: 0.8rem;
    left: 0.8rem;
    z-index: 800;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    background-color: #fff;
    border: 0.1rem solid ${theme.color.gray3};
  }
  .search-box {
    border-bottom: 0.1rem solid ${theme.color.gray2};
    padding: 1.6rem 2rem;
    padding-top: 0.8rem;
    position: sticky;
    top: 5rem;
    background-color: #fff;
    z-index: 100;
    .search-icon {
      position: absolute;
      top: 1.7rem;
      left: 2.8rem;
    }
    .search-close {
      position: absolute;
      right: 1.358rem;
      top: 0.4rem;
      fill: ${theme.color.gray2_5};
    }
  }
`;

const AroundScroll = styled.div<{ $isMapShown: boolean }>`
  ${WrapperWithFooter};
  padding-bottom: 0;
  transition: 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  margin-top: ${({ $isMapShown }) => ($isMapShown ? "calc(100vh - 11rem)" : 0)};
  padding-top: ${({ $isMapShown }) =>
    $isMapShown ? 0 : "calc(100vh - 42rem)"};
`;

const SearchInput = styled.input`
  ${input};
  border: none;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 135%;
  color: ${theme.color.gray7};
  &:focus {
    border: none;
  }
  width: 100%;
  padding: 1.1rem 4.7rem 1.1rem 3.8rem;
  box-sizing: border-box;
  height: 4.2rem;
  background-color: ${theme.color.gray1_5};
  border-radius: 0.8rem;
`;

export default Around;
