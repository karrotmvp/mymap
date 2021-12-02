import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useGetAroundPlaces } from "../../api/place";
import { useGetRegion } from "../../api/region";
import { Close, LogoTypo, Unselect, Select as SelectIcon } from "../../assets";
import Header from "../../Components/Header";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import { Installed, OnboardingSelected, RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import {
  Button,
  ButtonFooter,
  flexCenter,
  gap,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import { handleClose } from "../../utils/preset";
import Write from "./Write";

const Select = () => {
  const regionId = useRecoilValue(RegionId);
  const installed = useRecoilValue(Installed);
  const { data: regionName } = useGetRegion(regionId);
  const { data: recommend } = useGetAroundPlaces(regionId, {
    keepPreviousData: true,
  });

  const [isSelectFinished, setIsSelectedFinished] = useState(false);

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
      if (selected.length < 10) {
        setSelected([...selected, place]);
      }
    }
  };

  useEffect(() => {
    Mixpanel.track("온보딩A - 진입");
  }, []);

  return (
    <Wrapper isSubmitable={selected.length > 0}>
      <Header>
        <Close className="left-icon" onClick={() => handleClose(installed)} />
        <LogoTypo />
      </Header>

      <Title style={{ color: theme.color.orange }}>{`${regionName} 주민님,
관심 있는 ${regionName} 장소가 있나요?`}</Title>
      <div className="sub">{`내가 좋아하는 장소를 이웃들에게 알려주세요.
장소는 최대 10개까지 고를 수 있어요.`}</div>

      <div className="list">
        {recommend?.places.map((place) => (
          <div
            className="place-card"
            key={place.placeId}
            onClick={() => handleSelect(place)}
          >
            <PlaceCard {...{ place }} type="onboarding">
              <div className="select-icon">
                {isSelected(place.placeId) ? <SelectIcon /> : <Unselect />}
              </div>
              {place.savedNum > 0 ? (
                <div className="recommend">이웃도 좋아하는 장소예요.</div>
              ) : (
                <div />
              )}
            </PlaceCard>
          </div>
        ))}
      </div>

      <ButtonFooter>
        <Button
          className="button"
          onClick={() => {
            if (selected.length > 0) {
              Mixpanel.track("온보딩A - 장소 선택 완료");
              // history.push("/onboarding/write");
              setIsSelectedFinished(true);
            }
          }}
        >
          {selected.length}개 장소 선택
        </Button>
      </ButtonFooter>

      {isSelectFinished && <Write close={() => setIsSelectedFinished(false)} />}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isSubmitable: boolean }>`
  ${WrapperWithHeader}
  padding: 8rem 2rem 9.2rem 2rem;
  overflow-y: scroll;
  .sub {
    margin-top: 1rem;
    color: ${theme.color.gray7};
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 150%;
    white-space: pre-line;
  }
  .list {
    ${flexCenter};
    margin-top: 3.6rem;
    flex-direction: column;
    ${gap("1.4rem", "column")}
    .place-card {
      position: relative;
      width: 100%;
      /* .select-icon {
        position: absolute;
        top: 0.9rem;
        right: 0.9rem;
        z-index: 1;
      } */
    }
  }
  .button {
    background-color: ${({ isSubmitable }) =>
      isSubmitable ? theme.color.orange : theme.color.gray2};
    color: ${({ isSubmitable }) =>
      isSubmitable ? theme.color.white : theme.color.gray6};
  }
`;

export default Select;
