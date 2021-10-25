import { useState } from "react";
import { deleteSavedPost, postSavedPost } from "../../api/post";
import { Save, SaveActive } from "../../assets";
import useDebounce from "../../Hooks/useDebounce";
import { PostType } from "../../Shared/type";

const SaveButton = (post: PostType) => {
  const postId = parseInt(window.location.pathname.split("detail/")[1]);

  const [isSaved, setIsSaved] = useState<boolean | null>(post.saved);
  const handleSaveToggle = async () => {
    setIsSaved(!isSaved);
    if (!isSaved) await postSavedPost(postId);
    else await deleteSavedPost(postId);
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
