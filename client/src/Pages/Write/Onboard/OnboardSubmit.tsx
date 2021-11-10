import { useState } from "react";
import styled from "styled-components";
import { Button, flexCenter, gap, theme } from "../../../styles/theme";
import SubmitFinish from "./SubmitFinish";

const OnboardSubmit = ({
  close,
  handleSubmit,
}: {
  close: () => void;
  handleSubmit: () => Promise<void>;
}) => {
  const [isFinishOpened, setIsFinishOpened] = useState(false);
  const onClickFinish = async () => {
    await handleSubmit();
    setIsFinishOpened(true);
  };

  return (
    <Wrapper onClick={close}>
      <div className="background" />
      <div className="alert">
        <div className="alert-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="title">테마를 다 만드셨나요?</div>
          <div className="sub">만든 테마는 ‘당장모아’에서 확인할 수 있어요</div>
          <div className="buttons">
            <Button onClick={close}>더 수정할래요</Button>
            <Button onClick={onClickFinish}>다 만들었어요</Button>
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
    z-index: 300;
    padding: 2rem;
    box-sizing: border-box;
    .alert-wrapper {
      width: 32rem;
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
