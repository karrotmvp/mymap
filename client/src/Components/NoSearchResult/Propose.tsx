import { ChangeEvent } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { postPlaceNew } from "../../api/place";
import { Back, SearchClose } from "../../assets";
import useInput from "../../Hooks/useInput";
import { IsProposeOpened, RegionId, ToastMessage } from "../../Shared/atom";
import {
  ButtonFooter,
  input,
  SubmitBtn,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import Header from "../Header";

const Propose = () => {
  const setIsProposeOpened = useSetRecoilState(IsProposeOpened);
  const input = useInput("");
  const regionId = useRecoilValue(RegionId);
  const setToastMessage = useSetRecoilState(ToastMessage);

  return (
    <Wrapper>
      <Header title="가게 제안">
        <Back className="left-icon" onClick={() => setIsProposeOpened(false)} />
      </Header>

      <Title
        style={{ fontSize: "2rem", lineHeight: "150%", marginTop: "5rem" }}
      >
        원하는 가게를 당근마켓에 알려주세요.
      </Title>
      <div className="sub">가게가 추가되면 알려드릴게요!</div>

      <div className="custom-input">
        <Input
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            input.setValue(e.target.value)
          }
          value={input.value}
        />
        <SearchClose
          className="search-close"
          onClick={() => input.setValue("")}
        />
      </div>

      <ButtonFooter>
        <SubmitBtn
          $disabled={input.value.length === 0}
          onClick={() => {
            postPlaceNew(regionId, input.value);
            setToastMessage({
              isToastShown: true,
              message: "가게를 제안했어요",
            });
          }}
        >
          가게 제안하기
        </SubmitBtn>
      </ButtonFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  ${WrapperWithHeader};
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 700;
  height: 100vh;
  .sub {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 150%;
    color: ${theme.color.gray6};
  }
  .custom-input {
    position: relative;
    margin-top: 3.6rem;
    .search-close {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      fill: ${theme.color.gray2};
    }
  }
`;

const Input = styled.input<{ $error?: boolean }>`
  ${input};
  padding-right: 5rem;
  height: 5.2rem;
  background-color: ${theme.color.gray1};
  color: ${theme.color.black};
  margin-bottom: 1rem;
`;

export default Propose;
