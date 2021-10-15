import styled from "styled-components";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard";
import { gap, theme, Title, WrapperWithHeader } from "../../styles/theme";
import { dummyPlaces } from "../../utils/dummy";

const Detail = () => {
  return (
    <Wrapper>
      <Header />
      <Title>당근마켓 인턴이 먹을 점심 장소 목록 작성 예시랄라랄라</Title>
      <div className="content">
        점심에 뭘 먹을지 고민하는 나를 위한 주변 장소 모음! 점심시간이 제일
        행복해요~
      </div>

      <Profile>
        <div className="photo" />
        <div>
          <div className="name">레일라님이 추천하는 리스트예요.</div>
          <div className="date">2021년 06월 14일 · 논현동</div>
        </div>
      </Profile>

      <div className="cards">
        {dummyPlaces.map((place) => (
          <PlaceCard key={place.placeId} {...{ place }} />
        ))}
        {dummyPlaces.map((place) => (
          <PlaceCard key={place.placeId} {...{ place }} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding: 0 2rem;
  padding-top: 5.4rem;
  .content {
    margin-top: 1.4rem;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${theme.color.gray7};
    padding-right: 3rem;
  }
  .cards {
    margin-top: 1.4rem;
    margin-bottom: 3.5rem;
    ${gap("1.4rem", "column")}
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  padding: 1.5rem;
  box-sizing: border-box;
  background: rgba(255, 121, 100, 0.1);
  border-radius: 1rem;

  & > div:last-child {
    margin-left: 1.2rem;
  }
  .photo {
    width: 4rem;
    height: 4rem;
    background-color: lightgray;
    border-radius: 50%;
  }
  .name {
    font-size: 1.4rem;
    color: ${theme.color.gray7};
    font-weight: bold;
    line-height: 150%;
  }
  .date {
    margin-top: 0.3rem;
    font-size: 1.1rem;
    color: ${theme.color.gray6};
  }
`;

export default Detail;
