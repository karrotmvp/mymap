import Mini from "@karrotmarket/mini";
import { useRouteMatch } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postNotification } from "../../../api/notification";
import { postPreopen } from "../../../api/user";
import { Notification } from "../../../assets";
import { RegionId } from "../../../Shared/atom";
import { Button, flexCenter, gap, theme } from "../../../styles/theme";
import { Mixpanel } from "../../../utils/mixpanel";

const mini = new Mini();

const OnboardAlert = ({ close }: { close: () => void }) => {
  const regionId = useRecoilValue(RegionId);

  const onClickButton = async () => {
    Mixpanel.track("온보딩 후 글작성에서 이탈하지만 알림받음");
    await postNotification();
    await postPreopen(regionId);
    mini.close();
  };

  const route = useRouteMatch({
    path: "/onboarding",
  });

  const handleClose = () => {
    if (route?.isExact) {
      Mixpanel.track("온보딩에서 이탈");
    } else {
      Mixpanel.track("온보딩 후 글작성에서 이탈");
    }
    mini.close();
  };

  return (
    <Wrapper onClick={close}>
      <div className="background" />
      <div className="alert">
        <div className="alert-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="title">다음에 만드시겠어요?</div>
          <Notification />
          <div className="sub">{`저장하고 싶은 장소가 생각날 때
언제든 테마를 만들 수 있도록
채팅으로 알려드릴게요.`}</div>
          <div className="buttons">
            <Button onClick={handleClose}>그냥 나갈게요</Button>
            <Button onClick={onClickButton}>네, 알려주세요</Button>
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
    z-index: 300;
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
