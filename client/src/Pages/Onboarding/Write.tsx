/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { postPost } from "../../api/post";
import { useGetRegion } from "../../api/region";
import { Back, LogoTypo, SearchClose } from "../../assets";
import Header from "../../Components/Header";
import useInput from "../../Hooks/useInput";
import { OnboardingSelected, RegionId, ViewerInfo } from "../../Shared/atom";
import {
  Button,
  input,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { startPreset } from "../../utils/preset";

const Write = () => {
  const history = useHistory();

  const regionId = useRecoilValue(RegionId);
  const selected = useRecoilValue(OnboardingSelected);
  const { data: regionName } = useGetRegion(regionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);

  const [isInputOver, setIsInputOver] = useState(false);
  const input = useInput("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // textarea autosize
    e.target.style.height = "5.4rem";
    e.target.style.height = e.target.scrollHeight + "px";

    input.setValue(e.target.value);
    if (e.target.value.length > 30) {
      setIsInputOver(true);
    } else {
      setIsInputOver(false);
    }
  };

  const removeInput = () => {
    input.setValue("");
    setIsInputOver(false);
    const element = document.querySelector(
      "#onboarding-input"
    ) as HTMLTextAreaElement;
    element.style.height = "5.4rem";
  };

  let submitFlag = false;

  const submitCheck = () => {
    if (submitFlag) {
      return submitFlag;
    } else {
      submitFlag = true;
      return false;
    }
  };

  const handleSubmit = async () => {
    if (submitCheck()) return;

    if (!localStorage.getItem("token")) {
      startPreset({ ...{ setViewerInfo, regionId } });
    } else {
      const body = {
        title: input.value,
        regionId,
        share: true,
        pins: selected.map((place) => {
          return {
            placeId: place.placeId,
            latitude: place.coordinates.latitude,
            longitude: place.coordinates.longitude,
          };
        }),
      };
      const data = await postPost(body);
      if (data.postId) history.push(`/onboarding/finish`);
    }
  };

  useEffect(() => {
    if (regionName) {
      input.setValue(`${regionName} 주민이 관심있는 장소`);
    }
  }, [regionName]);

  return (
    <Wrapper isSubmitable={input.value.length > 0}>
      <Header>
        <Back className="left-icon" onClick={() => history.goBack()} />
        <LogoTypo />
      </Header>

      <div className="form">
        <Title>
          {`추천하는 장소에 대해
간단하게 설명해 주세요.`}
        </Title>

        <div className="title-input">
          <Input
            id="onboarding-input"
            $error={isInputOver}
            // maxLength={30}
            onInput={handleInput}
            placeholder="예) 나만 알고있던 혼밥하기 좋은 식당"
            value={input.value}
          />
          {isInputOver && (
            <div className="error">
              공백을 포함해 최대 30글자로 작성해주세요
            </div>
          )}
          <SearchClose className="search-close" onClick={removeInput} />
        </div>
      </div>

      <div className="example">
        우리 동네 이웃들은 이렇게 적었어요.
        <div>
          {`일하러 가기 좋은 카페 모음
반려동물과 함께 할 수 있는 장소
직장인의 점심 맛집들`}
        </div>
      </div>

      <div className="footer">
        <Button
          className="button"
          onClick={() => {
            input.value.length > 0 && handleSubmit();
          }}
        >
          우리 동네 장소 추천하기
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isSubmitable: boolean }>`
  ${WrapperWithHeader}
  height: auto;
  .form {
    padding: 3rem 2rem 5.4rem 2rem;
  }
  .title-input {
    position: relative;
    margin-top: 2.4rem;
    .error {
      color: ${theme.color.red};
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 160%;
      padding-top: 0.2rem;
    }
    .search-close {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      fill: ${theme.color.gray2};
    }
  }
  .example {
    border-top: 1.6rem solid ${theme.color.gray1_5};
    padding: 4.4rem 2rem 0 2rem;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 150%;
    letter-spacing: -2%;
    color: ${theme.color.gray7};
    & > div {
      margin-top: 1.4rem;
      background: ${theme.color.gray1};
      padding: 1.6rem 1.8rem;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 170%;
      color: ${theme.color.gray6};
      white-space: pre-line;
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

const Input = styled.textarea<{ $error?: boolean }>`
  ${input};
  padding-right: 5rem;
  height: 5.4rem;
  border: 0.1rem solid
    ${({ $error }) => (!$error ? theme.color.orange_medium : theme.color.red)};
  &:focus {
    border: 0.1rem solid ${theme.color.orange};
  }
`;

export default Write;
