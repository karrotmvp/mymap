import { useState } from "react";
import styled from "styled-components";
import { Button, flexCenter, gap, theme } from "../../../styles/theme";
import SubmitFinish from "./SubmitFinish";

const OnboardSubmit = ({ close }: { close: () => void }) => {
  const [isFinishOpened, setIsFinishOpened] = useState(false);
  return (
    <Wrapper>
      <div className="background" />
      <div className="alert">
        <div className="alert-wrapper">
          <div className="title">작성을 완료하시겠어요?</div>
          <div className="sub">{`작성이 완료된 테마지도는 11월초 오픈되는 
‘당장모아'에서 확인할 수 있어요!`}</div>
          <div className="buttons">
            <Button onClick={close}>취소</Button>
            <Button onClick={() => setIsFinishOpened(true)}>완료</Button>
          </div>
        </div>
      </div>

      {isFinishOpened && <SubmitFinish />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .alert {
    ${flexCenter};
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    padding: 2rem;
    box-sizing: border-box;
    .alert-wrapper {
      width: 30rem;
      flex-direction: column;
      padding: 2rem 2.4rem;
      box-sizing: border-box;
      border-radius: 1.6rem;
      background-color: ${theme.color.white};
      .title {
        font-size: 1.6rem;
        font-weight: bold;
        line-height: 135%;
      }
      .sub {
        margin-top: 0.4rem;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 145%;
        color: ${theme.color.gray6};
        white-space: pre-line;
      }
      .buttons {
        width: 100%;
        margin-top: 2.4rem;
        display: flex;
        ${gap("1rem")};
        & > div {
          width: 100%;
          &:first-child {
            background-color: ${theme.color.white};
            color: ${theme.color.gray7};
            border: 0.1rem solid ${theme.color.gray3};
          }
        }
      }
    }
  }
`;

export default OnboardSubmit;
