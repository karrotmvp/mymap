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
  border-bottom: 0.1rem solid black;
`;

export default Header;
