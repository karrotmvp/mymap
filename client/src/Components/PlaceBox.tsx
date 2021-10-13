import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import PlaceInfo from "./PlaceInfo";

const PlaceBox = ({ place }: { place: PlaceType }) => {
  return (
    <Wrapper>
      <div className="photo" />
      <PlaceInfo {...{ place }} />
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
