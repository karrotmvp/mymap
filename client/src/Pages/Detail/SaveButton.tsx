import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteSavedPost, postSavedPost } from "../../api/post";
import { Save, SaveActive } from "../../assets";
import useDebounce from "../../Hooks/useDebounce";
import { Code, PostIsSaved, RegionId, ViewerInfo } from "../../Shared/atom";
import { PostType } from "../../Shared/type";
import { flexCenter, theme } from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import { startPreset, token } from "../../utils/preset";

const SaveButton = (post: PostType) => {
  const [isSaved, setIsSaved] = useRecoilState(
    PostIsSaved(post.postId.toString())
  );

  const regionId = useRecoilValue(RegionId);
  const code = useRecoilValue(Code);
  const setViewerInfo = useSetRecoilState(ViewerInfo);

  const handleSaveToggle = async () => {
    if (!token) {
      startPreset({ ...{ setViewerInfo, code, regionId } });
    } else {
      setIsSaved(!isSaved);
      if (!isSaved) {
        Mixpanel.track("테마 저장 - 상세");
        await postSavedPost(post.postId);
      } else await deleteSavedPost(post.postId);
    }
  };
  const debouncedIsSaved = useDebounce(handleSaveToggle, 200);

  return (
    <Wrapper {...{ isSaved }}>
      {isSaved ? (
        <div className="button" onClick={debouncedIsSaved}>
          <SaveActive className="icon" />
          <div>테마를 저장했어요</div>
        </div>
      ) : (
        <div className="button" onClick={debouncedIsSaved}>
          <Save className="icon" />
          <div>테마 저장하기</div>
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
