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
  ButtonFooter,
  input,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import { funcNeedLogin } from "../../utils/preset";

const Write = ({ close }: { close: () => void }) => {
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

    Mixpanel.track("온보딩A - 작성 완료");

    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: async () => {
          const body = {
            title:
              input.value !== ""
                ? input.value
                : `${regionName} 주민이 관심있는 장소`,
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
        },
      },
    });
  };

  useEffect(() => {
    if (regionName) {
      input.setValue("");
    }
  }, [regionName]);

  useEffect(() => {
    const element = document.querySelector(
      "#onboarding-input"
    ) as HTMLTextAreaElement;
    element.focus();
  }, []);

  return (
    <Wrapper>
      <Header>
        <Back className="left-icon" onClick={close} />
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
            placeholder={`${regionName} 주민이 관심있는 장소`}
            value={input.value}
            onClick={() => Mixpanel.track("온보딩A - 텍스트박스 클릭")}
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

      <ButtonFooter>
        <Button className="button" onClick={handleSubmit}>
          우리 동네 장소 추천하기
        </Button>
      </ButtonFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader}
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 500;
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
      border-radius: 1rem;
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
