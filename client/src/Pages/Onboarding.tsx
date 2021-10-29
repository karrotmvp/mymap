import Mini from "@karrotmarket/mini";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  Carousel1,
  Carousel2,
  Carousel3,
  Close,
  OneOne,
  OneTwo,
  ThreeOne,
  ThreeTwo,
  TwoOne,
  TwoTwo,
} from "../assets";
import Swiper from "../Components/PinSlider/Swiper";
import { Button, theme } from "../styles/theme";

const mini = new Mini();

const carousel = [
  { top: <OneOne />, bottom: <OneTwo className="one-two" /> },
  { top: <TwoOne />, bottom: <TwoTwo /> },
  { top: <ThreeOne />, bottom: <ThreeTwo /> },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const history = useHistory();

  return (
    <Wrapper>
      <Close onClick={() => mini.close()} className="close-btn" />
      {current === 0 ? (
        <Carousel1 />
      ) : current === 1 ? (
        <Carousel2 />
      ) : (
        <Carousel3 />
      )}
      <Swiper
        {...current}
        onChange={setCurrent}
        contents={carousel.map((c) => (
          <div className="container">
            {c.top}
            {c.bottom}
          </div>
        ))}
      />
      <div className="button">
        <Button onClick={() => history.push("/onboarding/write")}>
          나만의 테마지도 만들기
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .close-btn {
    position: fixed;
    top: 0;
    left: 0;
    fill: ${theme.color.gray7};
  }
  .one-two {
    margin-bottom: 11.4rem;
  }
  .container {
    height: calc(100vh - 12.4rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .button {
    width: 100%;
    padding: 1rem 2rem 1.4rem 2rem;
    box-sizing: border-box;
    background: #fff;
  }
`;

export default Onboarding;
