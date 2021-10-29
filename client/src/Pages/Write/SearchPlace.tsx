/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import styled from "styled-components";
import { getSearch } from "../../api/place";
import { Back, NoSearch, SearchClose } from "../../assets";
import SearchList from "../../Components/SearchList";
import useDebounce from "../../Hooks/useDebounce";
import useInput from "../../Hooks/useInput";
import { Places, RegionId, searchAtom } from "../../Shared/atom";
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
  const places = useRecoilValue(Places);

  console.log(places);

  const handleOpenMap = (place: PlaceType) => {
    setPlace(place);
    setIsMapOpened(true);
  };

  const searchVal = useInput("");

  const [result, setResult] = useRecoilStateLoadable(
    searchAtom({ regionId, val: searchVal.value })
  );
  const resetResult = useResetRecoilState(
    searchAtom({ regionId, val: searchVal.value })
  );

  // 검색어 초기화
  useEffect(() => {
    resetResult();
  }, []);
  const getSearchItems = useCallback(async () => {
    const data = await getSearch(regionId, {
      query: searchVal.value,
    });
    setResult(data);
  }, [searchVal.value, regionId]);

  // 검색 디바운스
  const debouncedSearchVal = useDebounce(getSearchItems, 200);
  useEffect(() => {
    if (searchVal.value.length > 0) debouncedSearchVal();
  }, [searchVal.value]);

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

      {result.state === "hasValue" && searchVal.value.length > 0 ? (
        result.contents.length > 0 ? (
          <div className="result">
            {result.contents.map((place) => {
              const isExist = places.find((p) => p.placeId === place.placeId)
                ? true
                : false;
              return (
                <div
                  key={place.placeId}
                  onClick={() => !isExist && handleOpenMap(place)}
                >
                  {place.address && (
                    <SearchList
                      {...{ isExist, place }}
                      searchVal={searchVal.value}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <NoSearchView value={searchVal.value} />
        )
      ) : (
        <div className="empty">추가할 장소를 검색해주세요.</div>
      )}

      {isMapOpened && place && (
        <PlaceMapView
          close={() => setIsMapOpened(false)}
          {...{ place, setIsSearchOpened }}
        />
      )}
    </Wrapper>
  );
};

const NoSearchView = ({ value }: { value: string }) => {
  return (
    <div className="no-search">
      <NoSearch />
      <div>
        <span>{value}</span>의 검색 결과가 없어요
      </div>
      <div>검색어를 다시 확인해주세요!</div>
    </div>
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
    top: 0.4rem;
    fill: ${theme.color.gray7};
  }
  .search-close {
    position: absolute;
    right: 0.7rem;
    top: 0.4rem;
  }
  .place-input {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${theme.color.white};
    z-index: 100;
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

  .no-search {
    ${flexCenter};
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    & > div {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 160%;
      color: ${theme.color.gray6};
      & > span {
        color: ${theme.color.orange};
      }
    }
  }
`;

const SearchInput = styled.input`
  ${input};
  border: none;
  border-radius: 0;
  border-bottom: 0.1rem solid ${theme.color.gray2};
  &:focus {
    border: none;
    border-bottom: 0.1rem solid ${theme.color.gray2};
  }
  width: 100%;
  padding-left: 4.7rem;
  box-sizing: border-box;
  height: 5.6rem;
`;

export default SearchPlace;
