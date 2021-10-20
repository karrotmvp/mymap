import { Link } from "react-router-dom";
import styled from "styled-components";
import { Write } from "../assets";
import { flexCenter, theme } from "../styles/theme";

const CreateButton = () => {
  return (
    <Link to="/write">
      <Wrapper>
        <Write />
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  ${flexCenter};
  position: fixed;
  bottom: 10.4rem;
  right: 2rem;
  width: 5.4rem;
  height: 5.4rem;
  background-color: ${theme.color.orange};
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  z-index: 500;
`;

export default CreateButton;
