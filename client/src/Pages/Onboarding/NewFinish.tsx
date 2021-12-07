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
import { onboardingRegionsGroup } from "../../utils/const";

const NewFinish = () => {
  const { type } = useParams<{ type: string }>();

  const regionId = useRecoilValue(RegionId);

  const regionGroup = onboardingRegionsGroup
    .map((region) => {
      if (region.find((r) => r === regionId)) {
        return [...region];
      }
      return [];
    })
    .find((group) => group.length > 0);

  let regionName = "";
  if (regionGroup?.find((region) => region === "8b33856acaed")) {
    regionName = "봉천동";
  } else if (regionGroup?.find((region) => region === "b4b44131675a")) {
    regionName = "성수동";
  } else if (regionGroup?.find((region) => region === "d9fa9866fe4f")) {
    regionName = "을지로동";
  } else if (regionGroup?.find((region) => region === "f41c789605e4")) {
    regionName = "연희동";
  } else if (regionGroup?.find((region) => region === "b479c088a68d")) {
    regionName = "연남동";
  } else {
    regionName = "신촌동";
  }

  let sub = "";
  if (type === "twoa") {
    if (regionName === "봉천동") {
      sub = `간단히 저녁 먹을 수 있는 맛집을 알려주셔서 
      감사해요. 봉천동에 당장모아가 오픈하게 되면 
      봉천동 이웃에게 알려드릴게요!`;
    } else {
      sub = `자꾸 찾게 되는 디저트 가게를 알려주셔서 
      감사해요. 성수동에 당장모아가 오픈하게 되면 
      성수동 이웃에게 알려드릴게요!`;
    }
  }
  if (type === "twob") {
    if (regionName === "봉천동") {
      sub = `공부할 때 자주 찾는 카페를 알려주셔서 
      감사해요. 봉천동에 당장모아가 오픈하게 되면 
      봉천동 이웃에게 알려드릴게요!`;
    } else {
      sub = `소스까지 남기지 않고 먹는 파스타 맛집을 알려주셔서 
      감사해요. 성수동에 당장모아가 오픈하게 되면 
      성수동 이웃에게 알려드릴게요!`;
    }
  } else if (type === "four") {
    sub = `${regionName} 추천 가게를 알려주셔서 감사해요. 
    ${regionName}에 당장모아가 오픈하게 되면 알려드릴게요!`;
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
      <div className="sub">{sub}</div>

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
