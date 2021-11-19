import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useGetAroundPlaces } from "../../api/place";
import { useGetRegion } from "../../api/region";
import { mini } from "../../App";
import { Close, LogoTypo, Unselect, Select as SelectIcon } from "../../assets";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import { OnboardingSelected, RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import {
  Button,
  flexCenter,
  gap,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";

const Select = () => {
  const history = useHistory();

  const regionId = useRecoilValue(RegionId);
  const { data: regionName } = useGetRegion(regionId);
  const { data: recommend } = useGetAroundPlaces(regionId);

  const [selected, setSelected] = useRecoilState(OnboardingSelected);
  const isSelected = (placeId: string) => {
    return selected.find((i) => i.placeId === placeId) ?? false;
  };
  const handleSelect = (place: PlaceType) => {
    if (isSelected(place.placeId)) {
      const idx = selected.findIndex((i) => i.placeId === place.placeId);
      setSelected([
        ...selected.slice(0, idx),
        ...selected.slice(idx + 1, selected.length),
      ]);
    } else {
      setSelected([...selected, place]);
    }
  };

  return (
    <Wrapper isSubmitable={selected.length > 0}>
      <Header>
        <Close className="left-icon" onClick={() => mini.close()} />
        <LogoTypo />
      </Header>

      <Title style={{ color: theme.color.orange }}>{`${regionName} 주민님,
관심 있는 동네 장소가 있나요?`}</Title>
      <div className="sub">내가 좋아하는 장소를 이웃들에게 알려주세요.</div>

      <div className="list">
        {recommend?.places.map((place) => (
          <div
            className="place-card"
            key={place.placeId}
            onClick={() => handleSelect(place)}
          >
            <div className="select-icon">
              {isSelected(place.placeId) ? <SelectIcon /> : <Unselect />}
            </div>

            <PlaceCard {...{ place }} type="onboarding">
              {place.savedNum > 0 ? (
                <div className="recommend">이웃도 좋아하는 장소예요.</div>
              ) : (
                <div />
              )}
            </PlaceCard>
          </div>
        ))}
      </div>

      <div className="footer">
        <Button
          className="button"
          onClick={() => {
            if (selected.length > 0) {
              history.push("/onboarding/write");
            }
          }}
        >
          {selected.length}개 장소 선택
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isSubmitable: boolean }>`
  ${WrapperWithHeader}
  padding: 8rem 2rem 9.2rem 2rem;
  height: auto;
  .sub {
    margin-top: 1rem;
    color: ${theme.color.gray7};
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 150%;
  }
  .list {
    ${flexCenter};
    margin-top: 3.6rem;
    flex-direction: column;
    ${gap("1.4rem", "column")}
    .place-card {
      position: relative;
      width: 100%;
      .select-icon {
        position: absolute;
        top: 0.9rem;
        right: 0.9rem;
        z-index: 1;
      }
    }
  }
  .footer {
    z-index: 1;
    position: fixed;
    width: 100%;
    height: 7.4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.color.white};
    padding: 1rem 2rem 1.4rem 2rem;
    box-sizing: border-box;
    .button {
      background-color: ${({ isSubmitable }) =>
        isSubmitable ? theme.color.orange : theme.color.gray2};
      color: ${({ isSubmitable }) =>
        isSubmitable ? theme.color.white : theme.color.gray6};
    }
  }
`;

export default Select;
