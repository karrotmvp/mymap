/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { mini } from "../../App";
import { Close, LogoTypo, SearchClose } from "../../assets";
import Header from "../../Components/Header";
import useInput from "../../Hooks/useInput";
import { RegionId } from "../../Shared/atom";
import {
  Button,
  ButtonFooter,
  input,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { regionsGroup } from "../../utils/const";
import { Mixpanel } from "../../utils/mixpanel";

const Two = () => {
  const history = useHistory();

  const regionId = useRecoilValue(RegionId);

  const input = useInput("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // textarea autosize
    e.target.style.height = "5.4rem";
    e.target.style.height = e.target.scrollHeight + "px";

    input.setValue(e.target.value);
  };

  const removeInput = () => {
    input.setValue("");
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

    //   const body = {
    //     title:
    //       input.value !== ""
    //         ? input.value
    //         : `${regionName} 주민이 관심있는 장소`,
    //     regionId,
    //     share: true,
    //     pins: selected.map((place) => {
    //       return {
    //         placeId: place.placeId,
    //         latitude: place.coordinates.latitude,
    //         longitude: place.coordinates.longitude,
    //       };
    //     }),
    //   };
    //   const data = await postPost(body);
    //   if (data.postId) history.push(`/onboarding/finish`);
    Mixpanel.track("온보딩2 - 다 적었어요");
    history.push(`/onboarding/finish/2`);
  };

  useEffect(() => {
    const element = document.querySelector(
      "#onboarding-input"
    ) as HTMLTextAreaElement;
    element.focus();
  }, []);

  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  let title = <div />;
  let sub = "";
  let placeholder = "";
  if (regionGroup?.find((region) => region === "471abc99b378")) {
    // 서초
    title = (
      <div>
        {`서초동에서 퇴근 후 
문화생활을 즐기기 좋은 곳은 어디인가요?`}
      </div>
    );
    sub = "서초동 이웃에게 알려주세요.";
    placeholder = "놀숲 만화카페, 슈퍼스타 코인 노래방";
  } else if (regionGroup?.find((region) => region === "5424e9f7ec6d")) {
    // 잠실
    title = (
      <div>
        {`잠실동에서
자주 가는 친절한 병원은 어디인가요?`}
      </div>
    );
    sub = "잠실동 이웃에게 알려주세요.";
    placeholder = "잠실 연세 내과, 사랑 치과";
  } else {
    // 한남
    title = (
      <div>
        {`한남동에서 친구들과, 연인과 가기 좋은
분위기 최고 bar는 어디인가요?`}
      </div>
    );
    sub = "한남동 이웃에게 알려주세요.";
    placeholder = "소코(SOKO Bar), 블라인드피그";
  }

  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" onClick={() => mini.close()} />
        <LogoTypo />
      </Header>

      <Title style={{ fontSize: "1.9rem", marginTop: "2.3rem" }}>{title}</Title>

      <div className="sub">{sub}</div>

      <div className="title-input">
        <Input
          id="onboarding-input"
          onInput={handleInput}
          placeholder={placeholder}
          value={input.value}
          onClick={() => Mixpanel.track("온보딩A - 텍스트박스 클릭")}
        />
        <SearchClose className="search-close" onClick={removeInput} />
      </div>

      <ButtonFooter>
        <SubmitBtn
          onClick={() => {
            input.value.length > 0 && handleSubmit();
          }}
          $disabled={input.value.length === 0}
        >
          다 적었어요
        </SubmitBtn>
      </ButtonFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  background-color: #fff;
  padding-left: 2rem;
  padding-right: 2rem;
  .sub {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 150%;
    letter-spacing: -2%;
    color: ${theme.color.gray6};
    margin-top: 1rem;
  }
  .title-input {
    position: relative;
    margin-top: 4rem;
    .search-close {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      fill: ${theme.color.gray2};
    }
  }
`;

const Input = styled.textarea<{ $error?: boolean }>`
  ${input};
  padding-right: 5rem;
  height: 5.4rem;
  background-color: ${theme.color.gray1};
`;

const SubmitBtn = styled(Button)<{ $disabled: boolean }>`
  background-color: ${({ $disabled }) =>
    $disabled ? theme.color.gray2 : theme.color.orange};
  color: ${({ $disabled }) =>
    $disabled ? theme.color.gray7 : theme.color.white};
`;

export default Two;
