import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexCenter, theme } from "../styles/theme";

const PlaceBox = ({ name }: { name: string }) => {
  let _name = name;
  if (name.length > 14) {
    _name = name.slice(0, 14) + "...";
  }
  return (
    <PlaceBoxWrapper>
      <div className="photo" />
      <div className="place-name">{_name}</div>
    </PlaceBoxWrapper>
  );
};

const Collection = () => {
  return (
    <Wrapper>
      <Link to="/detail/1">
        <div>
          <div className="title">혼밥하기 좋은 우리 동네 식당</div>
          <div className="author">짱짱로컬큐레이터님 · 논현동</div>
        </div>
        <div className="places">
          {[0, 0, 0, 0].map((_, i) => (
            <PlaceBox key={i} name="민씨다이닝카페민씨다이닝카페아아dkdkdk" />
          ))}
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .title {
    font-size: 1.6rem;
    line-height: 120%;
    font-weight: bold;
  }
  .author {
    margin-top: 0.2rem;
    font-size: 1.4rem;
    line-height: 150%;
    color: ${theme.color.gray6};
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
  min-width: 12rem;
  height: 17rem;
  margin-right: 0.8rem;
  border: 0.1rem solid ${theme.color.gray3};
  border-radius: 0.8rem;
  .photo {
    width: 100%;
    height: 12rem;
    background-color: lightgray;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
  }
  .place-name {
    ${flexCenter};
    text-align: center;
    margin: 0.8rem;
    font-size: 1.3rem;
    color: ${theme.color.gray6};
    line-height: 140%;
  }
`;

export default Collection;
