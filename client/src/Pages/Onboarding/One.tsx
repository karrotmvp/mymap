/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { mini } from "../../App";
import { Close, LogoTypo, SearchClose } from "../../assets";
import Header from "../../Components/Header";
import useInput from "../../Hooks/useInput";
import {
  Button,
  ButtonFooter,
  input,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";

const One = () => {
  const history = useHistory();

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

    // const body = {
    //   title:
    //     input.value !== "" ? input.value : `${regionName} 주민이 관심있는 장소`,
    //   regionId,
    //   share: true,
    //   pins: selected.map((place) => {
    //     return {
    //       placeId: place.placeId,
    //       latitude: place.coordinates.latitude,
    //       longitude: place.coordinates.longitude,
    //     };
    //   }),
    // };
    // const data = await postPost(body);
    // if (data.postId) history.push(`/onboarding/finish`);
    Mixpanel.track("온보딩1 - 다 적었어요");
    history.push(`/onboarding/finish/1`);
  };

  useEffect(() => {
    const element = document.querySelector(
      "#onboarding-input"
    ) as HTMLTextAreaElement;
    element.focus();
  }, []);

  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" onClick={() => mini.close()} />
        <LogoTypo />
      </Header>

      <div className="form">
        <Title>
          {`우리 동네에서 
알고 싶은 테마는 무엇인가요?`}
        </Title>

        <div className="sub">
          테마를 적어주시면 당장모아가 테마에 맞는 장소를 알려드릴게요.
        </div>

        <div className="title-input">
          <Input
            id="onboarding-input"
            onInput={handleInput}
            placeholder={"혼밥하기 좋은 식당 있을까요?"}
            value={input.value}
            onClick={() => Mixpanel.track("온보딩A - 텍스트박스 클릭")}
          />
          <SearchClose className="search-close" onClick={removeInput} />
        </div>
      </div>

      <div className="example">
        우리 동네 이웃들은 이렇게 적었어요.
        <div>
          {`일하러 가기 좋은 카페가 궁금해요
반려동물과 함께 할 수 있는 가게는 어딘가요?
직장인의 점심 맛집을 알고 싶어요`}
        </div>
      </div>

      <ButtonFooter>
        <Button className="button" onClick={handleSubmit}>
          다 적었어요
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
    .sub {
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 150%;
      letter-spacing: -2%;
      color: ${theme.color.gray6};
      margin-top: 0.8rem;
    }
  }
  .title-input {
    position: relative;
    margin-top: 3.6rem;
    .search-close {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      fill: ${theme.color.gray2};
    }
  }
  .example {
    border-top: 1.6rem solid ${theme.color.gray1_5};
    padding: 1.4rem 2rem 0 2rem;
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
  background-color: ${theme.color.gray1};
`;

export default One;
