import { ReactChild } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Call, Pin, PlaceAdd, Time } from "../../assets";
import {
  ReigonDiffModal,
  PlaceToSave,
  RegionId,
  ViewerInfo,
} from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { flexCenter, gap, GrayTag, theme } from "../../styles/theme";
import { regionsGroup } from "../../utils/const";
import { funcNeedLogin } from "../../utils/preset";

// 1: 작성하기
// 2: 그외 지도뷰
// 3: 일반뷰 리스트
export type PlaceCardType = "write" | "map" | "list";

interface PlaceCardProps {
  place: PlaceType;
  className?: string;
  type: PlaceCardType;
  children?: ReactChild[];
  postRegionName?: string;
}

const PlaceCard = ({
  place,
  className,
  type,
  postRegionName,
}: PlaceCardProps) => {
  let time =
    place.businessHoursFrom &&
    place.businessHoursTo &&
    `${place.businessHoursFrom} - ${place.businessHoursTo}`;
  if (place.businessHoursExtra) time += ` ${place.businessHoursExtra}`;

  const regionId = useRecoilValue(RegionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);
  const setIsReigonDiffModalShown = useSetRecoilState(ReigonDiffModal);

  const setPlaceToSave = useSetRecoilState(PlaceToSave);

  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  const clickPlaceAdd = () => {
    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: () => {
          if (
            !regionGroup?.find((region) => region === regionId) &&
            postRegionName
          ) {
            setIsReigonDiffModalShown({
              isModalOpened: true,
              postRegionName,
            });
          } else {
            setPlaceToSave({
              isModalOpened: true,
              placeId: place.placeId,
            });
          }
        },
      },
    });
  };

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
        {type !== "write" && (
          <div className="card-top">
            <div className="name">{place.name}</div>
            <PlaceAdd
              onClick={(e) => {
                e.stopPropagation();
                clickPlaceAdd();
              }}
            />
          </div>
        )}

        <div className="card-bottom">
          <div>
            <PlaceInfo>
              {type === "write" && <div className="name">{place.name}</div>}
              <div className="category">
                {place.category?.length > 0 ? (
                  place.category
                    ?.slice(0, 2)
                    .map((c) => <GrayTag key={c}>{c}</GrayTag>)
                ) : (
                  <GrayTag>동네 장소</GrayTag>
                )}
              </div>
              {type !== "list" && (
                <div className="address">{place.address}</div>
              )}
            </PlaceInfo>

            {type === "list" && (
              <div className="list-info">
                {place.phone && (
                  <div className="sub-info">
                    <Call />
                    <div>{place.phone}</div>
                  </div>
                )}
                {time && (
                  <div className="sub-info">
                    <Time />
                    <div>{time}</div>
                  </div>
                )}
                <div className="sub-info">
                  <Pin />
                  <div>{place.address}</div>
                </div>
              </div>
            )}

            {type !== "write" && place.savedNum > 0 && (
              <div className="recommend">
                {place.savedNum}개 테마에 저장된 장소예요.
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
    position: relative;
    align-items: center;
    padding: ${({ type }) => (type === "map" ? "1.5rem 1.3rem" : "1.5rem")};
    width: 100%;
    box-sizing: border-box;
    .category {
      margin-top: ${({ type }) => (type === "write" ? "1.4rem" : 0)};
      display: flex;
      ${gap("0.4rem")}
    }
    .card-top {
      ${flexCenter};
      width: 100%;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .card-bottom {
      ${flexCenter};
      justify-content: space-between;
    }
    .name {
      font-size: 1.6rem;
      line-height: 2.3rem;
      font-weight: bold;
    }
    .address {
      margin-top: 0.9rem;
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
  .list-info {
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    & > div {
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      color: ${theme.color.gray6};
      letter-spacing: -2%;
      svg {
        min-width: 1.3rem;
        max-width: 1.3rem;
        margin-bottom: 0.25rem;
      }
      & > div {
        line-height: 145%;
        margin-left: 1.1rem;
      }
      &:last-child {
        align-items: flex-start;
      }
    }
  }

  .recommend {
    font-size: 1.3rem;
    color: ${theme.color.orange};
    letter-spacing: -2%;
    margin-top: 1rem;
    line-height: 145%;
    font-weight: ${({ type }) => (type === "list" ? 500 : 400)};
  }
`;

const PlaceInfo = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export default PlaceCard;
