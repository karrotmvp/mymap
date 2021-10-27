import { Dispatch, SetStateAction } from "react";
import { deleteSavedPost, postSavedPost } from "../../api/post";
import { Save2, SaveActive2 } from "../../assets";
import useDebounce from "../../Hooks/useDebounce";
import { PostType } from "../../Shared/type";

interface SaveButtonInterface {
  post: PostType;
  isSaved: boolean;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
}
const SaveButton = ({ isSaved, setIsSaved }: SaveButtonInterface) => {
  const postId = parseInt(window.location.pathname.split("detail/")[1]);

  const handleSaveToggle = async () => {
    setIsSaved(!isSaved);
    if (!isSaved) await postSavedPost(postId);
    else await deleteSavedPost(postId);
  };
  const debouncedIsSaved = useDebounce(handleSaveToggle, 200);

  return (
    <>
      {isSaved ? (
        <SaveActive2 onClick={debouncedIsSaved} />
      ) : (
        <Save2 onClick={debouncedIsSaved} />
      )}
    </>
  );
};

export default SaveButton;
