/* eslint-disable react-hooks/exhaustive-deps */
import mixpanel from "mixpanel-browser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CreatePlus } from "../assets";
import { flexCenter, theme } from "../styles/theme";

const CreateButton = ({ targetId }: { targetId: string }) => {
  const [isLong, setIsLong] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const targetElement = document.querySelector(`#${targetId}`)!;
    const onSrcoll = () => {
      if (targetElement.scrollTop > 0) {
        if (targetElement.scrollTop > lastScroll) {
          setIsLong(false);
          lastScroll = targetElement.scrollTop;
        } else if (targetElement.scrollTop < lastScroll) {
          setIsLong(true);
          lastScroll = targetElement.scrollTop;
        }
      }
    };
    targetElement.addEventListener("scroll", onSrcoll);
    return () => targetElement.removeEventListener("scroll", onSrcoll);
  }, []);
  return (
    <Link to="/write" onClick={() => mixpanel.track("글작성 버튼 누름")}>
      <Wrapper {...{ isLong }}>
        <CreatePlus />
        {isLong && <div className="text">테마 만들기</div>}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div<{ isLong: boolean }>`
  ${flexCenter};
  position: fixed;
  bottom: 9rem;
  right: 2rem;
  width: ${({ isLong }) => (isLong ? "13.1rem" : "4.8rem")};
  height: 4.8rem;
  background-color: ${theme.color.orange};
  border-radius: ${({ isLong }) => (isLong ? "2.4rem" : "50%")};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  z-index: 500;
  transition: 0.3s;
  .text {
    white-space: nowrap;
    color: #fff;
    margin-left: 1.3rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 150%;
  }
`;

export default CreateButton;
