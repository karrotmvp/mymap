/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { deletePost, useGetPost } from "../../api/post";
import { Back, Close, Delete, Edit, Map, More2, Thumbnail } from "../../assets";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import {
  Button,
  gap,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import dayjs from "dayjs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  ViewerInfo,
  PageBeforeWrite,
  RegionId,
  PostToEdit,
  Installed,
} from "../../Shared/atom";
import { useRouteMatch, useHistory, useParams } from "react-router";
import SaveButton from "./SaveButton";
import { match } from "ts-pattern";
import { reducer } from "./index.reducer";
import MapViewwithSlider from "../../Components/MapViewWithSlider";
import { regionsGroup } from "../../utils/const";
import { Mixpanel } from "../../utils/mixpanel";
import { handleClose } from "../../utils/preset";

const Detail = ({
  postId: postIdFromProps,
  close,
}: {
  postId?: number;
  close?: Function;
}) => {
  const postIdFromParams = parseInt(useParams<{ postId: string }>().postId);
  const history = useHistory();

  const fromWriteForm =
    useRouteMatch({
      path: "/detail/:postId/finish",
    })?.isExact ?? false;
  const fromDetail =
    useRouteMatch({
      path: "/detail/:postId",
    })?.isExact ?? false;

  const postId =
    fromWriteForm || fromDetail ? postIdFromParams : postIdFromProps!;

  const viewerInfo = useRecoilValue(ViewerInfo);
  const installed = useRecoilValue(Installed);

  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
    isScrollUp: false,
    sliderCurrent: 0,
    isSelected: false,
  });
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);
  const regionId = useRecoilValue(RegionId);

  const pageBeforeWrite = useRecoilValue(PageBeforeWrite);
  const setPostToEdit = useSetRecoilState(PostToEdit);

  const { data: post, refetch: refetchPost } = useGetPost(postId);

  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  const onDeleteClick = () => {
    setIsEditModalOpened(false);
    setIsDeleteAlertOpened(true);
  };
  const onDeleteConfirmClick = async () => {
    await deletePost(fromWriteForm ? postIdFromParams : postId!);

    if (fromWriteForm) {
      history.push(
        pageBeforeWrite === "emptyTheme" ? "/mypage" : pageBeforeWrite
      );
    } else {
      if (close) {
        close();
      } else {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    if (post) {
      setPostToEdit(post);
      Mixpanel.track("상세글 진입", { postId: post.postId });
    }
    console.log(
      regionGroup,
      regionGroup?.find((id) => id === post?.regionId)
    );
  }, [post]);

  // 카드 클릭하면 해당 인덱스 지도뷰
  const handleClickPlaceCard = (idx: number) => {
    dispatch({
      _t: "select",
      sliderCurrent: idx,
      isSelected: true,
    });
  };

  useEffect(() => {
    if (fromWriteForm) refetchPost();

    const targetElement = document.querySelector("#detail-scroll");
    const onScroll = () => {
      dispatch({
        _t: "scroll",
        scrollY: targetElement?.scrollTop || 0,
      });
    };

    targetElement?.addEventListener("scroll", onScroll);
    return () => targetElement?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Container
      animation={!fromWriteForm}
      isMine={post?.user.userId === viewerInfo.userId}
    >
      <Header
        style={{ zIndex: 600 }}
        isMapView={!(state._t === "list" && state.isScrollUp)}
      >
        <>
          {state._t === "map" ? (
            <Back
              className="left-icon"
              onClick={() =>
                dispatch({
                  _t: "toggle",
                })
              }
            />
          ) : fromWriteForm || fromDetail ? (
            <Close
              className="left-icon"
              onClick={() => {
                if (fromDetail) {
                  handleClose(installed);
                } else {
                  history.push(
                    pageBeforeWrite === "emptyTheme"
                      ? "/mypage"
                      : pageBeforeWrite
                  );
                }
              }}
            />
          ) : (
            <Back
              className="left-icon"
              onClick={(e) => {
                e.stopPropagation();
                if (close) {
                  close();
                } else {
                  history.push("/");
                }
              }}
            />
          )}

          {(state._t === "map" ||
            (state._t === "list" && state.isScrollUp)) && (
            <div className="post-title">{post?.title}</div>
          )}

          {state._t === "list" && (
            <div
              className="view-toggle"
              onClick={() =>
                dispatch({
                  _t: "toggle",
                })
              }
            >
              <Map />
              지도
            </div>
          )}
          {post?.user.userId === viewerInfo.userId && (
            <More2
              className="right-icon"
              onClick={() => setIsEditModalOpened(true)}
            />
          )}
        </>
      </Header>

      <div className="content">
        {match(state._t)
          .with("list", () => (
            <Wrapper
              id="detail-scroll"
              isMine={post?.user.userId === viewerInfo.userId}
            >
              <div className="post-title">
                <Title>{post?.title}</Title>
                <div className="content">{post?.contents}</div>
              </div>

              <Profile>
                {post?.user.profileImageUrl ? (
                  <img
                    className="photo"
                    alt="profile"
                    src={post?.user.profileImageUrl}
                  />
                ) : (
                  <Thumbnail className="photo" />
                )}
                <div>
                  <div className="name">
                    {post?.user.userName}님이 추천하는 리스트예요.
                  </div>
                  <div className="date">
                    {dayjs(post?.createdAt).format("YYYY년 MM월 DD일")} ·{" "}
                    {post?.regionName}
                  </div>
                </div>
              </Profile>

              <div className="cards">
                {post?.pins.map((pin, i) => (
                  <div key={pin.pinId} onClick={() => handleClickPlaceCard(i)}>
                    <PlaceCard
                      place={pin.place}
                      type="list"
                      isDifferentRegion={regionId !== post.regionId}
                      postRegionName={post.regionName}
                    />
                  </div>
                ))}
              </div>
            </Wrapper>
          ))
          .with(
            "map",
            () =>
              post && (
                <MapViewwithSlider
                  places={post.pins.map((p) => p.place)}
                  isDifferentRegion={regionId !== post.regionId}
                  postRegionName={post.regionName}
                  defaultCurrent={state.sliderCurrent}
                />
              )
          )
          .exhaustive()}
      </div>

      {isEditModalOpened &&
        (!regionGroup?.find((id) => id === post?.regionId) ? (
          <Alert
            close={() => setIsEditModalOpened(false)}
            title="작성한 동네가 아니예요."
            sub={`작성한 동네에서만 수정할 수 있어요.
${post?.regionName}에 인증해 주세요.`}
          >
            <Button
              className="orange"
              onClick={() => setIsEditModalOpened(false)}
            >
              확인
            </Button>
          </Alert>
        ) : (
          <Modal>
            <div
              className="background"
              onClick={() => setIsEditModalOpened(false)}
              style={{ zIndex: 700 }}
            />
            <div className="modal">
              <Link to={`/edit/${postId}`} className="button">
                <Edit />
                수정하기
              </Link>
              <div onClick={onDeleteClick} className="button">
                <Delete className="delete-icon" />
                삭제하기
              </div>
            </div>
          </Modal>
        ))}
      {isDeleteAlertOpened && (
        <Alert
          close={() => setIsDeleteAlertOpened(false)}
          title="작성한 테마를 삭제하시겠어요?"
          sub="삭제한 테마는 다시 볼 수 없어요."
        >
          <Button
            className="white"
            onClick={() => setIsDeleteAlertOpened(false)}
          >
            취소
          </Button>
          <Button onClick={onDeleteConfirmClick}>삭제</Button>
        </Alert>
      )}

      {post?.user.userId !== viewerInfo.userId &&
        post &&
        state._t !== "map" && <SaveButton {...post} />}
    </Container>
  );
};

const slideFromLeft = keyframes`
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0;
  }
`;
const slideFromBotton = keyframes`
  0% {
    bottom: -15.6rem;
  }
  100% {
    bottom: 0;
  }
`;

const Container = styled.div<{ isMine: boolean; animation?: boolean }>`
  animation: ${({ animation }) => (animation ? slideFromLeft : "")} 0.25s linear;
  -webkit-animation: ${({ animation }) => (animation ? slideFromLeft : "")}
    0.25s linear;
  -moz-animation: ${({ animation }) => (animation ? slideFromLeft : "")} 0.25s
    linear;
  -o-animation: ${({ animation }) => (animation ? slideFromLeft : "")} 0.25s
    linear;
  .view-toggle {
    right: ${({ isMine }) => (isMine ? "5rem" : "2rem")};
  }
  ${WrapperWithHeader};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 700;
  height: 100vh;
`;

const Wrapper = styled.div<{ isMine: boolean }>`
  background-color: #fff;
  overflow-y: scroll;
  height: 100vh;
  padding-top: 3rem;
  padding-bottom: ${({ isMine }) => (isMine ? "9.2rem" : "14rem")};
  box-sizing: border-box;
  .post-title {
    padding: 0 2rem;
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    padding-bottom: 3rem;
    .content {
      margin-top: 1.4rem;
      font-size: 1.4rem;
      line-height: 165%;
      color: ${theme.color.gray7};
      padding-right: 3rem;
    }
    &:after {
      content: "";
      width: 100%;
      height: 1.6rem;
      background-color: ${theme.color.gray1_5};
    }
  }

  .cards {
    padding: 0 2rem;
    margin-top: 1.6rem;
    ${gap("1.4rem", "column")}
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  padding: 0 2rem;

  & > div:last-child {
    margin-left: 1.2rem;
  }
  .photo {
    width: 4rem;
    height: 4rem;
    background-color: ${theme.color.gray4};
    border-radius: 50%;
  }
  .name {
    font-size: 1.4rem;
    color: ${theme.color.gray7};
    font-weight: bold;
    line-height: 150%;
  }
  .date {
    margin-top: 0.2rem;
    font-size: 1.1rem;
    color: ${theme.color.gray6};
    line-height: 150%;
  }
`;

const Modal = styled.div`
  .modal {
    animation: ${slideFromBotton} 0.25s linear;
    -webkit-animation: ${slideFromBotton} 0.25s linear;
    -moz-animation: ${slideFromBotton} 0.25s linear;
    -o-animation: ${slideFromBotton} 0.25s linear;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.color.white};
    border-top-left-radius: 2.4rem;
    border-top-right-radius: 2.4rem;
    z-index: 700;
    padding: 2.6rem 0.9rem;
    .button {
      font-size: 1.6rem;
      color: ${theme.color.gray7};
      line-height: 135%;
      display: flex;
      align-items: center;

      &:last-child {
        margin-top: 0.8rem;
        color: ${theme.color.red};
        .delete-icon {
          fill: ${theme.color.red};
        }
      }
    }
  }
`;

export default Detail;
