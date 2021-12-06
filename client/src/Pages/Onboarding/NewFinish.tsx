import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { mini } from "../../App";
import { Close, LogoTypo, Onboarding } from "../../assets";
import Header from "../../Components/Header";
import { RegionId } from "../../Shared/atom";
import {
  flexCenter,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { regionsGroup } from "../../utils/const";

const NewFinish = () => {
  const { type } = useParams<{ type: string }>();

  const regionId = useRecoilValue(RegionId);

  const regionGroup = regionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  let sub = <div />;
  if (type === "two") {
    if (regionGroup?.find((region) => region === "471abc99b378")) {
      // 서초
      sub = (
        <div className="sub">
          <span>'퇴근 후 문화생활 즐기기 좋은 곳'</span>
          {`에 대한
          다른 서초동 이웃들의 답변도 궁금하신가요?
          채팅으로 알려드릴게요!`}
        </div>
      );
    } else if (regionGroup?.find((region) => region === "5424e9f7ec6d")) {
      sub = (
        // 잠실
        <div className="sub">
          <span>'퇴근 후 문화생활 즐기기 좋은 곳'</span>
          {`에 대한
          다른 잠실동 이웃들의 답변도 궁금하신가요?
          채팅으로 알려드릴게요!`}
        </div>
      );
    } else {
      // 한남
      sub = (
        <div className="sub">
          <span>'친구들과, 연인과 가기 좋은 분위기 최고 bar'</span>
          {`에 대한
        다른 한남동 이웃들의 답변도 궁금하신가요?
        채팅으로 알려드릴게요!`}
        </div>
      );
    }
  } else if (type === "four") {
    sub = (
      <div className="sub">
        {`연남동 추천 가게를 알려주셔서 감사해요. 
    연남동에 당장모아가 오픈하게 되면 연남동 이웃에게 알려드릴게요!`}
      </div>
    );
  }

  return (
    <Wrapper>
      <Header>
        <Close className="left-icon" onClick={() => mini.close()} />
        <LogoTypo />
      </Header>

      <Title style={{ color: theme.color.orange, fontWeight: "bold" }}>
        알려주셔서 감사해요!
      </Title>
      {sub}

      <div className="center">
        <Onboarding />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding: 8rem 2rem 0 2rem;
  .sub {
    margin-top: 1.4rem;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 165%;
    letter-spacing: -2%;
    color: ${theme.color.gray7};
    white-space: pre-line;
    span {
      font-weight: 500;
    }
  }
  .center {
    ${flexCenter};
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
  }
`;

export default NewFinish;
