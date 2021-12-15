import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Certification,
  FakeDog,
  FakePerson,
  FakeWrite,
  Thumbnail,
} from "../../../assets";
import PlaceCard from "../../../Components/PlaceCard/PlaceCard";
import { RegionId } from "../../../Shared/atom";
import { PostType } from "../../../Shared/type";
import { flexCenter, theme } from "../../../styles/theme";

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

const Detail576 = ({
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
    <Wrapper>
      <div className="fake-title">
        <img src="/fake-dog-img.svg" alt="background" />
        <div className="title">{`‘우리 집 막내 초롱이와 
        같이 갈 수 있는 식당’️ 
        여러분께 소개할게요!`}</div>
      </div>

      <ProfileBox>
        <div className="profile">
          <div>
            <div className="name">
              한남동 큐레이터 <span>라면</span>님은
            </div>
          </div>
          <div className="thumbnail">
            {post.user.profileImageUrl ? (
              <img
                className="photo"
                alt="profile"
                src={post.user.profileImageUrl}
              />
            ) : (
              <Thumbnail className="photo" />
            )}
            <Certification className="certification" />
          </div>
        </div>

        <div className="info">
          <div>
            <FakePerson />
            <div>
              한남동에 <span>25번</span> 인증한 이웃이에요.
            </div>
          </div>
          <div>
            <FakeDog />
            <div>
              반려동물과 항상 같이 다니는 <span>멍집사</span>예요.
            </div>
          </div>
          <div>
            <FakeWrite />
            <div>
              <span>18개</span> 테마를 소개했어요.
            </div>
          </div>
        </div>
      </ProfileBox>

      <div className="content">
        <div>안녕하세요 한남동 이웃 여러분!</div>
        <div style={{ marginTop: "0.5rem" }}>
          외식할 때 댕댕이를 두고 나가는 건 항상 슬픈 일이죠.. 저도 우리
          초롱이가 계속 신경 쓰이더라고요🥺 그래서 반려동물과 함께 갈 수 있는
          음식점들을 찾아보았어요.
        </div>

        <div style={{ marginTop: "2rem" }}>
          <span>부곡 하와이:</span> 레트로 분위기의 포차. 야외 테라스가 있어
          대형견도 가능해요!
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <span>도노:</span> 피자 맛집👍 여기도 야외 테라스가 있어 대형견도
          가능해요.
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span>더테이블키친:</span> 자리가 좁은 편이라 소형견만 가능해요. 여기
          뇨끼 정말 맛있어요~!
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span>진저키친:</span> 여기도 자리가 좁은 편이라 소형견만 가능해요.
          분위기도 좋고 사진 찍기 좋아요ㅎㅎ
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span>노스트레스버거:</span> 미국식 치즈버거 맛집!! 대형견도 가능하긴
          하지만 공간이 조금 협소하고 웨이팅도 있는 편이에요.
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span>돈킹콩파치지:</span> 파스타와 치킨에 맥주를 곁들일 수 있는
          집이에요! 매장이 넓고 대형견도 가능해요!!
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span>라샌독오스테리아:</span> 강아지 마스코트 답게 중형견, 소형견
          입장이 가능한 곳이에요. 파스타랑 라자냐 먹으면서 분위기 좋게 와인
          한잔까지~!
        </div>
        <div className="date">
          {dayjs(post.createdAt).format("YYYY년 MM월 DD일")}
        </div>
      </div>

      <div className="cards">
        <div className="title">추천하는 장소들</div>
        {post.pins.map((pin, i) => (
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .fake-title {
    height: 24rem;
    background-color: lightgray;
    position: relative;
    background: linear-gradient(
      0deg,
      rgba(40, 36, 31, 0.4) 10.62%,
      rgba(139, 123, 103, 0) 100%
    );
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      white-space: pre-line;
      left: 0;
      right: 0;
      padding: 0 2rem;
      box-sizing: border-box;
      bottom: 2.4rem;
      width: 100%;
      font-size: 2.2rem;
      line-height: 160%;
      letter-spacing: -0.02em;
      color: #fff;
      text-shadow: 0px 2px 9px rgba(70, 52, 5, 0.5);
      font-weight: bold;
    }
  }

  .content {
    padding: 3.2rem 2rem 5rem 2rem;
    font-size: 15px;
    color: ${theme.color.gray7};
    line-height: 170%;
    white-space: pre-line;
    .date {
      margin-top: 1.8rem;
      font-size: 1.2rem;
      color: ${theme.color.gray6};
      line-height: 150%;
    }
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    span {
      color: ${theme.color.orange};
      font-weight: 500;
    }
  }
`;

const ProfileBox = styled.div`
  padding: 3.7rem 2rem 4.3rem 2rem;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 0.1rem solid ${theme.color.gray1_7};

  .profile {
    ${flexCenter};
    justify-content: space-between;
    .thumbnail {
      position: relative;
      .photo {
        width: 4.2rem;
        height: 4.2rem;
        background-color: ${theme.color.gray4};
        border-radius: 50%;
      }
      .certification {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .name {
      color: ${theme.color.black};
      line-height: 150%;
      font-size: 2.1rem;
      line-height: 150%;
      span {
        font-weight: 500;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-top: 2.5rem;
    & > div {
      ${flexCenter};
      justify-content: flex-start;
      & > div {
        margin-left: 1.4rem;
        font-size: 14px;
        line-height: 150%;
        span {
          font-weight: bold;
          color: ${theme.color.orange};
        }
      }
    }
  }
`;

export default Detail576;
