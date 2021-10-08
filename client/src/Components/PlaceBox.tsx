import styled from "styled-components";
import PlaceInfo from "./PlaceInfo";

const PlaceBox = () => {
  return (
    <Wrapper>
      <div className="photo" />
      <PlaceInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  .photo {
    min-width: 12rem;
    height: 12rem;
    border-radius: 0.8rem;
    background-color: lightgray;
  }
`;

export default PlaceBox;
