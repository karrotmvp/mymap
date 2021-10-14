import styled from "styled-components";
import { flexCenter, theme } from "../styles/theme";

interface HeaderProps {
  title: string;
  isGradient?: boolean;
}

const Header = ({ title, isGradient }: HeaderProps) => {
  return <Wrapper $isGradient={isGradient || false}>{title}</Wrapper>;
};

const Wrapper = styled.div<{ $isGradient: boolean }>`
  ${flexCenter};
  width: 100%;
  height: 7rem;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background: ${({ $isGradient }) =>
    $isGradient
      ? "linear-gradient(180.03deg, #FFFFFF 23.76%, rgba(255, 255, 255, 0) 117.46%)"
      : "#fff"};
  opacity: ${({ $isGradient }) => ($isGradient ? 0.95 : 1)};
  font-size: 1.6rem;
  line-height: 135%;
  font-weight: bold;
`;

export default Header;
