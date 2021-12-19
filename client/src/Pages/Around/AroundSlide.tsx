import styled from "styled-components";
import { flexCenter, theme, Title } from "../../styles/theme";
import CreateButton from "../../Components/CreateButton";
import { PlaceType } from "../../Shared/type";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useGetRegion } from "../../api/region";
import { RegionId } from "../../Shared/atom";

const AroundSlide = ({
  isScrollUp,
  places,
  setIsMapShown,
}: {
  isScrollUp: boolean;
  places: PlaceType[];
  setIsMapShown: Dispatch<SetStateAction<boolean>>;
}) => {
  const regionId = useRecoilValue(RegionId);
  const { data: regionName } = useGetRegion(regionId);

  return (
    <>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          setIsMapShown(false);
        }}
      >
        {!isScrollUp && (
          <div className="rectangle">
            <div />
          </div>
        )}

        <div className="content">
          <Title className="around-title">
            {regionName}엔 이런 가게가 있어요
          </Title>
          <div className="sub">이웃들이 자주 찾는 가게를 둘러보세요</div>

          <div className="places">
            {places.map((place) => (
              <Place hasImg={place.images[0]?.thumbnail ? true : false}>
                <div>
                  <div className="title">{place.name}</div>
                  <div className="category">
                    {place.category
                      .slice(0, place.category.length - 1)
                      .map((c) => (
                        <div>{c}</div>
                      ))}
                    <div>·</div>
                    {place.category[place.category.length - 1]}
                  </div>
                  <div className="save">
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
        </div>
      </Card>
      <CreateButton targetId="around-scroll" />
    </>
  );
};

const Card = styled.div`
  position: relative;
  min-height: 10vh;
  background-color: ${theme.color.white};
  padding-top: 4.1rem;
  box-sizing: border-box;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
  .places {
    margin-top: 2rem;
    & > div:not(:first-child) {
      border-top: 0.1rem solid ${theme.color.gray1_7};
    }
  }
  .content {
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
  }
  .rectangle {
    ${flexCenter};
    & > div {
      background-color: ${theme.color.gray2};
      border-radius: 2rem;
      width: 4rem;
      height: 0.3rem;
      position: absolute;
      top: 1.4rem;
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
      line-height: 145%;
      letter-spacing: -0.02em;
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

export default AroundSlide;
