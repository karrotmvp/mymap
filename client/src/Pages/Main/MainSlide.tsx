import styled from "styled-components";
import {
  flexCenter,
  theme,
  Title,
  WrapperWithFooter,
} from "../../styles/theme";
import Collection from "../../Components/Collection";
import CreateButton from "../../Components/CreateButton";
import { PostType } from "../../Shared/type";

const MainSlide = ({
  isMapShown,
  isScrollUp,
  posts,
}: {
  isMapShown: boolean;
  isScrollUp: boolean;
  posts: PostType[];
}) => {
  return (
    <Wrapper $isMapShown={isMapShown}>
      <Card>
        {!isScrollUp && (
          <div className="rectangle">
            <div />
          </div>
        )}

        <div className="content">
          <Title className="main-title">{`우리 동네 주민들의
추천 리스트를 구경해보세요`}</Title>

          <div className="collections">
            {posts.map((post) => (
              <Collection key={post.postId} {...post} />
            ))}
          </div>
        </div>
      </Card>
      <CreateButton />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isMapShown: boolean }>`
  ${WrapperWithFooter};
  transition: 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: ${({ $isMapShown }) =>
    $isMapShown ? "calc(100vh - 12.5rem)" : "calc(100vh - 34.9rem)"};
  .collections {
    margin-top: 0.4rem;
    padding-bottom: 8.6rem;
    & > div:not(:first-child) {
      border-top: 0.6rem solid ${theme.color.gray1_5};
    }
  }
`;

const Card = styled.div`
  background-color: ${theme.color.white};
  padding-top: 4.1rem;
  box-sizing: border-box;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
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
