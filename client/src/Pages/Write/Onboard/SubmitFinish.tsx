import Mini from "@karrotmarket/mini";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postPreopen } from "../../../api/user";
import { Close, Finish1, Finish2 } from "../../../assets";
import { RegionId } from "../../../Shared/atom";
import { Button, flexCenter, theme } from "../../../styles/theme";

const mini = new Mini();

const SubmitFinish = () => {
  const regionId = useRecoilValue(RegionId);
  console.log(regionId);
  const onClickButton = async () => {
    await postPreopen(regionId);
    mini.close();
  };

  return (
    <Wrapper>
      <Close className="close-btn" />
      <Finish1 />
      <div className="center">
        <Finish2 />
      </div>
      <Button className="button" onClick={onClickButton}>
        오픈 시 알림을 받을래요
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
