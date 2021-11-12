/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getAroundPlaces, getSearch } from "../../api/place";
import { Close, List, Map, NoSearch, Search, SearchClose } from "../../assets";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import {
  flexCenter,
  gap,
  input,
  theme,
  Title,
  WrapperWithHeaderFooter,
} from "../../styles/theme";
import { mini } from "../../App";
import PlaceCard from "../../Components/PlaceCard";
import { match } from "ts-pattern";
import MapViewwithSlider from "../../Components/MapViewWithSlider";
import useDebounce from "../../Hooks/useDebounce";
import useInput from "../../Hooks/useInput";
import InfiniteScroll from "react-infinite-scroll-component";

const Around = () => {
  const regionId = useRecoilValue(RegionId);
  const [places, setPlaces] = useState<PlaceType[] | []>([]);
  useEffect(() => {
    const fetchAroundPlaces = async () => {
      const data = await getAroundPlaces(regionId);
      setPlaces([...places, ...data.places]);
    };
    fetchAroundPlaces();
  }, []);

  type State =
    | {
        _t: "map";
      }
    | {
        _t: "list";
      };
  const reducer: React.Reducer<State, void> = (prevState) => {
    switch (prevState._t) {
      case "list":
        return {
          _t: "map",
        };
      case "map":
        return {
          _t: "list",
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
  });

  // 검색
  const [result, setResult] = useState<PlaceType[] | []>([]);
  const [resultHasMore, setResultHasMore] = useState(true);
  const [resultPage, setResultPage] = useState(1);

  const searchVal = useInput("");
  const getSearchItems = useCallback(async () => {
    const data = await getSearch(regionId, {
      query: searchVal.value,
      page: resultPage,
    });
    setResult(data);
  }, [searchVal.value]);
  // 검색 디바운스
  const debouncedSearchVal = useDebounce(getSearchItems, 200);
  useEffect(() => {
    setResultPage(1);
    setResultHasMore(true);
    if (searchVal.value.length > 0) debouncedSearchVal();
  }, [searchVal.value]);

  // 무한 스크롤
  const handleResultNext = () => {
    setResultPage(resultPage + 1);
  };
  useEffect(() => {
    const fetchResult = async () => {
      const data = await getSearch(regionId, {
        query: searchVal.value,
        page: resultPage,
      });
      if (data.length < 1) {
        setResultHasMore(false);
        return;
      }
      setResult([...result, ...data]);
    };
    if (searchVal.value.length > 0) fetchResult();
  }, [resultPage]);

  return (
    <>
      <Wrapper>
        <Header title="장소 둘러보기">
          <Close className="left-icon" onClick={() => mini.close()} />
          {searchVal.value.length > 0 && result.length === 0 ? (
            <div />
          ) : (
            <div className="view-toggle" onClick={dispatch}>
              {match(state._t)
                .with("map", () => (
                  <>
                    <List />
                    목록
                  </>
                ))
                .with("list", () => (
                  <>
                    <Map />
                    지도
                  </>
                ))
                .exhaustive()}
            </div>
          )}
        </Header>

        {match(state._t)
          .with("list", () => (
            <>
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

              {searchVal.value.length > 0 ? (
                result.length > 0 ? (
                  <div id="around-search-list">
                    <InfiniteScroll
                      dataLength={result.length}
                      next={handleResultNext}
                      hasMore={resultHasMore}
                      loader={<div />}
                      scrollableTarget="around-search-list"
                    >
                      <div className="result-cards">
                        {result.map((place) => (
                          <div key={place.placeId}>
                            <PlaceCard type="list" {...{ place }} />
                          </div>
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                ) : (
                  <NoSearchView value={searchVal.value} />
                )
              ) : (
                <div className="around-scroll">
                  <Title
                    style={{ fontSize: "1.8rem", lineHeight: "2.52rem" }}
                  >{`우리 동네 장소
어디까지 알고 있나요?`}</Title>
                  <div className="sub">
                    새로운 장소를 나만의 테마에 저장해요
                  </div>

                  <div className="cards">
                    {places.map((place) => (
                      <div key={place.placeId}>
                        <PlaceCard {...{ place }} type="list" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ))
          .with("map", () => (
            <MapViewwithSlider places={result.length > 0 ? result : places} />
          ))
          .exhaustive()}

        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeaderFooter};
  overflow-y: scroll;
  .view-toggle {
    right: 2rem;
  }
  .pin-slider {
    bottom: 8.4rem;
  }
  .search-box {
    border-bottom: 0.1rem solid ${theme.color.gray2};
    padding: 1.6rem 2rem;
    padding-top: 0.8rem;
    position: sticky;
    top: 0;
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
  .around-scroll {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    padding: 0 2rem;
    padding-top: 14.7rem;
    overflow-y: scroll;
    box-sizing: border-box;
    .sub {
      margin-top: 0.4rem;
      color: ${theme.color.gray5};
      font-size: 1.6rem;
      line-height: 2.24rem;
      letter-spacing: -2%;
    }
  }
  #around-search-list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    padding-top: 11.7rem;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 6.8rem;
  }
  .cards {
    margin-top: 3rem;
    padding-bottom: 8.4rem;
    ${gap("1.4rem", "column")}
  }
  .result-cards {
    margin-top: 1.4rem;
    padding: 1.6rem 2rem;
    ${gap("1.4rem", "column")}
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

export default Around;
