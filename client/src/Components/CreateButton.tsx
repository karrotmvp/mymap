import styled from "styled-components";
import { flexCenter } from "../styles/theme";

const CreateButton = () => {
  return <Wrapper>+</Wrapper>;
};

const Wrapper = styled.div`
  ${flexCenter};
  position: fixed;
  width: 5.4rem;
  height: 5.4rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

export default CreateButton;
