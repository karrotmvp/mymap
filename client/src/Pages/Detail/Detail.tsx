/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { deletePost, useGetPost } from "../../api/post";
import {
  Back,
  Close,
  Delete,
  Edit,
  Map,
  MapBack,
  More2,
  Plus,
  Thumbnail,
} from "../../assets";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import {
  Button,
  flexCenter,
  gap,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ViewerInfo,
  PageBeforeWrite,
  RegionId,
  PostToEdit,
} from "../../Shared/atom";
import { useRouteMatch, useHistory, useParams } from "react-router";
import SaveButton from "./SaveButton";
import { match } from "ts-pattern";
import { reducer } from "./index.reducer";
import MapViewwithSlider from "../../Components/MapViewWithSlider";
import { regionsGroup } from "../../utils/const";
import { Mixpanel } from "../../utils/mixpanel";
import Fake from "./Fake";
import { mini } from "../../App";
import SearchPlace from "../Write/SearchPlace";

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

  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
    isScrollUp: false,
    sliderCurrent: 0,
    isSelected: false,
  });
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);
  const [isCloseAlertOpened, setIsCloseAlertOpened] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const regionId = useRecoilValue(RegionId);
  const [pageBeforeWrite, setPageBeforeWrite] = useRecoilState(PageBeforeWrite);
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
    const targetElement = document.querySelector("#detail-scroll");
    targetElement?.scrollTo(0, 0);

    if (post) {
      setPostToEdit(post);
      Mixpanel.track("????????? ??????", { postId: post.postId });
    }
  }, [post]);

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

  const handleAddPlace = () => {
    setPageBeforeWrite("detail");
    setIsSearchOpened(true);
  };

  return (
    <Container
      animation={!fromWriteForm}
      isMine={post?.user.userId === viewerInfo.userId}
    >
      {state._t === "map" ? (
        <div
          className="map-back"
          onClick={() =>
            dispatch({
              _t: "toggle",
            })
          }
        >
          <MapBack />
        </div>
      ) : (
        <Header
          style={{ zIndex: 600 }}
          isMapView={!(state._t === "list" && state.isScrollUp)}
        >
          <>
            {fromWriteForm || fromDetail ? (
              <Close
                className="left-icon"
                onClick={() => {
                  if (fromDetail) {
                    setIsCloseAlertOpened(true);
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

            {state.isScrollUp && (
              <div className="post-title">{post?.title}</div>
            )}

            <div
              className="view-toggle"
              onClick={() => {
                dispatch({
                  _t: "toggle",
                });
                if (postId === 571 || postId === 559 || postId === 576) {
                  Mixpanel.track("??????3 - ?????? ?????? ??????");
                }
              }}
            >
              <Map />
              ????????? ??????
            </div>
            {post?.user.userId === viewerInfo.userId && (
              <More2
                className="right-icon"
                onClick={() => setIsEditModalOpened(true)}
              />
            )}
          </>
        </Header>
      )}

      {post &&
        match(state._t)
          .with("list", () => (
            <Wrapper
              id="detail-scroll"
              isMine={post?.user.userId === viewerInfo.userId}
            >
              {postId === 560 ||
              postId === 555 ||
              postId === 568 ||
              postId === 570 ||
              postId === 571 ||
              postId === 573 ||
              postId === 559 ||
              postId === 576 ? (
                <Fake {...{ post }} />
              ) : (
                <>
                  <div className="post-title">
                    <Title style={{ color: theme.color.black }}>
                      {post?.title}
                    </Title>
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
                        {post?.user.userName}?????? ???????????? ????????????.
                      </div>
                      <div className="date">
                        {dayjs(post?.createdAt).format("YYYY??? MM??? DD???")} ??{" "}
                        {post?.regionName}
                      </div>
                    </div>
                  </Profile>

                  <div className="cards">
                    {post?.pins.map((pin, i) => (
                      <PlaceCard
                        key={pin.pinId}
                        place={pin.place}
                        type="list"
                        postRegionId={post.regionId}
                        postRegionName={post.regionName}
                      />
                    ))}

                    {post?.user.userId === viewerInfo.userId &&
                      post.pins.length < 10 && (
                        <div className="add-button" onClick={handleAddPlace}>
                          <Plus className="add-icon" />
                          ?????? ??????
                        </div>
                      )}
                  </div>
                </>
              )}
            </Wrapper>
          ))
          .with(
            "map",
            () =>
              post && (
                <div className="map">
                  <MapViewwithSlider
                    places={post.pins.map((p) => p.place)}
                    postRegionId={post.regionId}
                    postRegionName={post.regionName}
                    defaultCurrent={state.sliderCurrent}
                  />
                </div>
              )
          )
          .exhaustive()}

      {isEditModalOpened &&
        (!regionGroup?.find((id) => id === post?.regionId) ? (
          <Alert
            close={() => setIsEditModalOpened(false)}
            title="????????? ????????? ????????????."
            sub={`????????? ??????????????? ????????? ??? ?????????.
${post?.regionName}??? ????????? ?????????.`}
          >
            <Button
              className="orange"
              onClick={() => setIsEditModalOpened(false)}
            >
              ??????
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
                ????????????
              </Link>
              <div onClick={onDeleteClick} className="button">
                <Delete className="delete-icon" />
                ????????????
              </div>
            </div>
          </Modal>
        ))}
      {isDeleteAlertOpened && (
        <Alert
          close={() => setIsDeleteAlertOpened(false)}
          title="????????? ????????? ??????????????????????"
          sub="????????? ????????? ?????? ??? ??? ?????????."
        >
          <Button
            className="white"
            onClick={() => setIsDeleteAlertOpened(false)}
          >
            ??????
          </Button>
          <Button onClick={onDeleteConfirmClick}>??????</Button>
        </Alert>
      )}

      {isCloseAlertOpened && (
        <Alert
          close={() => setIsCloseAlertOpened(false)}
          title={`${post?.regionName} ????????? ???????????? ????????? ????????? 
          ??????????????? ??????????????????.`}
        >
          <Button className="white" onClick={() => mini.close()}>
            ?????? ????????????
          </Button>
          <Button
            onClick={() => {
              Mixpanel.track("?????? ?????? ?????? - ?????????");
              mini.close();
            }}
          >
            ?????????
          </Button>
        </Alert>
      )}

      {isSearchOpened && post && (
        <SearchPlace
          places={post.pins.map((pin) => pin.place) ?? []}
          postIdFromProps={post.postId}
          refetchDetail={() => refetchPost()}
          {...{ setIsSearchOpened, refetchPost }}
          close={() => setIsSearchOpened(false)}
        />
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
  .map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .map-back {
    ${flexCenter};
    position: fixed;
    top: 0.8rem;
    left: 0.8rem;
    z-index: 800;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    background-color: #fff;
    border: 0.1rem solid ${theme.color.gray3};
  }
`;

const Wrapper = styled.div<{ isMine: boolean }>`
  background-color: #fff;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: ${({ isMine }) => (isMine ? "9.2rem" : "14rem")};
  box-sizing: border-box;
  .post-title {
    margin-top: 3rem;
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
    margin-bottom: 0.9rem;
    ${gap("1.4rem", "column")}
    .title {
      margin-top: 3.2rem;
      font-weight: 500;
      font-size: 21px;
      line-height: 30px;
    }
  }
  .add-button {
    ${flexCenter};
    position: relative;
    border-radius: 1rem;
    height: 5rem;
    border: 0.1rem dashed ${theme.color.orange};
    font-size: 1.4rem;
    line-height: 135%;
    font-weight: 500;
    margin-top: 1.4rem;
    margin-bottom: -5rem;
    color: ${theme.color.orange};
    .add-icon {
      position: absolute;
      top: 0;
      left: 0;
      fill: ${theme.color.orange};
    }
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
