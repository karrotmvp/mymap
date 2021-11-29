import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";
import { useHistory } from "react-router";
import {
  Around,
  AroundActive,
  Home,
  HomeActive,
  Mypage,
  MypageActive,
} from "../assets";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RegionId, ViewerInfo } from "../Shared/atom";
import { funcNeedLogin } from "../utils/preset";

const Footer = () => {
  const pathname = window.location.pathname;
  const history = useHistory();

  const regionId = useRecoilValue(RegionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);

  const clickMypage = () => {
    funcNeedLogin({
      ...{
        setViewerInfo,
        regionId,
        afterFunc: () => history.push("/mypage"),
      },
    });
  };

  return (
    <Wrapper>
      <FooterLink to="/" $isClicked={pathname === "/"}>
        {pathname === "/" ? <HomeActive /> : <Home />}
        <div>추천 테마</div>
      </FooterLink>
      <FooterLink to="/around" $isClicked={pathname === "/around"}>
        {pathname === "/around" ? <AroundActive /> : <Around />}
        <div>장소 둘러보기</div>
      </FooterLink>
      <FooterDiv onClick={clickMypage} $isClicked={pathname === "/mypage"}>
        {pathname === "/mypage" ? <MypageActive /> : <Mypage />}
        <div>나의 테마</div>
      </FooterDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6.8rem;
  justify-content: space-around;
  box-shadow: 4px 0px 7px rgba(0, 0, 0, 0.13);
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  background-color: ${theme.color.white};
`;

const FooterLink = styled(Link)<{ $isClicked: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  line-height: 150%;
  & > div {
    color: ${({ $isClicked }) =>
      $isClicked ? theme.color.orange : theme.color.gray5};
  }
`;
const FooterDiv = styled.div<{ $isClicked: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  line-height: 150%;
  & > div {
    color: ${({ $isClicked }) =>
      $isClicked ? theme.color.orange : theme.color.gray5};
  }
`;

export default Footer;
