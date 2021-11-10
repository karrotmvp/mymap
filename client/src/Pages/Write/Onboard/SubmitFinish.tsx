import { mini } from "../../../App";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Close, Finish1, Finish2 } from "../../../assets";
import { Button, flexCenter, theme } from "../../../styles/theme";
import { Mixpanel } from "../../../utils/mixpanel";

const SubmitFinish = () => {
  const history = useHistory();

  const onClickButton = async () => {
    Mixpanel.track("글작성 완료 후 둘러보기");
    history.push("/");
  };

  return (
    <Wrapper>
      <Close onClick={() => mini.close()} className="close-btn" />
      <Finish1 />
      <div className="center">
        <Finish2 />
      </div>
      <Button className="button" onClick={onClickButton}>
        당장모아 둘러보기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  flex-direction: column;
  padding: 5rem 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  background-color: ${theme.color.gray1_5};
  .center {
    ${flexCenter};
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
  }
  .close-btn {
    position: fixed;
    top: 0;
    left: 0;
    fill: ${theme.color.gray7};
  }
  .button {
    position: fixed;
    left: 2rem;
    right: 2rem;
    bottom: 1.4rem;
  }
`;

export default SubmitFinish;
