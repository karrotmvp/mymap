import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Back } from "../../assets";
import { IsProposeOpened } from "../../Shared/atom";
import { flexCenter, theme } from "../../styles/theme";

const NoSearchBox = ({ style }: { style?: React.CSSProperties }) => {
  const setIsProposeOpened = useSetRecoilState(IsProposeOpened);
  return (
    <Wrapper {...{ style }}>
      <div onClick={() => setIsProposeOpened(true)}>
        <div>
          <div>찾는 장소가 없나요?</div>
          <div>
            {`아직 당근마켓에 등록되지 않은 장소예요.
              원하는 장소를 당근마켓에 알려주세요.`}
          </div>
        </div>
        <Back className="no-search-icon" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1.4rem 2rem;
  width: 100%;
  box-sizing: border-box;
  & > div {
    ${flexCenter};
    justify-content: space-between;
    background-color: ${theme.color.gray1_7};
    border-radius: 1rem;
    padding: 1.5rem;
    height: 10.4rem;
    box-sizing: border-box;
    & > div > div {
      font-size: 1.3rem;
      white-space: pre-line;
      &:first-child {
        font-weight: bold;
        line-height: 150%;
        letter-spacing: -2%;
        color: ${theme.color.gray7};
      }
      &:last-child {
        margin-top: 1.2rem;
        line-height: 160%;
      }
    }
  }
  .no-search-icon {
    fill: ${theme.color.gray6};
    transform: rotate(180deg);
    margin-right: -1.7rem;
  }
`;

export default NoSearchBox;
