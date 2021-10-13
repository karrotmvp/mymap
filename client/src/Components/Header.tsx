import styled from "styled-components";
import { theme } from "../styles/theme";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return <Wrapper>{title}</Wrapper>;
};

const Wrapper = styled.div`
  ${theme.flexCenter};
  width: 100%;
  height: 7rem;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: #fff;
  font-size: 1.8rem;
`;

export default Header;
