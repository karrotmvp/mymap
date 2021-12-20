import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { useGetPlaceDetail } from "../../api/place";
import { Call, MapBack, Pin, PlaceAdd, Time } from "../../assets";
import Collection from "../../Components/Collection";
import MapView from "../../Components/MapView";
import {
  PlaceToSave,
  RegionId,
  ReigonDiffModal,
  ViewerInfo,
} from "../../Shared/atom";
import { flexCenter, gap, GrayTag, theme } from "../../styles/theme";
import { regionsGroup } from "../../utils/const";
import { funcNeedLogin } from "../../utils/preset";

const PlaceDetail = ({
  placeId,
  close,
  postRegionId,
  postRegionName,
}: {
  placeId: string;
  close: () => void;
  postRegionId?: string;
  postRegionName?: string;
}) => {
  const { data } = useGetPlaceDetail(placeId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);
  const regionId = useRecoilValue(RegionId);

  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  const setIsReigonDiffModalShown = useSetRecoilState(ReigonDiffModal);
  const setPlaceToSave = useSetRecoilState(PlaceToSave);

  const clickPlaceAdd = () => {
    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: () => {
          if (
            !regionGroup?.find((id) => id === postRegionId) &&
            postRegionName
          ) {
            setIsReigonDiffModalShown({
              isModalOpened: true,
              postRegionName,
            });
          } else {
            setPlaceToSave({
              isModalOpened: true,
              placeId: data!.placeId,
            });
          }
        },
      },
    });
  };

  const time = useRef("");
  useEffect(() => {
    if (data) {
      time.current =
        data.businessHoursFrom && data.businessHoursTo
          ? `${data.businessHoursFrom} - ${data.businessHoursTo}`
          : "";
      if (data.businessHoursExtra)
        time.current += ` ${data.businessHoursExtra}`;
    }
  }, [data]);

  return (
    <Wrapper>
      <div className="map-back" onClick={close}>
        <MapBack />
      </div>
      {data && (
        <div className="place-detail-map">
          <MapView
            mapId="place-detail"
            height="30rem"
            pins={[
              {
                id: data.placeId,
                placeId: data.placeId,
                name: data.name,
                latitude: data.coordinates.latitude,
                longitude: data.coordinates.longitude,
              },
            ]}
            center={{
              lat: data.coordinates.latitude,
              lng: data.coordinates.longitude,
            }}
          />
        </div>
      )}
      <Slide>
        <div>
          <div className="rectangle">
            <div />
          </div>

          <div className="place-info">
            <div className="name">
              <div>{data?.name}</div>
              <PlaceAdd
                onClick={(e) => {
                  e.stopPropagation();
                  clickPlaceAdd();
                }}
              />
            </div>
            <div className="category">
              {data?.category && data?.category.length > 0 ? (
                data?.category.map((c) => <GrayTag key={c}>{c}</GrayTag>)
              ) : (
                <GrayTag>동네 장소</GrayTag>
              )}
            </div>
            <div className="list-info">
              {data?.phone && (
                <div>
                  <Call />
                  <div>{data?.phone}</div>
                </div>
              )}
              {time && (
                <div>
                  <Time className="time" />
                  <div>{time.current}</div>
                </div>
              )}
              <Pin />
              <div>{data?.address}</div>
            </div>
          </div>

          <div className="posts">
            <div className="title">
              <span>{data?.name}</span> 가게가 저장된
              <div>
                <span>{data?.posts.posts.length}개</span> 테마예요
              </div>
            </div>
          </div>
          <div className="collections">
            {data?.posts.posts.map((post) => (
              <Collection key={post.postId} {...{ post }} />
            ))}
          </div>
        </div>
      </Slide>
    </Wrapper>
  );
};

const slideFromLeft = keyframes`
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0;
  }
`;

const Wrapper = styled.div`
  animation: ${slideFromLeft} 0.25s linear;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 700;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow-y: scroll;
  .map-back {
    ${flexCenter};
    position: fixed;
    top: 0.8rem;
    left: 0.8rem;
    z-index: 800;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    background-color: #fff;
    border: 0.1rem solid ${theme.color.gray3};
  }
  .place-detail-map {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
`;

const Slide = styled.div`
  width: 100%;
  min-height: 10vh;
  margin-top: 26.7rem;
  overflow-y: scroll;
  & > div {
    width: 100%;
    min-height: 10vh;
    background-color: ${theme.color.white};
    box-sizing: border-box;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
    .rectangle {
      ${flexCenter};
      & > div {
        background-color: ${theme.color.gray2};
        border-radius: 2rem;
        width: 4rem;
        height: 0.3rem;
        margin-top: 1.4rem;
        margin-bottom: 2.5rem;
      }
    }
    .place-info {
      padding: 0 2rem;
      padding-bottom: 4rem;
      border-bottom: 1.6rem solid ${theme.color.gray1_5};
      .name {
        font-weight: bold;
        font-size: 1.9rem;
        line-height: 2.8rem;
        display: flex;
        justify-content: space-between;
        & > svg {
          min-width: 4.8rem;
          margin-right: -1rem;
        }
      }
      .category {
        margin-top: 1.4rem;
        display: flex;
        ${gap("0.4rem")}
      }
      .address {
        margin-top: 0.9rem;
        color: gray;
        font-size: 1.3rem;
        color: ${theme.color.gray6};
        letter-spacing: -2%;
        line-height: 150%;
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
          &:not(:first-child) {
            align-items: flex-start;
          }
          .time {
            margin-top: 0.1rem;
          }
        }
      }
    }
    .posts {
      padding: 0 2rem;
      .title {
        margin-top: 4rem;
        font-weight: 500;
        font-size: 1.7rem;
        line-height: 145%;
        span {
          font-weight: bold;
        }
        & > div {
          &:last-child {
            margin-top: 0.4rem;
            span {
              color: ${theme.color.orange};
            }
          }
        }
      }
    }
    .collections {
      margin-top: 0.8rem;
      & > div:not(:first-child) {
        border-top: 0.1rem solid ${theme.color.gray1_7};
      }
    }
  }
`;

export default PlaceDetail;
