import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";

const Footer = () => {
  const pathname = window.location.pathname;

  return (
    <Wrapper>
      <FooterLink to="/" $isClicked={pathname === "/"}>
        피드
      </FooterLink>
      <FooterLink to="/around" $isClicked={pathname === "/around"}>
        둘러보기
      </FooterLink>
      <FooterLink to="/mypage" $isClicked={pathname === "/mypage"}>
        마이페이지
      </FooterLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${theme.flexCenter};
  width: 100%;
  height: 8.8rem;
  justify-content: space-around;
  box-shadow: 4px 0px 7px rgba(0, 0, 0, 0.13);
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  background-color: #fff;
`;

const FooterLink = styled(Link)<{ $isClicked: boolean }>`
  opacity: ${({ $isClicked }) => ($isClicked ? 1 : 0.2)};
`;

export default Footer;
