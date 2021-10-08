import styled from "styled-components";
import PlaceInfo from "./PlaceInfo";

const PlaceCard = () => {
  return (
    <Wrapper>
      <PlaceInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 1.6rem;
  border: 0.1rem solid lightgray;
`;

export default PlaceCard;
