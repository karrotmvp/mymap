import { useState } from "react";
import { useParams } from "react-router";
import { deleteSavedPost, postSavedPost } from "../../api/post";
import { Save, SaveActive } from "../../assets";
import useDebounce from "../../Hooks/useDebounce";
import { PostType } from "../../Shared/type";

const SaveButton = (post: PostType) => {
  const { postId } = useParams<{ postId: string }>();

  const [isSaved, setIsSaved] = useState<boolean | null>(post.saved);
  const handleSaveToggle = async () => {
    setIsSaved(!isSaved);
    if (!isSaved) await postSavedPost(parseInt(postId));
    else await deleteSavedPost(parseInt(postId));
  };
  const debouncedIsSaved = useDebounce(handleSaveToggle, 200);

  return (
    <>
      {isSaved ? (
        <SaveActive className="right-icon" onClick={debouncedIsSaved} />
      ) : (
        <Save className="right-icon" onClick={debouncedIsSaved} />
      )}
    </>
  );
};

export default SaveButton;
