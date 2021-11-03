import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import { gap, theme } from "../styles/theme";

const PlaceInfo = ({ place }: { place: PlaceType }) => {
  return (
    <Wrapper>
      <div className="category">
        {place.category?.length > 0 ? (
          place.category?.slice(0, 2).map((c) => <Tag key={c}>{c}</Tag>)
        ) : (
          <Tag>동네 장소</Tag>
        )}
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
  .category {
    display: flex;
    ${gap("0.4rem")}
  }
  .name {
    margin-top: 0.9rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
  }
  .address {
    margin-top: 0.5rem;
    color: gray;
    font-size: 1.3rem;
    color: ${theme.color.gray6};
    letter-spacing: -2%;
    line-height: 150%;
  }
`;

const Tag = styled.div`
  font-size: 1.1rem;
  padding: 0.55rem 1.05rem;
  border-radius: 0.4rem;
  border: 0.1rem solid ${theme.color.gray3_5};
  color: ${theme.color.gray7};
`;

export default PlaceInfo;
