import styled from "styled-components";
import { PlaceType } from "../Shared/type";

const SearchList = ({ place }: { place: PlaceType }) => {
  return (
    <Wrapper>
      <div className="name">{place.name}</div>
      <div className="address">{place.address}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 0.1rem solid lightgray;
  padding: 1.3rem 2rem;
  .name {
    font-size: 1.6rem;
    line-height: 135%;
  }
  .address {
    font-size: 1.4rem;
    line-height: 140%;
  }
`;

export default SearchList;
