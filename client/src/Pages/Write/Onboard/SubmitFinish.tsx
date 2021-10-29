import Mini from "@karrotmarket/mini";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postPreopen } from "../../../api/user";
import { Close, Finish } from "../../../assets";
import { RegionId } from "../../../Shared/atom";
import { Button, theme } from "../../../styles/theme";

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
      <Finish />
      <Button className="button" onClick={onClickButton}>
        오픈 시 알림을 받을래요
      </Button>
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
