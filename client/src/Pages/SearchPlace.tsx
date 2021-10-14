import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SearchList from "../Components/SearchList";
import useDebounce from "../Hooks/useDebounce";
import useInput from "../Hooks/useInput";
import { RegionId } from "../Shared/atom";
import { PlaceType } from "../Shared/type";
import { input } from "../styles/theme";
import { GET } from "../utils/axios";
import PlaceMapView from "./PlaceMapView";

export const dummyPlaces: PlaceType[] = [
  {
    placeId: "0",
    name: "삼성영어청룡어학원",
    address: "충청남도 천안시 동남구 풍세로 769-28",
    coordinate: {
      latitude: 36.7796945602981,
      longitude: 127.13872042726,
    },
    businessHoursFrom: "09:00",
    businessHoursTo: "21:00",
    businessHoursExtra: "금요일은 쉽니다.",
    category: ["음식", "카페/디저트", "카페"],
    thumbnail: {
      id: "BP-1203981203981",
      width: 640,
      height: 320,
      url: "http://image-server-domain/path-to-the-image",
      thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
    },
    images: [
      {
        id: "BP-1203981203981",
        width: 640,
        height: 320,
        url: "http://image-server-domain/path-to-the-image",
        thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
      },
    ],
  },
  {
    placeId: "1",
    name: "삼성영어청룡어학원",
    address: "충청남도 천안시 동남구 풍세로 769-28",
    coordinate: {
      latitude: 36.7796945602981,
      longitude: 127.13872042726,
    },
    businessHoursFrom: "09:00",
    businessHoursTo: "21:00",
    businessHoursExtra: "금요일은 쉽니다.",
    category: ["음식", "카페/디저트", "카페"],
    thumbnail: {
      id: "BP-1203981203981",
      width: 640,
      height: 320,
      url: "http://image-server-domain/path-to-the-image",
      thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
    },
    images: [
      {
        id: "BP-1203981203981",
        width: 640,
        height: 320,
        url: "http://image-server-domain/path-to-the-image",
        thumbnail: "http://image-server-domain/path-to-the-thumbnail-image",
      },
    ],
  },
];

const SearchPlace = ({
  setIsSearchOpened,
}: {
  setIsSearchOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isMapOpened, setIsMapOpened] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>(null);
  //   const regionId = useRecoilValue(RegionId);

  const handleOpenMap = (place: PlaceType) => {
    setPlace(place);
    setIsMapOpened(true);
  };

  const searchVal = useInput("");
  //   const debouncedSearchVal = useDebounce<string>(searchVal.value, 200);

  //   const getSearchItems = async () => {
  //     const data = await GET(`api/place/search/6530459d189b`, {
  //       query: debouncedSearchVal,
  //     });
  //     console.log("search", data);
  //   };

  //   console.log(process.env.REACT_APP_ENDPOINT);
  //   useEffect(() => {
  //     console.log(debouncedSearchVal);
  //     getSearchItems();
  //   }, [debouncedSearchVal]);

  return (
    <Wrapper>
      <div className="place-input">
        <SearchInput
          value={searchVal.value}
          onChange={searchVal.onChange}
          placeholder="검색어를 입력해주세요"
        />
      </div>

      <div className="result">관련검색어</div>
      {dummyPlaces.map((place) => (
        <div key={place.placeId} onClick={() => handleOpenMap(place)}>
          <SearchList {...{ place }} />
        </div>
      ))}

      {isMapOpened && place && (
        <PlaceMapView {...{ place, setIsSearchOpened }} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .place-input {
    margin-top: 2rem;
    padding: 0 2rem;
  }
  .result {
    font-size: 1.4rem;
    line-height: 160%;
    margin-top: 2.4rem;
    margin-left: 2rem;
    margin-bottom: 1.3rem;
  }
`;

const SearchInput = styled.input`
  ${input};
  height: 4.8rem;
`;

export default SearchPlace;
