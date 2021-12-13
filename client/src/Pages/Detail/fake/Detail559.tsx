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
        <div>
          안녕하세요! 한남동 이웃 여러분 ☺️ 오늘은 한남동에서 일할 때 자주
          찾았던 카페들을 소개하고 싶어요! 예전에 한남동에서 근무할 때, 집중이
          안 되면 종종 찾던 카페들이 있는데요! 퇴사 후에도 잊지 못하고 가끔
          색다른 공간에서의 집중이 필요하면 찾곤 한답니다. 꼭 일하러 오지
          않더라도 조용해서 독서를 즐기거나📖, 나만의 시간이 필요할 때
          방문하셔도 후회 없으실 거예요. 친구들이 ‘한남동에서 어디 카페가
          좋아?’라고 물어볼 때 자신 있게 추천할 수 있는 5군데만 모았습니다!!
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
