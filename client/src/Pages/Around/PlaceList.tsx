import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useGetRegion } from "../../api/region";
import { PlaceAddOrange, PlaceAddWhite } from "../../assets";
import {
  PlaceDetailId,
  PlaceToSave,
  RegionId,
  ViewerInfo,
} from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { theme, Title } from "../../styles/theme";
import { funcNeedLogin } from "../../utils/preset";

const PlaceList = ({ places }: { places: PlaceType[] }) => {
  const regionId = useRecoilValue(RegionId);
  const { data: regionName } = useGetRegion(regionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);
  const setPlaceToSave = useSetRecoilState(PlaceToSave);
  const setPlaceDetailId = useSetRecoilState(PlaceDetailId);

  const clickPlaceAdd = (placeId: string) => {
    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: () => {
          setPlaceToSave({
            isModalOpened: true,
            placeId: placeId,
          });
        },
      },
    });
  };

  return (
    <Wrapper>
      <Title className="around-title">{regionName}엔 이런 가게가 있어요</Title>
      <div className="sub">이웃들이 자주 찾는 가게를 둘러보세요</div>

      <div className="places">
        {places.map((place) => (
          <Place
            onClick={() => setPlaceDetailId(place.placeId)}
            key={place.placeId}
            hasImg={place.images[0]?.thumbnail ? true : false}
          >
            <div>
              <div>
                <div className="title">{place.name}</div>
                <div className="category">
                  {place.category?.length > 0 ? (
                    <>
                      {place.category?.length > 2 && (
                        <>
                          {place.category
                            .slice(0, place.category.length - 1)
                            .map((c) => (
                              <div>{c}</div>
                            ))}
                          <div>·</div>
                        </>
                      )}
                      {place.category[place.category.length - 1]}
                    </>
                  ) : (
                    "동네 장소"
                  )}
                </div>
              </div>
              {place.savedNum > 0 ? (
                <div className="save">
                  <span>{place.savedNum}</span>명의 이웃이 저장했어요
                </div>
              ) : (
                <div className="no-save">가장 먼저 저장해 보세요!</div>
              )}
            </div>
            {place.images[0]?.thumbnail && (
              <img
                className="photo"
                alt="thumbnail"
                src={place.images[0].thumbnail}
              />
            )}
            {place.images[0]?.thumbnail ? (
              <PlaceAddWhite
                className="save-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  clickPlaceAdd(place.placeId);
                }}
              />
            ) : (
              <PlaceAddOrange
                className="save-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  clickPlaceAdd(place.placeId);
                }}
              />
            )}
          </Place>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  .sub {
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: ${theme.color.gray5};
    margin-top: 0.5rem;
  }

  .places {
    margin-top: 2rem;
    & > div:not(:first-child) {
      border-top: 0.1rem solid ${theme.color.gray1_7};
    }
  }
`;

const Place = styled.div<{ hasImg: boolean }>`
  width: 100%;
  padding: 2.5rem 0;
  display: flex;
  gap: 1.2rem;
  overflow: hidden;
  flex: 1;
  position: relative;
  height: 14rem;
  box-sizing: border-box;
  & > div {
    width: ${({ hasImg }) => (hasImg ? "calc(100% - 13rem)" : "100%")};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .category {
      margin-top: 0.8rem;
      display: flex;
      font-weight: 500;
      font-size: 12px;
      line-height: 120%;
      color: ${theme.color.gray6};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .save {
      margin-top: 1.1rem;
      color: ${theme.color.orange};
      font-size: 13px;
      letter-spacing: -0.02em;
      span {
        font-weight: 700;
      }
    }
    .no-save {
      margin-top: 1.1rem;
      color: ${theme.color.gray6};
      font-size: 13px;
      letter-spacing: -0.02em;
    }
  }

  .photo {
    min-width: 11.4rem;
    height: 9rem;
    border-radius: 0.8rem;
  }

  .save-btn {
    position: absolute;
    top: 1.9rem;
    right: -0.5rem;
  }
`;

export default PlaceList;
