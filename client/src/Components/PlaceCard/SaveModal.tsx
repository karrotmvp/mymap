import { useEffect, useReducer, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { match } from "ts-pattern";
import { getMyPostNames, putPostPin } from "../../api/post";
import {
  LockAround,
  PlacePlus,
  Select,
  UnlockAround,
  Unselect,
} from "../../assets";
import { PlaceToSave } from "../../Shared/atom";
import { PostType } from "../../Shared/type";
import { theme } from "../../styles/theme";
import { reducer } from "./index.reducer";

const SaveModal = () => {
  const [state, dispatch] = useReducer(reducer, {
    _t: null,
    isLocked: false,
    selected: [],
  });
  const [posts, setPosts] = useState<PostType[] | []>([]);
  const [isSubmitable, setIsSubmitable] = useState(false);

  const [placeToSave, setPlaceToSave] = useRecoilState(PlaceToSave);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getMyPostNames();
      setPosts(data.posts);
      if (data.posts.length === 1) {
        dispatch({
          _t: "SELECT",
          selected: data.posts[0].postId,
        });
        setIsSubmitable(true);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (state.selected.length > 0) {
      setIsSubmitable(true);
    } else {
      setIsSubmitable(false);
    }
  }, [state.selected]);

  const handleSubmit = async () => {
    if (isSubmitable) {
      await putPostPin(
        { postId: state.selected },
        { placeId: placeToSave.placeId }
      );
      setPlaceToSave({
        isModalOpened: false,
        placeId: "",
      });
    }
  };

  return (
    <Wrapper {...{ isSubmitable }}>
      <div
        className="background"
        onClick={() =>
          setPlaceToSave({
            isModalOpened: false,
            placeId: "",
          })
        }
      />
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>테마에 장소 추가</div>
        {state._t === "make" ? <div /> : <div onClick={handleSubmit}>저장</div>}

        <div className="list">
          <Theme
            onClick={() =>
              dispatch({
                _t: "MAKE",
                isLocked: false,
              })
            }
            disabled={state._t === "theme"}
          >
            {match(state._t)
              .with("make", () => (
                <>
                  {match(state.isLocked)
                    .with(false, () => (
                      <UnlockAround
                        onClick={(e) => {
                          e.stopPropagation();

                          dispatch({
                            _t: "MAKE",
                            isLocked: true,
                          });
                        }}
                      />
                    ))
                    .with(true, () => (
                      <LockAround
                        onClick={(e) => {
                          e.stopPropagation();

                          dispatch({
                            _t: "MAKE",
                            isLocked: false,
                          });
                        }}
                      />
                    ))
                    .exhaustive()}
                  <Input placeholder="만들고 싶은 테마 이름을 입력" />
                </>
              ))
              .with("theme", () => (
                <>
                  <PlacePlus />
                  <div>새로운 테마 만들기</div>
                </>
              ))
              .with(null, () => (
                <>
                  <PlacePlus />
                  <div>새로운 테마 만들기</div>
                </>
              ))
              .exhaustive()}
          </Theme>

          {posts.map((post) => (
            <Theme
              key={post.postId}
              onClick={() =>
                dispatch({
                  _t: state.selected.find((id) => id === post.postId)
                    ? "REMOVE"
                    : "SELECT",
                  selected: post.postId,
                })
              }
              disabled={state._t === "make"}
            >
              {state.selected.find((id) => id === post.postId) ? (
                <Select />
              ) : (
                <Unselect />
              )}
              <div>{post.title}</div>
            </Theme>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Input = styled.input`
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 135%;
  margin-left: 1rem;
  caret-color: ${theme.color.orange};
  ::placeholder {
    color: ${theme.color.gray3};
  }
`;

const Wrapper = styled.div<{ isSubmitable: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  height: 100vh;
  width: 100%;
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: calc(100vh / 3 * 2);
    z-index: 500;
    box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
    border-radius: 2rem 2rem 0 0;
    padding: 0 2rem;
    box-sizing: border-box;
    & > div:nth-child(1) {
      width: 100%;
      margin-top: 2.9rem;
      text-align: center;
      color: ${theme.color.gray7};
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 135%;
    }
    & > div:nth-child(2) {
      position: absolute;
      right: 2.1rem;
      top: 2.9rem;
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 135%;
      color: ${({ isSubmitable }) =>
        isSubmitable ? theme.color.orange : theme.color.gray3};
    }
    .list {
      overflow-y: scroll;
      height: 100%;
      margin-top: 1.8rem;
      padding-bottom: 7.7rem;
      box-sizing: border-box;
      & > div:not(:first-child) {
        border-top: 0.1rem solid ${theme.color.gray1_7};
      }
    }
  }
`;

const Theme = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 1.1rem 0;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 135%;
  opacity: ${({ disabled }) => (!disabled ? 1 : 0.5)};
  & > div {
    margin-left: 1rem;
  }
`;

export default SaveModal;
