import { useReducer } from "react";
import styled from "styled-components";
import { match } from "ts-pattern";
import { Close, List, Map } from "../../assets";
import Header from "../../Components/Header";
import MapViewwithSlider from "../../Components/MapViewWithSlider";
import PlaceCard from "../../Components/PlaceCard";
import { PlaceType } from "../../Shared/type";
import { gap, theme, WrapperWithHeader } from "../../styles/theme";

interface MyPlacesProps {
  places: PlaceType[];
  close: () => void;
}

type State =
  | {
      _t: "map";
    }
  | {
      _t: "list";
    };
export const reducer: React.Reducer<State, void> = (prevState) => {
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

const MyPlaces = ({ places, close }: MyPlacesProps) => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
  });

  return (
    <Wrapper>
      <Header title="내가 저장한 장소">
        <Close className="left-icon" onClick={close} />
        <div className="view-toggle" onClick={() => dispatch()}>
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
          <div className="cards">
            {places.map((place) => (
              <div key={place.placeId} onClick={dispatch}>
                <PlaceCard {...{ place }} type="list" />
              </div>
            ))}
          </div>
        ))
        .with("map", () => <MapViewwithSlider {...{ places }} />)
        .exhaustive()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 500;
  .view-toggle {
    right: 2rem;
  }
  .post-title {
    padding: 0 2rem;
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    padding-bottom: 3rem;
    .content {
      margin-top: 1.4rem;
      font-size: 1.4rem;
      line-height: 150%;
      color: ${theme.color.gray7};
      padding-right: 3rem;
    }
    &:after {
      content: "";
      width: 100%;
      height: 1.6rem;
      background-color: ${theme.color.gray1_5};
    }
  }

  .cards {
    padding: 0 2rem;
    margin-top: 3rem;
    padding-bottom: 2.8rem;
    ${gap("1.4rem", "column")}
  }
`;

export default MyPlaces;
