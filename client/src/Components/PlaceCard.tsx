import styled from "styled-components";
import { Call, PlaceAdd, Time } from "../assets";
import { PlaceType } from "../Shared/type";
import { flexCenter, gap, GrayTag, theme } from "../styles/theme";

// 1: 작성하기
// 2: 그외 지도뷰
// 3: 일반뷰 리스트
export type PlaceCardType = "write" | "map" | "list";

const PlaceCard = ({
  place,
  className,
  type,
}: {
  place: PlaceType;
  className?: string;
  type: PlaceCardType;
}) => {
  let time =
    place.businessHoursFrom &&
    place.businessHoursTo &&
    `${place.businessHoursFrom} - ${place.businessHoursTo}`;
  if (place.businessHoursExtra) time += ` ${place.businessHoursExtra}`;

  return (
    <Wrapper {...{ className, type }}>
      {place.images.length > 0 && type === "list" && (
        <img
          className="list-photo"
          alt="thumbnail"
          src={place.images[0].thumbnail}
        />
      )}
      <div className="wrapper">
        <div className="card-top">
          <div className="category">
            {place.category?.length > 0 ? (
              place.category
                ?.slice(0, 2)
                .map((c) => <GrayTag key={c}>{c}</GrayTag>)
            ) : (
              <GrayTag>동네 장소</GrayTag>
            )}
          </div>
          {type !== "write" && <PlaceAdd />}
        </div>

        <div className="card-bottom">
          <div>
            <PlaceInfo>
              <div className="name">{place.name}</div>
              <div className="address">{place.address}</div>
            </PlaceInfo>

            {type === "list" && (
              <>
                {place.phone && (
                  <div className="sub-info phone">
                    <Call />
                    <div>{place.phone}</div>
                  </div>
                )}
                {time && (
                  <div className="sub-info time">
                    <Time />
                    <div>{time}</div>
                  </div>
                )}
              </>
            )}

            {type !== "write" && place.saved > 0 && (
              <div className="recommend">
                {place.saved}개 테마에 저장된 장소예요.
              </div>
            )}
          </div>

          {place.images.length > 0 && type !== "list" && (
            <img
              className="photo"
              alt="thumbnail"
              src={place.images[0].thumbnail}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ type: PlaceCardType }>`
  background-color: ${theme.color.white};
  box-shadow: ${({ type }) =>
    type !== "list" && "0px 0px 16px rgba(0, 0, 0, 0.15)"};
  border-radius: 1.2rem;
  border: ${({ type }) =>
    type === "list" && `0.1rem solid ${theme.color.gray1_7}`};
  width: ${({ type }) =>
    type === "map" ? "30.3rem" : type === "write" ? "32rem" : "100%"};

  .list-photo {
    width: 100%;
    height: 19rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .wrapper {
    align-items: center;
    padding: ${({ type }) => (type === "map" ? "1.5rem 1.3rem" : "1.5rem")};
    width: 100%;
    box-sizing: border-box;
    .card-top {
      ${flexCenter};
      width: 100%;
      justify-content: space-between;
      .category {
        display: flex;
        ${gap("0.4rem")}
      }
    }
    .card-bottom {
      margin-top: 1rem;
      ${flexCenter};
      justify-content: space-between;
    }

    .name {
      font-size: 1.6rem;
      line-height: 2.3rem;
      font-weight: bold;
    }
    .address {
      margin-top: 0.5rem;
      color: gray;
      font-size: 1.3rem;
      color: ${theme.color.gray6};
      letter-spacing: -2%;
      line-height: 150%;
    }
  }
  .photo {
    min-width: 10rem;
    height: 10rem;
    border-radius: 0.8rem;
    background-color: lightgray;
    margin-left: 1.2rem;
  }
  .sub-info {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    color: ${theme.color.gray6};
    line-height: 145%;
    letter-spacing: -2%;
    & > div {
      margin-left: 1.1rem;
    }
  }
  .phone {
    margin-top: 0.6rem;
  }
  .time {
    margin-top: 0.4rem;
  }
  .recommend {
    font-size: 1.3rem;
    color: ${theme.color.orange};
    letter-spacing: -2%;
    margin-top: 1rem;
    line-height: 145%;
  }
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default PlaceCard;
