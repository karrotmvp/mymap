import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { mini } from "../../App";
import { Close, LogoTypo, Onboarding } from "../../assets";
import Header from "../../Components/Header";
import { Installed, RegionId, ViewerInfo } from "../../Shared/atom";
import {
  Button,
  ButtonFooter,
  flexCenter,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { regionsGroup } from "../../utils/const";
import { Mixpanel } from "../../utils/mixpanel";
import { funcNeedLogin, handleClose } from "../../utils/preset";

const Finish = () => {
  const { type: onboardingType } = useParams<{ type: string }>();
  const setViewerInfo = useSetRecoilState(ViewerInfo);
  const installed = useRecoilValue(Installed);
  const regionId = useRecoilValue(RegionId);

  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  let title = "";
  let sub = <div />;

  if (onboardingType === "1") {
    title = "알려주셔서 감사해요!";
    sub = (
      <div className="sub">
        {`알려주신 테마에 대한 장소를 찾으면
        채팅으로 알려드릴게요.`}
      </div>
    );
  } else if (onboardingType === "2") {
    title = "알려주셔서 감사해요!";
    if (regionGroup?.find((region) => region === "471abc99b378")) {
      // 서초
      sub = (
        <div className="sub">
          <span>'퇴근 후 문화생활 즐기기 좋은 곳'</span>
          {`에 대한
          다른 서초동 이웃들의 답변도 궁금하신가요?
          채팅으로 알려드릴게요!`}
        </div>
      );
    } else if (regionGroup?.find((region) => region === "5424e9f7ec6d")) {
      sub = (
        // 잠실
        <div className="sub">
          <span>'자주 가는 친절한 병원'</span>
          {`에 대한
          다른 잠실동 이웃들의 답변도 궁금하신가요?
          채팅으로 알려드릴게요!`}
        </div>
      );
    } else {
      // 한남
      sub = (
        <div className="sub">
          <span>'친구들과, 연인과 가기 좋은 분위기 최고 bar'</span>
          {`에 대한
        다른 한남동 이웃들의 답변도 궁금하신가요?
        채팅으로 알려드릴게요!`}
        </div>
      );
    }
  }

  const handleFinish = () => {
    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: () => {
          if (onboardingType === "2") {
            Mixpanel.track("온보딩2 - 동의 후 알림받기");
          }
          mini.close();
        },
      },
    });
  };

  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" onClick={() => handleClose(installed)} />
        <LogoTypo />
      </Header>

      <Title style={{ color: theme.color.orange }}>{title}</Title>
      {sub}

      <div className="center">
        <Onboarding />
      </div>

      <ButtonFooter>
        <Button className="button" onClick={handleFinish}>
          네, 알려주세요
        </Button>
      </ButtonFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding: 8rem 2rem 0 2rem;
  .sub {
    margin-top: 1.4rem;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 165%;
    letter-spacing: -2%;
    color: ${theme.color.gray7};
    white-space: pre-line;
    span {
      font-weight: 500;
    }
  }
  .center {
    ${flexCenter};
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
  }
`;

export default Finish;
