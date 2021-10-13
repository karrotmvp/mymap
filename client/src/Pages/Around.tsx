import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PlaceBox from "../Components/PlaceBox";
import { gap, WrapperWithHeaderFooter } from "../styles/theme";
import { dummyPlaces } from "./SearchPlace";

const Around = () => {
  return (
    <Wrapper>
      <Header title="둘러보기" />
      <Title>{`동네 장소들을 구경해보세요!`}</Title>
      <div className="subtitle">새로운 장소를 발견할지도 몰라요</div>
      <div className="places">
        {dummyPlaces.map((place) => (
          <PlaceBox key={place.placeId} {...{ place }} />
        ))}
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeaderFooter};
  .subtitle {
    margin-left: 2rem;
    margin-top: 0.6rem;
    font-size: 1.6rem;
    line-height: 115%;
    color: gray;
  }
  .places {
    padding: 2rem;
    margin-top: 1.2rem;
    ${gap("2rem", "column")};
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

export default Around;
