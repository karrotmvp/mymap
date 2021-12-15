import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Certification,
  FakeCafe,
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

const Detail559 = ({
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
        <img src="/fake-cafe-img.svg" alt="background" />
        <div className="title">{`분위기 좋고
        커피와 디저트가 맛있는
        '${post.title}'를 모았어요!`}</div>
      </div>

      <ProfileBox>
        <div className="profile">
          <div>
            <div className="name">
              잠실동 큐레이터 <span>단민</span>님은
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
              잠실동에 <span>25번</span> 인증한 이웃이에요.
            </div>
          </div>
          <div>
            <FakeCafe />
            <div>
              동네 카페만 찾아다니는 <span>카페 마스터</span>예요.
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
        <div>안녕하세요 잠실동 이웃 여러분!</div>
        <div style={{ marginTop: "0.5rem" }}>
          오늘은 잠실동 곳곳에서 찾은 분위기와 맛을 모두 갖춘 카페들을
          소개드리려 해요!
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          저는 책을 읽거나 업무를 할 때도 카페를 찾지만, 끼니와 디저트를 한 번에
          해결하고자 카페를 찾기도 하는데요! 분위기도 좋고 커피랑 디저트도
          맛있는 카페를 발견하면 그렇게 기분이 좋을 수가 없더라고요 🥰
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          친구들과 분위기를 즐기고 싶을 때, 달달하고 맛있는 걸 먹고 싶을 때,
          혼자만의 여유를 즐기고 싶을 때, 언제든 방문하셔도 후회 없으실 거예요.
          친구들이 '잠실동에서 갈만한 카페 있어?'라고 물어볼 때 자신 있게 추천할
          수 있는 장소들입니당!!
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
    .date {
      margin-top: 1.8rem;
      font-size: 1.2rem;
      color: ${theme.color.gray6};
      line-height: 150%;
    }
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
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

export default Detail559;
