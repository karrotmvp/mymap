import styled from "styled-components";
import { flexCenter, theme, Title } from "../../styles/theme";
import Collection from "../../Components/Collection";
import CreateButton from "../../Components/CreateButton";
import { PostType } from "../../Shared/type";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGetRegion } from "../../api/region";
import { DetailId, RegionId } from "../../Shared/atom";
import { regionsGroup } from "../../utils/const";
import { useGetPost } from "../../api/post";

const MainSlide = ({
  isScrollUp,
  posts,
  setIsMapShown,
}: {
  isScrollUp: boolean;
  posts: PostType[];
  setIsMapShown: Dispatch<SetStateAction<boolean>>;
}) => {
  const regionId = useRecoilValue(RegionId);
  const { data: regionName } = useGetRegion(regionId);

  let recommendPostId: number;
  let recommendPostImg: string;
  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  if (regionGroup?.find((region) => region === "471abc99b378")) {
    // 서초
    recommendPostId = 571;
    recommendPostImg = "/fake-child-img.svg";
  } else if (regionGroup?.find((region) => region === "5424e9f7ec6d")) {
    // 잠실
    recommendPostId = 559;
    recommendPostImg = "/fake-cafe-img.svg";
  } else {
    // 한남
    recommendPostId = 576;
    recommendPostImg = "/fake-dog-img.svg";
  }

  const { data: recommendPost } = useGetPost(recommendPostId);
  const [detailId, setDetailId] = useRecoilState(DetailId);

  return (
    <>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          setIsMapShown(false);
        }}
      >
        {!isScrollUp && (
          <div className="rectangle">
            <div />
          </div>
        )}

        <div className="recommend">
          <Title style={{ color: theme.color.black }}>
            이번 주 추천 테마예요
          </Title>
          <div className="sub">
            당장모아가 직접 선정한 추천 테마를 구경해 보세요
          </div>
          {recommendPost && (
            <Recommend
              onClick={() => setDetailId([...detailId, recommendPost.postId])}
            >
              <img src={recommendPostImg} alt="recommend" />
              <div className="recommend-info">
                <div className="recommend-title">
                  {recommendPostId === 576
                    ? `우리집 막내 초롱이와
                같이 갈 수 있는 식당`
                    : recommendPost.title}
                </div>
                <div className="recommend-user">
                  {recommendPost.user.userName}
                </div>
              </div>
            </Recommend>
          )}
        </div>

        <div className="content">
          <Title className="main-title">{`${regionName} 이웃들이 만든
테마 지도를 구경해 보세요`}</Title>

          <div className="collections">
            {posts.map((post) => (
              <Collection key={post.postId} {...{ post }} />
            ))}
          </div>
        </div>
      </Card>
      <CreateButton targetId="main-scroll" />
    </>
  );
};

const Card = styled.div`
  position: relative;
  min-height: 50vh;
  background-color: ${theme.color.white};
  padding-top: 4.1rem;
  box-sizing: border-box;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
  .collections {
    margin-top: 0.4rem;
    padding-bottom: 8.6rem;
    & > div:not(:first-child) {
      border-top: 0.1rem solid ${theme.color.gray1_7};
    }
  }
  .content {
    top: 0;
    .main-title {
      padding-left: 2rem;
      margin-top: 5rem;
      color: ${theme.color.black};
    }
  }
  .rectangle {
    ${flexCenter};
    & > div {
      background-color: ${theme.color.gray2};
      border-radius: 2rem;
      width: 4rem;
      height: 0.3rem;
      position: absolute;
      top: 1.4rem;
    }
  }
  .recommend {
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
    padding-bottom: 5rem;
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    .sub {
      margin-top: 0.5rem;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: -0.02em;
      color: ${theme.color.gray5};
    }
  }
`;

const Recommend = styled.div`
  position: relative;
  margin-top: 3rem;
  & > img {
    width: 100%;
    height: 19.9rem;
    border-radius: 1rem;
  }
  .recommend-info {
    position: absolute;
    left: 1.3rem;
    bottom: 1.3rem;
    color: #ffffff;
    .recommend-title {
      font-weight: bold;
      font-size: 22px;
      line-height: 120%;
      text-shadow: 0px 9px 2px rgba(70, 52, 5, 0.5);
      white-space: pre-line;
    }
    .recommend-user {
      margin-top: 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 13px;
      line-height: 150%;
    }
  }
`;

export default MainSlide;
