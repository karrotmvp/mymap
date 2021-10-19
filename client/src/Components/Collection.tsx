import { Link } from "react-router-dom";
import styled from "styled-components";
import { More } from "../assets";
import { PostType } from "../Shared/type";
import { flexCenter, theme } from "../styles/theme";

const PlaceBox = ({ name }: { name: string }) => {
  let _name = name;
  if (name.length > 19) {
    _name = name.slice(0, 19) + "...";
  }
  return (
    <PlaceBoxWrapper>
      <div className="photo" />
      <div className="place-name">{_name}</div>
    </PlaceBoxWrapper>
  );
};

const Collection = (post: PostType) => {
  console.log(post);
  return (
    <Wrapper>
      <Link to="/detail/1">
        <div className="title-wrapper">
          <div>
            <div className="title">{post.title}</div>
            <div className="author">짱짱로컬큐레이터님 · 논현동</div>
          </div>
          <More className="more-icon" />
        </div>
        <div className="places">
          {post.pins.map((pin, i) => (
            <PlaceBox key={i} name={pin.place.name} />
          ))}
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .title-wrapper {
    ${flexCenter};
    justify-content: space-between;

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
    .more-icon {
      fill: ${theme.color.gray5};
    }
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
  min-width: 13rem;
  margin-right: 1rem;
  .photo {
    width: 100%;
    height: 13rem;
    background-color: lightgray;
    border-radius: 1rem;
  }
  .place-name {
    ${flexCenter};
    margin-top: 0.8rem;
    font-size: 1.3rem;
    color: ${theme.color.gray6};
    line-height: 140%;
  }
`;

export default Collection;
