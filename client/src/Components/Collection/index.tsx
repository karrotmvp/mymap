/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { More, Plus } from "../../assets";
import {
  DetailId,
  PageBeforeWrite,
  PlaceDetailId,
  PostIsDefaultEmpty,
  PostIsSaved,
} from "../../Shared/atom";
import { PostType } from "../../Shared/type";
import { flexCenter, gap, theme } from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import OrangePlaceBox from "../OrangePlaceBox";
import SaveFooter from "./SaveFooter";

interface CollectionProps {
  post: PostType;
  savedPosts?: PostType[];
  setSavedPosts?: Dispatch<SetStateAction<PostType[]>>;
}

const Collection = ({ post, savedPosts, setSavedPosts }: CollectionProps) => {
  const history = useHistory();
  const setPageBeforeWrite = useSetRecoilState(PageBeforeWrite);
  const [placeDetailId, setPlaceDetailId] = useRecoilState(PlaceDetailId);
  const [detailId, setDetailId] = useRecoilState(DetailId);
  const [isSaved, setIsSaved] = useRecoilState(
    PostIsSaved(post.postId.toString())
  );
  const [isDefaultEmpty, setIsDefaultEmpty] = useRecoilState(
    PostIsDefaultEmpty(post.postId.toString())
  );

  const isMypage = useRouteMatch({ path: "/mypage" })?.isExact;

  useEffect(() => {
    setIsSaved(post.saved);
    if (post.title === "기본 테마" && post.pins.length === 0) {
      setIsDefaultEmpty(true);
    }
  }, []);

  useEffect(() => {
    if (isMypage && savedPosts && setSavedPosts && !isSaved) {
      const idxToDelete = savedPosts.findIndex((p) => p.postId === post.postId);
      setSavedPosts([
        ...savedPosts.slice(0, idxToDelete),
        ...savedPosts.slice(idxToDelete + 1, savedPosts.length),
      ]);
    }
  }, [isSaved]);

  const handleClickEmptyTheme = () => {
    if (isDefaultEmpty) {
      Mixpanel.track("기본테마 - 장소 추가 진입");
    }
    setPageBeforeWrite("emptyTheme");
    history.push(`/edit/${post.postId}`);
  };

  return (
    <Wrapper
      onClick={() => {
        if (post.pins.length > 0) {
          setDetailId({
            list: [...detailId.list, post.postId],
            beforePlaceDetailId: placeDetailId,
          });
          setPlaceDetailId(null);
        }
      }}
    >
      <div className="title-wrapper">
        <div style={{ width: "100%" }}>
          <div className="title">{post.title}</div>
          <div className="author">
            <img src={post.user.profileImageUrl} alt="profile" />
            <div>
              <span>{post.user.userName}</span>님
            </div>
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
          <EmptyOrangePlaceBox onClick={handleClickEmptyTheme}>
            <Plus className="orange-plus" />
            <div>{`저장한 장소가 없어요
장소를 저장해 주세요`}</div>
          </EmptyOrangePlaceBox>
        )}
      </div>
      <SaveFooter {...{ post, savedPosts, setSavedPosts }} />
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
      font-weight: bold;
      font-size: 1.8rem;
      line-height: 120%;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 5rem;
      box-sizing: border-box;
      overflow: hidden;
    }
    .author {
      margin-top: 0.8rem;
      font-size: 1.3rem;
      line-height: 150%;
      color: ${theme.color.gray5};
      display: flex;
      align-items: center;
      gap: 0.8rem;
      span {
        color: ${theme.color.gray7};
      }
      img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
      }
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
    margin-top: 2.1rem;
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
