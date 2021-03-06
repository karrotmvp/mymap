import dayjs from "dayjs";
import styled from "styled-components";
import {
  Certification,
  FakeCafe,
  FakeChild,
  FakeDog,
  FakeMeat,
  FakePerson,
  FakeWrite,
  Thumbnail,
} from "../../assets";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import { PostType } from "../../Shared/type";
import { flexCenter, theme } from "../../styles/theme";

const Fake = ({ post }: { post: PostType }) => {
  let title = "";
  let info = <div />;
  let svg = <div />;
  let imgUrl = "";
  let content = <div className="content">{post.contents}</div>;

  switch (post.postId) {
    // 잠실
    case 555:
      title = `‘삼겹살은 언제나 옳다🐽’️ 
      오늘 저녁은 삼겹살 어때요?`;
      info = (
        <div>
          고기에 진심인 <span>육식주의자</span>예요.
        </div>
      );
      svg = <FakeMeat />;
      imgUrl = "/fake-meat-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 잠실동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            삼겹살 싫어하는 분 계신가요?? 에이 설마.. 삼겹살은 언제나
            옳다구요..!
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            오늘은 잠실에서 먹어본 돼지고기들 중 Top4를 뽑아서 소개시켜드리려
            해요ㅎㅎ 돼지고기 구워서 된장찌개랑 한 입하면 그야말로 천국,,
            동료들과의 회식으로도, 가족들과의 외식으로도 백점짜리 메뉴인 삼겹살!
            오늘은 삼겹살에 소주 한 잔 어때요ㅎㅎ
          </div>
        </div>
      );
      break;

    case 568:
      title = `‘혼자서도 당당하게 고기먹자🍖’️ 
      혼밥하기 좋은 식당
      여러분께 소개할게요!`;
      info = (
        <div>
          고기에 진심인 <span>육식주의자</span>예요.
        </div>
      );
      svg = <FakeMeat />;
      imgUrl = "/fake-meat-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 잠실동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            고기는 먹고 싶은데 일반 고깃집은 혼자가기 부담스럽죠😢
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            그래서 제가 혼자 갔을 때도 맘편히 배부르고 맛있게 먹을 수 있었던 두
            군데를 추천드리려 해요! 바로 <span>신씨화로익스프레스</span>와{" "}
            <span>프리미엄돼지고기 백석</span>이랍니다ㅎㅎ
          </div>
          <div style={{ marginTop: "2rem" }}>
            <span>신씨화로익스프레스:</span> 1인 화로구이를 즐길 수 있는
            식당이에요! 1인 좌석이 쭉 늘어져있는 구조라 혼자 고기 즐기기에
            딱이랍니다ㅎㅎ
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>프리미엄돼지고기 백석:</span> 여기는 점심특선이 진짜
            찐이에요..! 삼겹살과 목살을 즐길 수 있는 생고기 정식, 훈제 막창을
            즐길 수 있는 막창덮밥, 가브리살과 항정살도 즐길 수 있는 김치찜..!
            여기도 1인 좌석이 마련되어있어 편하게 혼자서 먹을 수 있답니다ㅎㅎ
          </div>
        </div>
      );
      break;

    case 560:
      title = `‘우리 집 막내 초롱이와 
      같이 갈 수 있는 식당’️ 
      여러분께 소개할게요!`;
      info = (
        <div>
          반려동물과 항상 같이 다니는 <span>멍집사</span>예요.
        </div>
      );
      svg = <FakeDog />;
      imgUrl = "/fake-dog-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 잠실동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            외식할 때 댕댕이를 두고 나가는 건 항상 슬픈 일이죠.. 저도 우리
            초롱이가 계속 신경 쓰이더라고요🥺 그래서 반려동물과 함께 갈 수 있는
            음식점들을 찾아보았어요.
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            저는 우리 초롱이랑 외출할 때는 빨리 먹고 나가야 하는 식당보다는 오래
            여유를 즐길 수 있는 카페를 찾게되더라구요ㅎㅎ 그래서 샌드위치나
            브런치를 파는 카페 위주로 모아봤어요~
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            든든한 브런치와 따뜻한 아메리카노를 우리 댕댕이랑 즐길 수 있다..?
            그곳은 낙원 아닐까요,,🥰
          </div>
        </div>
      );
      break;

    case 559:
      title = `분위기 좋고
      커피와 디저트가 맛있는
      '${post.title}'를 모았어요!`;
      info = (
        <div>
          동네 카페만 찾아다니는 <span>카페 마스터</span>예요.
        </div>
      );
      svg = <FakeCafe />;
      imgUrl = "/fake-cafe-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 잠실동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            오늘은 잠실동 곳곳에서 찾은 분위기와 맛을 모두 갖춘 카페들을
            소개드리려 해요!
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            저는 책을 읽거나 업무를 할 때도 카페를 찾지만, 끼니와 디저트를 한
            번에 해결하고자 카페를 찾기도 하는데요! 분위기도 좋고 커피랑
            디저트도 맛있는 카페를 발견하면 그렇게 기분이 좋을 수가 없더라고요
            🥰
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            친구들과 분위기를 즐기고 싶을 때, 달달하고 맛있는 걸 먹고 싶을 때,
            혼자만의 여유를 즐기고 싶을 때, 언제든 방문하셔도 후회 없으실
            거예요. 친구들이 '잠실동에서 갈만한 카페 있어?'라고 물어볼 때 자신
            있게 추천할 수 있는 장소들입니당!!
          </div>
          <div className="date">
            {dayjs(post.createdAt).format("YYYY년 MM월 DD일")}
          </div>
        </div>
      );
      break;

    // 서초
    case 570:
      title = `‘우리 집 막내 초롱이와 
      같이 갈 수 있는 카페’️ 
      여러분께 소개할게요!`;
      info = (
        <div>
          반려동물과 항상 같이 다니는 <span>멍집사</span>예요.
        </div>
      );
      svg = <FakeDog />;
      imgUrl = "/fake-dog-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 서초동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            외출할 때 댕댕이를 두고 나가는 건 항상 슬픈 일이죠.. 저도 우리
            초롱이가 계속 신경 쓰이더라고요🥺 그래서 반려동물과 함께 갈 수 있는
            카페들을 찾아보았어요.
          </div>
          <div style={{ marginTop: "2rem" }}>
            <span>카페토다:</span> 여기 크림치즈 맛집이에요!! 베이글 샌드위치,
            수프, 샌드위치 등 간단한 식사 메뉴도 많아서 좋은 것 같아요ㅎㅎ 물론
            커피도 맛있답니다ㅋㅋ 맛있는 음식과 함께 댕댕이랑 즐거운 시간
            보내봐요~
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>{`밤부베이커리&브루잉:`}</span> 완전 넓고 큼지막한 카페예요!!
            뷰 최고!! 빵도 완전 맛있어요ㅎㅎ 카페가 워낙 넓어서 대형견도 가능할
            것 같아요~
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>아워 헤르츠:</span> 여기는 강아지 굿즈들도 다양하게
            판매하더라구요!! 사장님이 강쥐를 완전 좋아하시는 듯한..ㅎㅎ 대형견도
            가능하대요! 귀여운 굿즈도 구경하고 맛있는 커피와 디저트도 즐길 수
            있는 좋은 카페랍니당
          </div>
        </div>
      );
      break;

    case 571:
      title = `우리 아이들이 놀 수 있는
      '${post.title}'예요.`;
      info = (
        <div>
          방구석 탈출을 꿈꾸는 <span>4세 아이 엄마</span> 예요.
        </div>
      );
      svg = <FakeChild />;
      imgUrl = "/fake-child-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 서초동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            서초동 이웃들을 보면 아이 엄마분들이 많은 것 같아요! 저도
            워킹맘이랍니다ㅎㅎ 맞벌이다보니 아직 아이가 어린데도 잘 못놀아주게
            되어 넘넘 미안하더라고요😢
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            요즘 촉감놀이, 역할놀이 이런게 아이 정서 발달에 중요하다고들
            하잖아요~ 그래서 저도 아이가 다양한 경험을 할 수 있도록 신경쓰려
            노력하는 편인데요~! 그래서 날잡고 아이들 기분 전환 시켜줄 수 있는
            장소들을 소개드리려 해요!
          </div>
          <div style={{ marginTop: "2rem" }}>
            <span>점핑파크, 헬로방방:</span> 실내 방방 놀이터예요^^ 요즘
            코로나라 집에만 있는 우리 아이들, 뛰어 놀아야 몸도 튼튼해질 텐데
            말이죠~😢 실내 방방에서 마음껏 뛰어 노는 것도 좋은 방법인 것
            같아요^^
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>색놀이터:</span> 다양한 색깔 놀이, 촉감 놀이를 할 수 있는
            공간이에요. 샤워시설도 마련되어 있더라구요. 수업 스케줄이 정해져
            있어 미리 예약하시면 좋을 것 같아요ㅎㅎ 아이들이 노는 동안 엄마들은
            카페에서 시간을 보낼 수도 있어요^^
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>원더볼즈 플레이파크, 키다모, 릴리펏:</span> 프리미엄
            키즈카페예요~ 다양한 체험 공간과 미용실이나 상점 놀이, 부엌 놀이같은
            다양한 놀이공간이 마련되어 있어요. 편백나무 놀이터, 슬라임 놀이공간,
            정글짐.. 아이가 너무 좋아라 하더라고요~ 아이들을 위한 맞춤 식사도
            제공해줘서 좋더라고요^^
          </div>
          <div className="date">
            {dayjs(post.createdAt).format("YYYY년 MM월 DD일")}
          </div>
        </div>
      );
      break;

    case 573:
      title = `믿음직스러운 정육점을 찾고 있나요?
      ‘질좋은 정육점🥩’️
      여러분께 소개할게요!`;
      info = (
        <div>
          고기에 진심인 <span>육식주의자</span>예요.
        </div>
      );
      svg = <FakeMeat />;
      imgUrl = "/fake-meat-img.svg";
      content = (
        <div className="content">
          <div>안녕하세요 서초동 이웃 여러분!</div>
          <div style={{ marginTop: "0.5rem" }}>
            마트 고기는 질이 안 좋은 경우가 허다하죠ㅠㅠ 비싼데 질은 안 좋아
            보이니 꺼려지더라고요.. 그래서 제가 개인적으로 가보고 괜찮았던
            정육점 두 군데를 추천드리려 해요ㅎㅎ
          </div>
        </div>
      );
      break;

    //한남
    case 576:
      title = `‘우리 집 막내 초롱이와 
      같이 갈 수 있는 식당’️ 
      여러분께 소개할게요!`;
      info = (
        <div>
          반려동물과 항상 같이 다니는 <span>멍집사</span>예요.
        </div>
      );
      svg = <FakeDog />;
      imgUrl = "/fake-dog-img.svg";
      content = (
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
            <span>노스트레스버거:</span> 미국식 치즈버거 맛집!! 대형견도
            가능하긴 하지만 공간이 조금 협소하고 웨이팅도 있는 편이에요.
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>더테이블키친:</span> 자리가 좁은 편이라 소형견만 가능해요.
            여기 뇨끼 정말 맛있어요~!
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>돈킹콩파치비:</span> 파스타와 치킨에 맥주를 곁들일 수 있는
            집이에요! 매장이 넓고 대형견도 가능해요!!
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>진저키친:</span> 여기도 자리가 좁은 편이라 소형견만 가능해요.
            분위기도 좋고 사진 찍기 좋아요ㅎㅎ
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span>도노:</span> 피자 맛집👍 여기도 야외 테라스가 있어 대형견도
            가능해요.
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
      );
      break;
    default:
      break;
  }

  return (
    <Wrapper>
      <div className="fake-title">
        <img src={imgUrl} alt="background" />
        <div className="title">{title}</div>
      </div>

      <ProfileBox>
        <div className="profile">
          <div>
            <div className="name">
              {post.regionName} 큐레이터 <span>{post.user.userName}</span>님은
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
              {post.regionName}에 <span>25번</span> 인증한 이웃이에요.
            </div>
          </div>
          <div>
            {svg}
            {info}
          </div>
          <div>
            <FakeWrite />
            <div>
              <span>18개</span> 테마를 소개했어요.
            </div>
          </div>
        </div>
      </ProfileBox>

      {content}

      <div className="cards">
        <div className="title">추천하는 가게들</div>
        {post.pins.map((pin, i) => (
          <PlaceCard
            key={pin.pinId}
            place={pin.place}
            type="list"
            postRegionId={post.regionId}
            postRegionName={post.regionName}
          />
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

export default Fake;
