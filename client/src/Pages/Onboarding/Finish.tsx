import styled from "styled-components";
import { Close, LogoTypo } from "../../assets";
import Header from "../../Components/Header";

const Finish = () => {
  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" />
        <LogoTypo />
      </Header>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Finish;
