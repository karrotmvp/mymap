/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteSavedPost, postSavedPost } from "../../api/post";
import { Save, SaveActive } from "../../assets";
import useDebounce from "../../Hooks/useDebounce";
import {
  PostIsSaved,
  RegionId,
  ToastMessage,
  ViewerInfo,
} from "../../Shared/atom";
import { PostType } from "../../Shared/type";
import { flexCenter, theme } from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import { funcNeedLogin } from "../../utils/preset";

const SaveButton = (post: PostType, fromDetail?: boolean) => {
  const [isSaved, setIsSaved] = useRecoilState(
    PostIsSaved(post.postId.toString())
  );

  const regionId = useRecoilValue(RegionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);
  const setToastMessage = useSetRecoilState(ToastMessage);

  const handleSaveToggle = async () => {
    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: async () => {
          setIsSaved(!isSaved);
          if (!isSaved) {
            Mixpanel.track("테마 저장 - 상세", { postId: post.postId });
            await postSavedPost(post.postId);
          } else await deleteSavedPost(post.postId);
        },
      },
    });
  };
  const debouncedIsSaved = useDebounce(handleSaveToggle, 200);

  useEffect(() => {
    if (fromDetail && isSaved) {
      Mixpanel.track("검증3 - 마음에 들어요 클릭");
      setToastMessage({
        isToastShown: true,
        message: "저장한 테마는 나의 테마에서 볼 수 있어요",
      });
    }
  }, [isSaved]);

  return (
    <Wrapper {...{ isSaved }}>
      {isSaved ? (
        <div className="button" onClick={debouncedIsSaved}>
          {!fromDetail && <SaveActive className="icon" />}
          <div>벌써 좋아한 테마에요</div>
        </div>
      ) : (
        <div className="button" onClick={debouncedIsSaved}>
          {!fromDetail && <Save className="icon" />}
          <div>마음에 들어요</div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isSaved: boolean }>`
  position: fixed;
  width: 100%;
  height: 7.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  padding: 1rem 2rem 1.4rem 2rem;
  background-color: #fff;
  box-sizing: border-box;
  .button {
    width: 100%;
    height: 5.2rem;
    position: relative;
    ${flexCenter};
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 135%;
    border-radius: 1rem;
    border: 0.1rem solid
      ${({ isSaved }) =>
        isSaved ? theme.color.orange_medium : theme.color.orange};
    background-color: ${({ isSaved }) =>
      isSaved ? theme.color.orange_light : theme.color.orange};
    color: ${({ isSaved }) =>
      isSaved ? theme.color.orange : theme.color.white};

    .icon {
      position: absolute;
      left: 0.6rem;
    }
  }
`;

export default SaveButton;
