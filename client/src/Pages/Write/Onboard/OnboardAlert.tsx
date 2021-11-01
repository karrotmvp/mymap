import Mini from "@karrotmarket/mini";
import styled from "styled-components";
import { postNotification } from "../../../api/notification";
import { Notification } from "../../../assets";
import { Button, flexCenter, gap, theme } from "../../../styles/theme";

const mini = new Mini();

const OnboardAlert = () => {
  const onClickButton = async () => {
    await postNotification();
    mini.close();
  };

  return (
    <Wrapper>
      <div className="background" />
      <div className="alert">
        <div className="alert-wrapper">
          <div className="title">채팅으로 알림 받기</div>
          <Notification />
          <div className="sub">{`저장할 장소가 떠오르지 않나요?
언제든 만들 수 있도록
링크를 알림으로 보내드릴게요.`}</div>
          <div className="buttons">
            <Button onClick={() => mini.close()}>나가기</Button>
            <Button onClick={onClickButton}>알림받기</Button>
          </div>
        </div>
      </div>
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
      ${flexCenter};
      width: 30rem;
      flex-direction: column;
      padding: 2rem 1.4rem;
      box-sizing: border-box;
      border-radius: 1.6rem;
      background-color: ${theme.color.white};
      .title {
        font-size: 1.6rem;
        font-weight: bold;
        line-height: 135%;
        margin-bottom: 2.7rem;
      }
      .sub {
        margin-top: 1.1rem;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 145%;
        color: ${theme.color.gray6};
        white-space: pre-line;
        text-align: center;
      }
      .buttons {
        width: 100%;
        margin-top: 2.4rem;
        display: flex;
        ${gap("0.8rem")};
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

export default OnboardAlert;
