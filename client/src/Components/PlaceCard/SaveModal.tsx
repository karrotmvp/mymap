/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { useRouteMatch } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { match } from "ts-pattern";
import { postPost, putPostPin, useGetMyAllPosts } from "../../api/post";
import {
  LockAround,
  PlacePlus,
  Select,
  UnlockAround,
  Unselect,
} from "../../assets";
import useInput from "../../Hooks/useInput";
import { PlaceToSave, RegionId, ToastMessage } from "../../Shared/atom";
import { flexCenter, theme } from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import { reducer } from "./index.reducer";

const SaveModal = () => {
  const isAround = useRouteMatch({ path: "/around" })?.isExact;
  const [state, dispatch] = useReducer(reducer, {
    _t: null,
    isLocked: false,
    selected: [],
  });
  const [isSubmitable, setIsSubmitable] = useState(false);
  const newThemeValue = useInput("");
  const [placeToSave, setPlaceToSave] = useRecoilState(PlaceToSave);
  const setToastMessage = useSetRecoilState(ToastMessage);

  const regionId = useRecoilValue(RegionId);

  // 원래 저장된 장소
  const savedThemes: number[] = [];

  // 바뀌었는지
  const [isChanged, setIsChanged] = useState(false);

  const { data: posts, refetch: refetchPosts } = useGetMyAllPosts(regionId);

  const handleSubmit = async () => {
    if (isSubmitable) {
      Mixpanel.track("장소 저장");
      if (isAround) {
        Mixpanel.track("둘러보기 - 장소 저장");
      }
      await putPostPin(
        { postId: state.selected, regionId },
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

      Mixpanel.track("장소 저장 - 새로운 테마 만들기");
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
          refetchPosts();
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

  useEffect(() => {
    if (posts) {
      // 이미 포함된 테마들 세팅
      posts.forEach((post) => {
        if (post.pins.find((pin) => pin.placeId === placeToSave.placeId))
          savedThemes.push(post.postId);
      });
      dispatch({
        _t: "SET",
        selected: savedThemes,
      });
      setIsSubmitable(false);

      // 한개면 무조건 선택
      if (posts.length === 1) {
        dispatch({
          _t: "SELECT",
          selected: posts[0].postId,
        });
        setIsSubmitable(true);
      }

      posts.find((post) => post.postId);
    }
  }, []);

  useEffect(() => {
    if (isChanged) setIsSubmitable(true);
  }, [isChanged]);

  useEffect(() => {
    if (state._t === "make") {
      const element = document.querySelector(
        "#new-theme-input"
      ) as HTMLInputElement;
      element.focus();
    }
  }, [state._t]);

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
            onClick={() => {
              dispatch({
                _t: "MAKE",
                isLocked: state.isLocked,
              });
            }}
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
                    id="new-theme-input"
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
                  <div style={{ color: theme.color.gray5, marginLeft: "1rem" }}>
                    새로운 테마 만들기
                  </div>
                </>
              ))
              .with(null, () => (
                <>
                  <PlacePlus />
                  <div style={{ color: theme.color.gray5, marginLeft: "1rem" }}>
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
              <div className="theme-title">{post.title}</div>
            </Theme>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const slideFromBotton = keyframes`
  0% {
    height: 0;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 135%;
  margin-left: 1rem;
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
  z-index: 800;
  height: 100vh;
  width: 100%;
  svg {
    min-width: 3.4rem;
  }
  .modal {
    animation: ${slideFromBotton} 0.25s linear;
    -webkit-animation: ${slideFromBotton} 0.25s linear;
    -moz-animation: ${slideFromBotton} 0.25s linear;
    -o-animation: ${slideFromBotton} 0.25s linear;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: calc(100vh / 3 * 2);
    z-index: 800;
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
  .theme-title {
    margin-left: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-y: hidden;
    width: 100%;
  }
`;

export default SaveModal;
