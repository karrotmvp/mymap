import { useHistory } from "react-router";
import styled from "styled-components";
import { More } from "../../assets";
import { PostType } from "../../Shared/type";
import { flexCenter, gap, theme } from "../../styles/theme";
import OrangePlaceBox from "../OrangePlaceBox";
import SaveFooter from "./SaveFooter";

const Collection = (post: PostType) => {
  const history = useHistory();

  return (
    <Wrapper onClick={() => history.push(`/detail/${post.postId}`)}>
      <div className="title-wrapper">
        <div style={{ width: "100%" }}>
          <div className="title">{post.title}</div>
          <div className="author">
            {post.user.userName} · {post.regionName}
          </div>
        </div>
        <More className="more-icon" />
      </div>
      <div className="places">
        {post.pins.map((pin) => (
          <div key={pin.pinId} className="place">
            <OrangePlaceBox {...pin.place} />
          </div>
        ))}
      </div>
      <SaveFooter {...{ post }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 3.6rem 0;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  .title-wrapper {
    padding-left: 2rem;
    width: 100%;
    ${flexCenter};
    justify-content: space-between;

    .title {
      max-width: 100%;
      font-size: 1.6rem;
      line-height: 120%;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 5rem;
      box-sizing: border-box;
      overflow: hidden;
    }
    .author {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      line-height: 150%;
      color: ${theme.color.gray6};
    }
    .more-icon {
      position: absolute;
      right: 0;
      fill: ${theme.color.gray6};
    }
  }

  .places {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: 1.6rem;
    padding-left: 2rem;
    box-sizing: border-box;
    ${gap("0.8rem")};
    .place {
      &:last-child {
        padding-right: 2rem;
      }
    }
  }
`;

export default Collection;
