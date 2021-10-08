import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Detail = () => {
  return (
    <div>
      <Header title="혼밥하기 좋은 우리 동네 식당" />
      <Title>{`우리 동네 주민들의
추천 장소를 구경해보세요`}</Title>
      <div></div>
      <Footer />
    </div>
  );
};

const Title = styled.div`
  font-weight: bold;
  font-size: 2.2rem;
  line-height: 115%;
  white-space: pre-wrap;
  margin-left: 2rem;
  margin-top: 2.9rem;
`;

export default Detail;
