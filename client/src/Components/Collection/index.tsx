import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { More, Plus } from "../../assets";
import { PageBeforeWrite } from "../../Shared/atom";
import { PostType } from "../../Shared/type";
import { flexCenter, gap, theme } from "../../styles/theme";
import OrangePlaceBox from "../OrangePlaceBox";
import SaveFooter from "./SaveFooter";

const Collection = (post: PostType) => {
  const history = useHistory();
  const setPageBeforeWrite = useSetRecoilState(PageBeforeWrite);

  return (
    <Wrapper
      onClick={() =>
        post.pins.length > 0 && history.push(`/detail/${post.postId}`)
      }
    >
      <div className="title-wrapper">
        <div style={{ width: "100%" }}>
          <div className="title">{post.title}</div>
          <div className="author">
            {post.user.userName} · {post.regionName}
          </div>
        </div>
        {post.pins.length > 0 && <More className="more-icon" />}
      </div>
      <div className="places">
        {post.pins.length > 0 ? (
          post.pins.map((pin) => (
            <div key={pin.pinId} className="place">
              <OrangePlaceBox {...pin.place} />
            </div>
          ))
        ) : (
          <EmptyOrangePlaceBox
            onClick={() => {
              setPageBeforeWrite("emptyTheme");
              history.push(`/edit/${post.postId}`);
            }}
          >
            <Plus className="orange-plus" />
            <div>{`저장한 장소가 없어요
장소를 저장해 주세요`}</div>
          </EmptyOrangePlaceBox>
        )}
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

const EmptyOrangePlaceBox = styled.div`
  ${flexCenter};
  flex-direction: column;
  background-color: ${theme.color.orange_very_light};
  border: 0.1rem dashed ${theme.color.orange_medium};
  border-radius: 1rem;
  width: 15rem;
  height: 10rem;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 145%;
  padding-bottom: 1.2rem;
  box-sizing: border-box;
  color: ${theme.color.orange};
  white-space: pre-line;
  .orange-plus {
    fill: ${theme.color.orange};
  }
`;

export default Collection;
