import { useState } from "react";
import styled from "styled-components";
import { deleteSavedPost, postSavedPost } from "../../api/post";
import { Save2, SaveActive2 } from "../../assets";
import useDebounce from "../../Hooks/useDebounce";
import { PostType } from "../../Shared/type";
import { flexCenter, theme } from "../../styles/theme";

interface SaveFooterInterface {
  post: PostType;
}
const SaveFooter = ({ post }: SaveFooterInterface) => {
  const [isSaved, setIsSaved] = useState<boolean>(post.saved);
  const [savedNum, setSavedNum] = useState<number>(post.savedNum);

  const handleSaveToggle = async () => {
    setIsSaved(!isSaved);

    // 저장
    if (!isSaved) {
      await postSavedPost(post.postId);
      if (!post.saved || savedNum - post.savedNum === -1)
        setSavedNum(savedNum + 1);
    }
    // 저장 취소
    else {
      await deleteSavedPost(post.postId);
      if (post.saved || savedNum - post.savedNum === 1)
        setSavedNum(savedNum - 1);
    }
  };
  const debouncedIsSaved = useDebounce(handleSaveToggle, 200);

  return (
    <Wrapper>
      <div className="saved-info">
        {savedNum > 0 && `${savedNum}명 주민이 이 리스트를 저장했어요`}
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {isSaved ? (
          <SaveActive2 onClick={debouncedIsSaved} />
        ) : (
          <Save2 onClick={debouncedIsSaved} />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter};
  justify-content: space-between;
  margin-top: 1.2rem;
  padding-right: 2rem;
  .saved-info {
    color: ${theme.color.gray6};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 145%;
  }
`;

export default SaveFooter;
