import styled from "styled-components";
import { LogoInactive } from "../assets";
import { Button, flexCenter, gap, theme } from "../styles/theme";
import Mini from "@karrotmarket/mini";

const mini = new Mini();

const ClosePage = () => {
  const handleClose = () => {
    mini.close();
  };

  return (
    <Wrapper>
      <LogoInactive />
      <div className="title">오랜 시간 이용하지 않아</div>
      <div className="title bold">당근마켓으로 돌아가요.</div>
      <div className="sub">당장모아에서 다시 만나길 기다릴게요.</div>

      <Button className="close-btn" onClick={handleClose}>
        당근마켓으로 이동
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${flexCenter};
  ${gap("1.4rem", "column")};
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  box-sizing: border-box;
  .title {
    color: ${theme.color.gray7};
    letter-spacing: -2%;
    line-height: 140%;
    font-size: 2.2rem;
    font-weight: 500;
    &.bold {
      font-weight: 700;
      margin-top: 0;
    }
  }
  .sub {
    color: ${theme.color.gray5};
    font-size: 1.2rem;
    line-height: 140%;
    font-weight: bold;
  }
  .close-btn {
    position: fixed;
    bottom: 1.4rem;
    left: 0;
    right: 0;
    margin: 0 2rem;
  }
`;

export default ClosePage;
