import { ReactChild } from "react";
import styled from "styled-components";
import { flexCenter, theme } from "../styles/theme";

interface HeaderProps {
  title?: string;
  isTransparent?: boolean;
  children?: ReactChild | ReactChild[];
  className?: string;
  style?: React.CSSProperties;
  isMapView?: boolean;
}

const Header = ({
  title,
  style,
  isTransparent,
  children,
  className,
  isMapView = false,
}: HeaderProps) => {
  return (
    <Wrapper
      {...{ style, className }}
      $isMapView={isMapView}
      $isTransparent={isTransparent || false}
    >
      <div className="title">{title}</div>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isTransparent: boolean; $isMapView: boolean }>`
  ${flexCenter};
  width: 100%;
  height: 5rem;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background: ${({ $isTransparent }) =>
    $isTransparent ? "none" : theme.color.white};

  .title {
    font-size: 1.6rem;
    line-height: 135%;
    font-weight: 500;
    color: ${theme.color.gray7};
  }
  .post-title {
    position: absolute;
    left: 5.3rem;
    font-size: 1.6rem;
    line-height: 135%;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    right: ${({ $isMapView }) => ($isMapView ? "4rem" : "12.4rem")};
    box-sizing: border-box;
  }
  .left-icon {
    position: absolute;
    top: 0.1rem;
    left: 0;
    fill: ${theme.color.gray7};
  }
  .right-icon {
    position: absolute;
    top: 0.1rem;
    right: 0rem;
    fill: ${theme.color.gray7};
  }
  .view-toggle {
    position: absolute;
    ${flexCenter};
    border: 0.1rem solid ${theme.color.gray2};
    border-radius: 3rem;
    font-size: 1.3rem;
    line-height: 135%;
    padding: 0.5rem 0.8rem;
    top: 0.7rem;
  }
`;

export default Header;
