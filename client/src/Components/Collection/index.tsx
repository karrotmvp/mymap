import styled from "styled-components";
import { More } from "../../assets";
import { PostType } from "../../Shared/type";
import { flexCenter, theme } from "../../styles/theme";
import SaveFooter from "./SaveFooter";

const PlaceBox = ({ name, category }: { name: string; category: string[] }) => {
  return (
    <PlaceBoxWrapper>
      {category?.length > 0 && <Tag>{category[category.length - 1]}</Tag>}
      <div className="place-name">{name}</div>
    </PlaceBoxWrapper>
  );
};

const Collection = (post: PostType) => {
  return (
    <Wrapper onClick={() => (window.location.href = `/detail/${post.postId}`)}>
      <div className="title-wrapper">
        <div>
          <div className="title">{post.title}</div>
          <div className="author">
            {post.user.userName} · {post.regionName}
          </div>
        </div>
        <More className="more-icon" />
      </div>
      <div className="places">
        {post.pins.map((pin) => (
          <PlaceBox key={pin.pinId} {...pin.place} />
        ))}
      </div>
      <SaveFooter {...{ post }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 3.6rem 0;
  padding-left: 2rem;
  box-sizing: border-box;

  .title-wrapper {
    ${flexCenter};
    justify-content: space-between;

    .title {
      font-size: 1.7rem;
      line-height: 120%;
      font-weight: bold;
    }
    .author {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      line-height: 150%;
      color: ${theme.color.gray6};
    }
    .more-icon {
      fill: ${theme.color.gray6};
    }
  }

  .places {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: 1.6rem;
  }
`;

const PlaceBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${theme.color.orange_very_light};
  min-width: 15rem;
  max-width: 15rem;
  height: 10rem;
  border-radius: 1rem;
  margin-right: 0.8rem;
  padding: 1.2rem;
  box-sizing: border-box;
  border: 0.1rem solid ${theme.color.orange_light};

  .place-name {
    margin-top: 0.8rem;
    font-weight: 500;
    color: ${theme.color.gray7};
    line-height: 150%;
    letter-spacing: -0.2%;
    font-size: 1.5rem;
  }
`;

const Tag = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.45rem 1rem;
  border-radius: 0.4rem;
  background-color: ${theme.color.white};
  color: ${theme.color.orange};
`;

export default Collection;
