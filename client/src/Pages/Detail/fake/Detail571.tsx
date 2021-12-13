import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import PlaceCard from "../../../Components/PlaceCard/PlaceCard";
import { RegionId } from "../../../Shared/atom";
import { PostType } from "../../../Shared/type";
import { theme, Title } from "../../../styles/theme";

type Action =
  | {
      _t: "toggle";
    }
  | {
      _t: "scroll";
      scrollY: number;
    }
  | {
      _t: "select";
      sliderCurrent: number;
      isSelected: boolean;
    };

const Detail571 = ({
  dispatch,
  post,
}: {
  dispatch: React.Dispatch<Action>;
  post: PostType;
}) => {
  const regionId = useRecoilValue(RegionId);

  // 카드 클릭하면 해당 인덱스 지도뷰
  const handleClickPlaceCard = (idx: number) => {
    dispatch({
      _t: "select",
      sliderCurrent: idx,
      isSelected: true,
    });
  };

  return (
    <>
      <div className="post-title">
        <Title style={{ color: theme.color.black }}>{post?.title}</Title>
        <div className="content">{post?.contents}</div>
      </div>

      <div>
        {post?.user.profileImageUrl ? (
          <img
            className="photo"
            alt="profile"
            src={post?.user.profileImageUrl}
          />
        ) : (
          <div className="photo" />
        )}
        <div>
          <div className="name">
            {post?.user.userName}님이 추천하는 장소예요.
          </div>
          <div className="date">
            {dayjs(post?.createdAt).format("YYYY년 MM월 DD일")} ·{" "}
            {post?.regionName}
          </div>
        </div>
      </div>

      <div className="cards">
        {post?.pins.map((pin, i) => (
          <div key={pin.pinId} onClick={() => handleClickPlaceCard(i)}>
            <PlaceCard
              place={pin.place}
              type="list"
              isDifferentRegion={regionId !== post.regionId}
              postRegionName={post.regionName}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Detail571;
