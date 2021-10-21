import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getSearch } from "../../api/place";
import { Back, SearchClose } from "../../assets";
import SearchList from "../../Components/SearchList";
import useDebounce from "../../Hooks/useDebounce";
import useInput from "../../Hooks/useInput";
import { RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { flexCenter, input, theme } from "../../styles/theme";
import PlaceMapView from "./PlaceMapView";

const SearchPlace = ({
  setIsSearchOpened,
  close,
}: {
  setIsSearchOpened: Dispatch<SetStateAction<boolean>>;
  close: MouseEventHandler;
}) => {
  const [isMapOpened, setIsMapOpened] = useState(false);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const regionId = useRecoilValue(RegionId);

  const handleOpenMap = (place: PlaceType) => {
    setPlace(place);
    setIsMapOpened(true);
  };

  const searchVal = useInput("");
  // const debouncedSearchVal = useDebounce<string>(searchVal.value, 200);

  const [result, setResult] = useState<PlaceType[] | []>([]);
  // const getSearchItems = useCallback(async () => {
  //   const data = await getSearch(regionId, {
  //     query: debouncedSearchVal,
  //   });
  //   setResult(data);
  // }, [debouncedSearchVal, regionId]);

  // useEffect(() => {
  //   if (debouncedSearchVal.length > 0) getSearchItems();
  // }, [debouncedSearchVal, getSearchItems]);

  return (
    <Wrapper>
      <div className="place-input">
        <Back onClick={close} className="search-back" />
        <SearchInput
          value={searchVal.value}
          onChange={searchVal.onChange}
          placeholder="검색어를 입력해주세요"
        />
        {searchVal.value.length > 0 && (
          <SearchClose
            className="search-close"
            onClick={() => searchVal.setValue("")}
          />
        )}
      </div>

      {/* {debouncedSearchVal.length > 0 ? (
        <div className="result">
          {result.map((place) => (
            <div key={place.placeId} onClick={() => handleOpenMap(place)}>
              {place.address && (
                <SearchList place={place} searchVal={searchVal.value} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">추가할 장소를 검색해주세요.</div>
      )} */}

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
  overflow-y: scroll;
  padding-top: 8rem;
  box-sizing: border-box;
  .search-back {
    position: absolute;
    left: 1.3rem;
    fill: ${theme.color.gray4};
  }
  .search-close {
    position: absolute;
    right: 2rem;
  }
  .place-input {
    position: fixed;
    width: 100%;
    height: 8rem;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${theme.color.white};
    z-index: 100;
    padding: 0 2rem;
    padding-top: 2rem;
    box-sizing: border-box;
  }
  .result {
    font-size: 1.4rem;
    line-height: 160%;
    margin-bottom: 1.3rem;
    position: relative;
    & > div:not(:first-child) {
      border-top: 0.1rem solid lightgray;
    }
  }
  .empty {
    ${flexCenter};
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 160%;
    color: ${theme.color.gray3};
  }
`;

const SearchInput = styled.input`
  ${input};
  height: 4.8rem;
  width: 100%;
  padding-left: 4.4rem;
`;

export default SearchPlace;
