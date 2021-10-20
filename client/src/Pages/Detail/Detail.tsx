import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPost } from "../../api/post";
import { Back, Close, Delete, Edit, List, Map, More2 } from "../../assets";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard";
import { PostType } from "../../Shared/type";
import {
  Button,
  gap,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import DetailMapView from "./DetailMapView";

const Detail = () => {
  const postId = parseInt(window.location.pathname.split("detail/")[1]);
  const isFinished =
    (window.location.pathname.split("/")[3] ?? "") === "finish";

  const [post, setPost] = useState<PostType | null>();
  const getPostCallback = useCallback(async () => {
    const data = await getPost(postId);
    setPost(data);
  }, [postId]);

  useEffect(() => {
    getPostCallback();
  }, [getPostCallback]);

  const [viewState, setViewState] = useState<"map" | "list">("list");
  const handleViewState = () => {
    if (viewState === "map") setViewState("list");
    else setViewState("map");
  };

  const [isScrollUp, setIsScrollUp] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setIsScrollUp(true);
      else setIsScrollUp(false);
    });
    return window.removeEventListener("scroll", () => {});
  }, []);

  // 편집 / 삭제
  const [isMoreOpened, setIsMoreOpened] = useState(false);

  // 삭제
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const handleDelete = () => {
    setIsMoreOpened(false);
    setIsAlertOpened(true);
  };

  return (
    <>
      <Header>
        <>
          {isFinished ? (
            <Close
              className="left-icon"
              onClick={() => window.history.go(-3)}
            />
          ) : (
            <Back className="left-icon" onClick={() => window.history.back()} />
          )}
          {(isScrollUp || viewState === "map") && (
            <div className="post-title">{post?.title}</div>
          )}
          <div className="view-toggle" onClick={handleViewState}>
            {viewState === "map" ? <List /> : <Map />}
            {viewState === "map" ? "목록" : "지도"}
          </div>
          <More2 className="right-icon" onClick={() => setIsMoreOpened(true)} />
        </>
      </Header>

      {viewState === "list" && (
        <Wrapper>
          <Title>{post?.title}</Title>
          <div className="content">{post?.contents}</div>

          <Profile>
            <div className="photo" />
            <div>
              <div className="name">레일라님이 추천하는 리스트예요.</div>
              <div className="date">2021년 06월 14일 · 논현동</div>
            </div>
          </Profile>

          <div className="cards">
            {post?.pins.map((pin) => (
              <div key={pin.pinId} onClick={handleViewState}>
                <PlaceCard place={pin.place} />
              </div>
            ))}
          </div>
        </Wrapper>
      )}

      {/* 편집삭제 모달 */}
      {isMoreOpened && (
        <Modal>
          <div className="background" onClick={() => setIsMoreOpened(false)} />
          <div className="modal">
            <Link to={`/edit/${postId}`} className="button">
              <Edit />
              수정하기
            </Link>
            <div onClick={handleDelete} className="button">
              <Delete className="delete-icon" />
              삭제하기
            </div>
          </div>
        </Modal>
      )}

      {/* 삭제 alert */}
      {isAlertOpened && (
        <Alert
          close={() => setIsAlertOpened(false)}
          title="저장해놓은 리스트를 삭제하시겠어요?"
          sub="삭제한 리스트는 다시 볼 수 없어요."
        >
          <Button onClick={() => setIsAlertOpened(false)}>취소</Button>
          <Button>삭제</Button>
        </Alert>
      )}

      {/* 지도뷰 */}
      {viewState === "map" && <DetailMapView pins={post!.pins} />}
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
