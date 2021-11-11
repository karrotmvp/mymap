/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getAroundPlaces } from "../../api/place";
import { Close, List, Map } from "../../assets";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { gap, theme, Title, WrapperWithHeaderFooter } from "../../styles/theme";
import { mini } from "../../App";
import PlaceCard from "../../Components/PlaceCard";
import { match } from "ts-pattern";
import MapViewwithSlider from "../../Components/MapViewWithSlider";

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

  return (
    <>
      <Wrapper>
        <Header title="장소 둘러보기">
          <Close className="left-icon" onClick={() => mini.close()} />
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
        </Header>

        {match(state._t)
          .with("list", () => (
            <div id="around-scroll">
              <Title
                style={{ fontSize: "1.8rem", lineHeight: "2.52rem" }}
              >{`우리 동네 장소
어디까지 알고 있나요?`}</Title>
              <div className="sub">새로운 장소를 나만의 테마에 저장해요</div>

              <div className="cards">
                {places.map((place) => (
                  <div key={place.placeId}>
                    <PlaceCard {...{ place }} type="list" />
                  </div>
                ))}
              </div>
            </div>
          ))
          .with("map", () => <MapViewwithSlider {...{ places }} />)
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
  #around-scroll {
    padding: 0 2rem;
    height: 100vh;
    padding-top: 3rem;
    box-sizing: border-box;
    .sub {
      margin-top: 0.4rem;
      color: ${theme.color.gray5};
      font-size: 1.6rem;
      line-height: 2.24rem;
      letter-spacing: -2%;
    }
  }
  .cards {
    margin-top: 3rem;
    padding-bottom: 8.4rem;
    ${gap("1.4rem", "column")}
  }
`;

export default Around;
