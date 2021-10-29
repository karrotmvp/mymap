/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../../api/post";
import { Back, Close, Delete, Edit, List, Map, More2 } from "../../assets";
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
import DetailMapView from "./DetailMapView";
import dayjs from "dayjs";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { MyInfo, postDetailAtom } from "../../Shared/atom";
import { useRouteMatch, useHistory, useParams } from "react-router";
import SaveButton from "./SaveButton";
import { match } from "ts-pattern";
import { reducer } from "./index.reducer";

const Detail = () => {
  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();

  const { isExact: fromWriteForm } =
    useRouteMatch({
      path: "/detail/:postId/finish",
    }) ?? {};

  const myInfo = useRecoilValue(MyInfo); // viewer
  const post = useRecoilValueLoadable(postDetailAtom(postId));

  const [state, dispatch] = useReducer(reducer, {
    _t: "list",
    isScrollUp: false,
  });
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      dispatch({
        _t: "scroll",
        scrollY: window.scrollY,
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDeleteClick = () => {
    setIsEditModalOpened(false);
    setIsDeleteAlertOpened(true);
  };
  const onDeleteConfirmClick = async () => {
    await deletePost(postId);

    // 왜?
    history.go(-2);
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
              onClick={() => window.history.go(-3)}
            />
          ) : (
            <Back className="left-icon" onClick={() => window.history.back()} />
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
          {post.contents.user.userId === myInfo.userId ? (
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
          <Wrapper>
            <Title>{post.contents.title}</Title>
            <div className="content">{post.contents.contents}</div>

            <Profile>
              <div className="photo" />
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
                  <PlaceCard place={pin.place} />
                </div>
              ))}
            </div>
          </Wrapper>
        ))
        .with("map", () => <DetailMapView pins={post.contents.pins} />)
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
          title="저장해놓은 리스트를 삭제하시겠어요?"
          sub="삭제한 리스트는 다시 볼 수 없어요."
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
  padding: 0 2rem;
  padding-top: 5.4rem;
  .content {
    margin-top: 1.4rem;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${theme.color.gray7};
    padding-right: 3rem;
  }
  .cards {
    margin-top: 1.4rem;
    margin-bottom: 3.5rem;
    ${gap("1.4rem", "column")}
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  padding: 1.5rem;
  box-sizing: border-box;
  background: rgba(255, 121, 100, 0.1);
  border-radius: 1rem;

  & > div:last-child {
    margin-left: 1.2rem;
  }
  .photo {
    width: 4rem;
    height: 4rem;
    background-color: lightgray;
    border-radius: 50%;
  }
  .name {
    font-size: 1.4rem;
    color: ${theme.color.gray7};
    font-weight: bold;
    line-height: 150%;
  }
  .date {
    margin-top: 0.3rem;
    font-size: 1.1rem;
    color: ${theme.color.gray6};
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
    z-index: 100;
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
