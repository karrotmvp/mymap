import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { mini } from "../../App";
import { Close, LogoTypo, Onboarding } from "../../assets";
import Header from "../../Components/Header";
import { ViewerInfo } from "../../Shared/atom";
import {
  Button,
  ButtonFooter,
  flexCenter,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";

const Finish = () => {
  const history = useHistory();
  const viewerInfo = useRecoilValue(ViewerInfo);

  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" onClick={() => mini.close()} />
        <LogoTypo />
      </Header>

      <Title style={{ color: theme.color.orange }}>장소를 저장했어요!</Title>
      <div className="sub">
        {`${viewerInfo.userName}님이 저장한 장소는
내 근처 탭, 생활서비스에 있는 ‘당장모아’에서 
언제든 다시 볼 수 있어요.`}
      </div>
      <div className="center">
        <Onboarding />
      </div>

      <ButtonFooter>
        <Button
          className="button"
          onClick={() => {
            Mixpanel.track("온보딩B - 구경하기");
            history.push("/mypage");
          }}
        >
          저장한 장소 확인하기
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
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 165%;
    letter-spacing: -2%;
    color: ${theme.color.gray7};
    white-space: pre-line;
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
