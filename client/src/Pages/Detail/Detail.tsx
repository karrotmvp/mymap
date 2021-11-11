/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deletePost, getPost } from "../../api/post";
import {
  Back,
  Close,
  Delete,
  Edit,
  List,
  Map,
  More2,
  Thumbnail,
} from "../../assets";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard";
import {
  Button,
  gap,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import dayjs from "dayjs";
import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import { ViewerInfo, postDetailAtom, PageBeforeWrite } from "../../Shared/atom";
import { useRouteMatch, useHistory, useParams } from "react-router";
import SaveButton from "./SaveButton";
import { match } from "ts-pattern";
import { reducer } from "./index.reducer";
import MapViewwithSlider from "../../Components/MapViewWithSlider";

const Detail = () => {
  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();

  const { isExact: fromWriteForm } =
    useRouteMatch({
      path: "/detail/:postId/finish",
    }) ?? {};

  const viewerInfo = useRecoilValue(ViewerInfo);
  const [post, setPost] = useRecoilStateLoadable(
    postDetailAtom(parseInt(postId))
  );
  // const resetPost = useResetRecoilState(postDetailAtom(parseInt(postId)));

  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
    isScrollUp: false,
  });
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);

  const pageBeforeWrite = useRecoilValue(PageBeforeWrite);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost(parseInt(postId));
      setPost(data);
    };
    if (fromWriteForm) {
      fetchPost();
    }
  }, []);

  useEffect(() => {
    const targetElement = document.querySelector("#detail-scroll");
    const onScroll = () => {
      dispatch({
        _t: "scroll",
        scrollY: targetElement?.scrollTop || 0,
      });
    };

    targetElement?.addEventListener("scroll", onScroll);
    return () => targetElement?.removeEventListener("scroll", onScroll);
  });

  const onDeleteClick = () => {
    setIsEditModalOpened(false);
    setIsDeleteAlertOpened(true);
  };
  const onDeleteConfirmClick = async () => {
    await deletePost(parseInt(postId));

    history.push(pageBeforeWrite);
  };

  if (post.state !== "hasValue") {
    return null;
  }

  return (
    <>
      <Header>
        <>
          {fromWriteForm ? (
            <Close
              className="left-icon"
              onClick={() => history.push(pageBeforeWrite)}
            />
          ) : (
            <Back className="left-icon" onClick={() => history.goBack()} />
          )}
          {(state._t === "map" ||
            (state._t === "list" && state.isScrollUp)) && (
            <div className="post-title">{post.contents.title}</div>
          )}
          <div
            className="view-toggle"
            onClick={() =>
              dispatch({
                _t: "toggle",
              })
            }
          >
            {match(state._t)
              .with("map", () => (
                <>
                  <List />
                  목록
                </>
              ))
              .with("list", () => (
                <>
                  <Map />
                  지도
                </>
              ))
              .exhaustive()}
          </div>
          {post.contents.user.userId === viewerInfo.userId ? (
            <More2
              className="right-icon"
              onClick={() => setIsEditModalOpened(true)}
            />
          ) : (
            <SaveButton {...post.contents} />
          )}
        </>
      </Header>

      {match(state._t)
        .with("list", () => (
          <Wrapper id="detail-scroll">
            <div className="post-title">
              <Title>{post.contents.title}</Title>
              <div className="content">{post.contents.contents}</div>
            </div>

            <Profile>
              {post.contents.user.profileImageUrl ? (
                <img
                  className="photo"
                  alt="profile"
                  src={post.contents.user.profileImageUrl}
                />
              ) : (
                <Thumbnail className="photo" />
              )}
              <div>
                <div className="name">
                  {post.contents.user.userName}님이 추천하는 리스트예요.
                </div>
                <div className="date">
                  {dayjs(post.contents.createdAt).format("YYYY년 MM월 DD일")} ·{" "}
                  {post.contents.regionName}
                </div>
              </div>
            </Profile>

            <div className="cards">
              {post.contents.pins.map((pin) => (
                <div
                  key={pin.pinId}
                  onClick={() =>
                    dispatch({
                      _t: "toggle",
                    })
                  }
                >
                  <PlaceCard place={pin.place} type="list" />
                </div>
              ))}
            </div>
          </Wrapper>
        ))
        .with("map", () => (
          <MapViewwithSlider places={post.contents.pins.map((p) => p.place)} />
        ))
        .exhaustive()}

      {isEditModalOpened && (
        <Modal>
          <div
            className="background"
            onClick={() => setIsEditModalOpened(false)}
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
      )}
      {isDeleteAlertOpened && (
        <Alert
          close={() => setIsDeleteAlertOpened(false)}
          title="작성한 테마를 삭제하시겠어요?"
          sub="삭제한 테마는 다시 볼 수 없어요."
        >
          <Button onClick={() => setIsDeleteAlertOpened(false)}>취소</Button>
          <Button onClick={onDeleteConfirmClick}>삭제</Button>
        </Alert>
      )}
    </>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding-top: 8rem;
  overflow-y: scroll;
  .post-title {
    padding: 0 2rem;
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    padding-bottom: 3rem;
    .content {
      margin-top: 1.4rem;
      font-size: 1.4rem;
      line-height: 150%;
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
    padding-bottom: 2.8rem;
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
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.color.white};
    border-top-left-radius: 2.4rem;
    border-top-right-radius: 2.4rem;
    z-index: 300;
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
