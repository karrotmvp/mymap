import styled from "styled-components";
import {
  flexCenter,
  theme,
  Title,
  WrapperWithFooter,
} from "../../styles/theme";
import Collection from "../../Components/Collection";
import CreateButton from "../../Components/CreateButton";

const MainSlide = ({
  isMapShown,
  isScrollUp,
}: {
  isMapShown: boolean;
  isScrollUp: boolean;
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
          <Title style={{ color: theme.color.orange }}>{`우리 동네 주민들의
추천 장소를 구경해보세요`}</Title>

          <div className="collections">
            {[0, 0, 0, 0, 0, 0, 0].map((_, i) => (
              <Collection key={i} />
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
    $isMapShown ? "calc(100vh - 12.5rem)" : "calc(100vh - 30.8rem)"};
  .collections {
    padding-bottom: 8.6rem;
    & > div {
      margin-top: 2.9rem;
    }
  }
`;

const Card = styled.div`
  background-color: ${theme.color.white};
  padding-top: 1.1rem;
  padding-left: 2rem;
  box-sizing: border-box;
  border-radius: 2rem;
  box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
  .content {
    top: 0;
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
