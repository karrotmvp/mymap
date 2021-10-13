import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import { gap } from "../styles/theme";

const PlaceInfo = ({ place }: { place: PlaceType }) => {
  return (
    <Wrapper>
      <div className="category">
        {place.category?.map((c) => (
          <Tag>{c}</Tag>
        ))}
      </div>

      <div className="name">{place.name}</div>
      <div className="address">{place.address}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.1rem;
  .category {
    display: flex;
    ${gap("0.4rem")}
  }
  .name {
    margin-top: 1rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
  }
  .address {
    margin-top: 0.7rem;
    color: gray;
    font-size: 1.3rem;
  }
`;

const Tag = styled.div`
  font-size: 1.1rem;
  padding: 0.55rem 1.05rem;
  border-radius: 0.5rem;
  border: 0.1rem solid lightgray;
`;

export default PlaceInfo;
