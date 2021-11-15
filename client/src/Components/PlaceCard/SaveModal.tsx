/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { match } from "ts-pattern";
import { getMyAllPosts, postPost, putPostPin } from "../../api/post";
import {
  LockAround,
  PlacePlus,
  Select,
  UnlockAround,
  Unselect,
} from "../../assets";
import useInput from "../../Hooks/useInput";
import { PlaceToSave, RegionId, ToastMessage } from "../../Shared/atom";
import { PostType } from "../../Shared/type";
import { flexCenter, theme } from "../../styles/theme";
import { reducer } from "./index.reducer";

const SaveModal = () => {
  const [state, dispatch] = useReducer(reducer, {
    _t: null,
    isLocked: false,
    selected: [],
  });
  const [posts, setPosts] = useState<PostType[] | []>([]);
  const [isSubmitable, setIsSubmitable] = useState(false);
  const newThemeValue = useInput("");
  const [placeToSave, setPlaceToSave] = useRecoilState(PlaceToSave);
  const setToastMessage = useSetRecoilState(ToastMessage);

  const regionId = useRecoilValue(RegionId);

  // 원래 저장된 장소
  const savedThemes: number[] = [];

  // 바뀌었는지
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getMyAllPosts(regionId);
      setPosts(data);
      // 이미 포함된 테마들 세팅
      data.forEach((post) => {
        if (post.pins.find((pin) => pin.placeId === placeToSave.placeId))
          savedThemes.push(post.postId);
      });
      dispatch({
        _t: "SET",
        selected: savedThemes,
      });
      setIsSubmitable(false);

      // 한개면 무조건 선택
      if (data.length === 1) {
        dispatch({
          _t: "SELECT",
          selected: data[0].postId,
        });
        setIsSubmitable(true);
      }

      data.find((post) => post.postId);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isChanged) setIsSubmitable(true);
  }, [isChanged]);

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

  let submitFlag = false;
  const submitCheck = () => {
    if (submitFlag) {
      return submitFlag;
    } else {
      submitFlag = true;
      return false;
    }
  };
  const handleNewThemeValue = async () => {
    if (newThemeValue.value.length > 0) {
      if (submitCheck()) return;

      const body = {
        title: newThemeValue.value,
        regionId,
        share: !state.isLocked,
        pins: [],
      };
      const data = await postPost(body);

      try {
        if (data.postId) {
          newThemeValue.setValue("");
          const data = await getMyAllPosts(regionId);
          setPosts(data);
        }
      } finally {
        dispatch({
          _t: "SELECT",
          selected: data.postId,
        });
        setIsSubmitable(true);
      }
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

                          setToastMessage({
                            isToastShown: true,
                            message: "나만 볼 수 있는 테마예요",
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

                          setToastMessage({
                            isToastShown: true,
                            message: "이웃들도 이 테마를 볼 수 있어요",
                          });
                        }}
                      />
                    ))
                    .exhaustive()}
                  <Input
                    placeholder="만들고 싶은 테마 이름을 입력"
                    value={newThemeValue.value}
                    onChange={newThemeValue.onChange}
                  />
                  <NewBtn
                    disabled={newThemeValue.value.length === 0}
                    onClick={handleNewThemeValue}
                  >
                    완료
                  </NewBtn>
                </>
              ))
              .with("theme", () => (
                <>
                  <PlacePlus />
                  <div style={{ color: theme.color.gray5 }}>
                    새로운 테마 만들기
                  </div>
                </>
              ))
              .with(null, () => (
                <>
                  <PlacePlus />
                  <div style={{ color: theme.color.gray5 }}>
                    새로운 테마 만들기
                  </div>
                </>
              ))
              .exhaustive()}
          </Theme>

          {posts?.map((post) => (
            <Theme
              key={post.postId}
              onClick={() => {
                setIsChanged(true);
                dispatch({
                  _t: state.selected.find((id) => id === post.postId)
                    ? "REMOVE"
                    : "SELECT",
                  selected: post.postId,
                });
              }}
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
const NewBtn = styled.div<{ disabled: boolean }>`
  ${flexCenter};
  position: absolute;
  background-color: ${({ disabled }) =>
    disabled ? theme.color.gray2 : theme.color.orange};
  width: 4.8rem;
  height: 2.8rem;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 135%;
  right: 0;
  border-radius: 0.4rem;
  color: ${({ disabled }) => (disabled ? theme.color.gray4 : "#fff")};
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
      position: relative;
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
