import { useState } from "react";
import styled from "styled-components";
import SearchList from "../Components/SearchList";
import { Input } from "../styles/theme";
import PlaceMapView from "./PlaceMapView";

const SearchPlace = () => {
  const [isMapOpened, setIsMapOpened] = useState(false);

  return (
    <Wrapper>
      <div className="place-input">
        <Input />
      </div>

      <div className="result">관련검색어</div>
      {new Array(5).fill(0).map((_, i) => (
        <div key={i} onClick={() => setIsMapOpened(true)}>
          <SearchList />
        </div>
      ))}

      {isMapOpened && <PlaceMapView />}
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

export default SearchPlace;
