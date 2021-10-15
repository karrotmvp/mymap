import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import SearchList from "../../Components/SearchList";
import useDebounce from "../../Hooks/useDebounce";
import useInput from "../../Hooks/useInput";
import { PlaceType } from "../../Shared/type";
import { flexCenter, input, theme } from "../../styles/theme";
import { GET } from "../../utils/axios";
import PlaceMapView from "./PlaceMapView";

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
  const debouncedSearchVal = useDebounce<string>(searchVal.value, 200);

  const [result, setResult] = useState<PlaceType[] | []>([]);
  const getSearchItems = useCallback(async () => {
    const data = (await GET(`api/place/search/6530459d189b`, {
      query: debouncedSearchVal,
    })) as PlaceType[];
    console.log("search", data);
    setResult(data);
  }, [debouncedSearchVal]);

  console.log(process.env.REACT_APP_ENDPOINT);
  useEffect(() => {
    console.log(debouncedSearchVal);
    if (debouncedSearchVal.length > 0) getSearchItems();
  }, [debouncedSearchVal, getSearchItems]);

  return (
    <Wrapper>
      <div className="place-input">
        <SearchInput
          value={searchVal.value}
          onChange={searchVal.onChange}
          placeholder="검색어를 입력해주세요"
        />
      </div>

      {debouncedSearchVal.length > 0 ? (
        <>
          <div className="result">관련검색어</div>
          {result.map((place) => (
            <div key={place.placeId} onClick={() => handleOpenMap(place)}>
              {place.address && (
                <SearchList place={place} searchVal={searchVal.value} />
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="empty">추가할 장소를 검색해주세요.</div>
      )}

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
`;

export default SearchPlace;
