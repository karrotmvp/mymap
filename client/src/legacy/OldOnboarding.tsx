import { useEffect, useState } from "react";
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
  TwoOne,
  TwoTwo,
} from "../assets";
import Swiper from "../Components/PinSlider/Swiper";
import { Button, theme } from "../styles/theme";
import { Mixpanel } from "../utils/mixpanel";
import OnboardAlert from "./Onboard/OnboardAlert";

const carousel = [
  { key: "one", top: <OneOne />, bottom: <OneTwo className="one-two" /> },
  { key: "two", top: <TwoOne />, bottom: <TwoTwo /> },
  {
    key: "three",
    top: <ThreeOne />,
    bottom: <img src="/3-2.png" alt="onboarding" />,
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const [isOnboardOutAlertOpened, setIsOnboardOutAlertOpened] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Mixpanel.track("온보딩 진입");
  }, []);

  return (
    <Wrapper>
      <Close
        onClick={() => {
          setIsOnboardOutAlertOpened(true);
        }}
        className="close-btn"
      />
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
          <div key={c.key} className="container">
            {c.top}
            {c.bottom}
          </div>
        ))}
      />
      <div className="button">
        <Button
          onClick={() => {
            Mixpanel.track("온보딩에서 글작성으로 진입");
            history.push("/onboarding/write");
          }}
        >
          나만의 테마 만들기
        </Button>
      </div>

      {isOnboardOutAlertOpened && (
        <OnboardAlert close={() => setIsOnboardOutAlertOpened(false)} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
  }
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
