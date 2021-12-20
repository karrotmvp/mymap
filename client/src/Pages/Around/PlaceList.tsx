import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useGetRegion } from "../../api/region";
import { SaveSmall } from "../../assets";
import { PlaceToSave, RegionId, ViewerInfo } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import { theme, Title } from "../../styles/theme";
import { funcNeedLogin } from "../../utils/preset";

const PlaceList = ({ places }: { places: PlaceType[] }) => {
  const regionId = useRecoilValue(RegionId);
  const { data: regionName } = useGetRegion(regionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);
  const setPlaceToSave = useSetRecoilState(PlaceToSave);

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
            key={place.placeId}
            hasImg={place.images[0]?.thumbnail ? true : false}
          >
            <div>
              <div className="title">{place.name}</div>
              <div className="category">
                {place.category.slice(0, place.category.length - 1).map((c) => (
                  <div>{c}</div>
                ))}
                <div>·</div>
                {place.category[place.category.length - 1]}
              </div>
              <div className="save">
                <SaveSmall
                  onClick={(e) => {
                    e.stopPropagation();
                    clickPlaceAdd(place.placeId);
                  }}
                />
                저장한 이웃 <span>1</span>
              </div>
            </div>
            {place.images[0]?.thumbnail && (
              <img
                className="photo"
                alt="thumbnail"
                src={place.images[0].thumbnail}
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
  padding: 2rem 0;
  display: flex;
  gap: 1.2rem;
  overflow: hidden;
  flex: 1;
  & > div {
    width: ${({ hasImg }) => (hasImg ? "calc(100% - 17.2rem)" : "100%")};
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .category {
      margin-top: 2rem;
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
      display: flex;
      align-items: center;
      gap: 0.894rem;
      span {
        font-weight: 700;
      }
    }
  }

  .photo {
    min-width: 16rem;
    height: 9.5rem;
    border-radius: 0.8rem;
  }
`;

export default PlaceList;
