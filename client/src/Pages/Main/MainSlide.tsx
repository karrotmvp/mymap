import styled from "styled-components";
import { flexCenter, theme, Title } from "../../styles/theme";
import Collection from "../../Components/Collection";
import CreateButton from "../../Components/CreateButton";
import { PostType } from "../../Shared/type";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useGetRegion } from "../../api/region";
import { RegionId } from "../../Shared/atom";

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
`;

export default MainSlide;
