import styled from "styled-components";
import Header from "../Components/Header";
import MapView from "../Components/MapView";
import PlaceCard from "../Components/PlaceCard";
import { Button, gap, WrapperWithHeader } from "../styles/theme";

const Detail = () => {
  return (
    <Wrapper>
      <Header title="혼밥하기 좋은 우리 동네 식당" />
      <MapView />

      <Contents>
        <div className="author">
          <div className="photo" />
          <div>
            <div className="name">미니 논현동</div>
            <div className="date">2021년 06월 14일</div>
          </div>
        </div>

        <div className="cards">
          {new Array(10).fill(0).map((_, i) => (
            <PlaceCard key={i} />
          ))}
        </div>
      </Contents>

      <SaveBtn>컬렉션 저장하기</SaveBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
`;

const Contents = styled.div`
  padding: 2.4rem 1.9rem;
  box-sizing: border-box;
  margin-bottom: 9rem;
  .author {
    width: 100%;
    display: flex;
    align-items: center;
    .photo {
      width: 3.2rem;
      height: 3.2rem;
      background-color: lightgray;
      border-radius: 50%;
    }
    & > div:last-child {
      font-size: 1.2rem;
      margin-left: 1.2rem;
    }
    .date {
      margin-top: 0.4rem;
      color: lightgray;
    }
  }

  .cards {
    margin-top: 1.6rem;
    ${gap("1.6rem", "column")}
  }
`;

const SaveBtn = styled(Button)`
  position: fixed;
  left: 0;
  right: 0;
  width: auto;
  margin: 0 2rem;
  bottom: 3.5rem;
`;

export default Detail;
