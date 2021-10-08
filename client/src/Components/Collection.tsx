import { Link } from "react-router-dom";
import styled from "styled-components";

const PlaceBox = ({ name }: { name: string }) => {
  return (
    <PlaceBoxWrapper>
      <div className="photo" />
      <div className="place-name">{name}</div>
    </PlaceBoxWrapper>
  );
};

const Collection = () => {
  return (
    <Wrapper>
      <Link to="/detail/1">
        <div>
          <div className="title">혼밥하기 좋은 우리 동네 식당</div>
          <div className="profile">미니 논현동</div>
        </div>
        <div className="places">
          {[0, 0, 0, 0].map((_, i) => (
            <PlaceBox key={i} name="인싸다이닝카페" />
          ))}
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .title {
    font-size: 1.7rem;
    line-height: 120%;
    font-weight: bold;
  }
  .profile {
    font-size: 1.2rem;
    line-height: 150%;
    color: gray;
  }

  .places {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: 1.2rem;
  }
`;

const PlaceBoxWrapper = styled.div`
  margin-right: 0.8rem;
  .photo {
    min-width: 12rem;
    height: 12rem;
    background-color: lightgray;
  }
  .place-name {
    margin-top: 0.8rem;
    font-size: 1.4rem;
  }
`;

export default Collection;
