import { ReactChild } from "react";
import styled from "styled-components";
import { flexCenter, theme } from "../styles/theme";

interface HeaderProps {
  title?: string;
  isGradient?: boolean;
  children?: ReactChild;
  className?: string;
}

const Header = ({ title, isGradient, children, className }: HeaderProps) => {
  return (
    <Wrapper {...{ className }} $isGradient={isGradient || false}>
      <div className="title">{title}</div>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isGradient: boolean }>`
  ${flexCenter};
  width: 100%;
  height: 5rem;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background: ${({ $isGradient }) =>
    $isGradient
      ? "linear-gradient(180.03deg, #FFFFFF 23.76%, rgba(255, 255, 255, 0) 117.46%)"
      : theme.color.white};
  opacity: ${({ $isGradient }) => ($isGradient ? 0.95 : 1)};

  .title {
    font-size: 1.6rem;
    line-height: 135%;
    font-weight: bold;
  }

  .left-icon {
    position: absolute;
    top: 1.8rem;
    left: 2.1rem;
  }
`;

export default Header;
