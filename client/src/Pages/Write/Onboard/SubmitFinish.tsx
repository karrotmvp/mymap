import styled from "styled-components";
import { Close, Finish } from "../../../assets";
import { Button, theme } from "../../../styles/theme";

const SubmitFinish = () => {
  return (
    <Wrapper>
      <Close className="close-btn" />
      <Finish />
      <Button className="button">오픈 시 알림을 받을래요</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  background-color: ${theme.color.gray1_5};
  .close-btn {
    position: fixed;
    top: 0;
    left: 0;
    fill: ${theme.color.gray7};
  }
  .button {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 1.4rem;
  }
`;

export default SubmitFinish;
