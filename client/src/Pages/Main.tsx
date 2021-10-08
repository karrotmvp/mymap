import styled from "styled-components";
import Collection from "../Components/Collection";
import CreateButton from "../Components/CreateButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { WrapperWithHeaderFooter } from "../styles/theme";

const Main = () => {
  return (
    <Wrapper>
      <Header title="서비스명" />
      <Title>{`우리 동네 주민들의
추천 장소를 구경해보세요`}</Title>

      <div className="collections">
        {[0, 0, 0, 0].map((_, i) => (
          <Collection key={i} />
        ))}
      </div>

      <CreateButton />

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeaderFooter};
  .collections {
    margin-left: 2rem;
    padding-bottom: 2rem;
    & > div {
      margin-top: 2.9rem;
    }
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.2rem;
  line-height: 115%;
  white-space: pre-wrap;
  margin-left: 2rem;
  margin-top: 2.9rem;
`;

export default Main;
