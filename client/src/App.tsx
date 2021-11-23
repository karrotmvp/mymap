/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Around from "./Pages/Around/Around";
import Mypage from "./Pages/MyPage/Mypage";
import Detail from "./Pages/Detail/Detail";
import Write from "./Pages/Write/Write";
import Mini from "@karrotmarket/mini";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  RegionId,
  PlaceToSave,
  ToastMessage,
  DetailId,
  ViewerInfo,
} from "./Shared/atom";
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ClosePage from "./Pages/ClosePage";
import Select from "./Pages/Onboarding/Select";
import Select2 from "./Pages/Onboarding2/Select";
import Analytics from "react-router-ga";
import { Close, LogoInactive } from "./assets";
import styled, { keyframes } from "styled-components";
import { flexCenter, theme } from "./styles/theme";
import Header from "./Components/Header";
import SaveModal from "./Components/PlaceCard/SaveModal";
import { regions } from "./utils/const";
import { useGetRegion } from "./api/region";
import { getLogin } from "./api/user";
import { Mixpanel } from "./utils/mixpanel";
import Finish from "./Pages/Onboarding/Finish";
import OnboardingWrite from "./Pages/Onboarding/Write";

dayjs.locale("ko");

export const mini = new Mini();

const preload = new URLSearchParams(window.location.search).get("preload");
let regionIdFromParmas =
  new URLSearchParams(window.location.search).get("region_id") ??
  "6530459d189b";
// 교보타워일 경우 서초동으로
if (regionIdFromParmas === "2b6112932ec1") regionIdFromParmas = "471abc99b378";
// 로컬에서는 역삼1동일 경우 서초동으로
if (process.env.NODE_ENV === "development") {
  if (regionIdFromParmas === "6530459d189b") {
    regionIdFromParmas = "471abc99b378";
  }
}
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [regionId, setRegionId] = useRecoilState(RegionId);
  const setViewerInfo = useSetRecoilState(ViewerInfo);

  const { data: regionName } = useGetRegion(regionIdFromParmas);

  useEffect(() => {
    setRegionId(regionIdFromParmas);

    const getViewerInfo = async (code: string, regionId: string) => {
      const data = await getLogin(code, regionId);
      setViewerInfo({
        userId: data.userId,
        userName: data.userName,
        regionName: data.regionName,
        profileImageUrl: data.profileImageUrl,
      });
      localStorage.setItem("token", data.token);
      Mixpanel.identify(data.userId.toString());
    };

    if (code) {
      Mixpanel.track("로그인 - 기존 유저");
      getViewerInfo(code, regionIdFromParmas);
    }

    if (process.env.NODE_ENV === "development") {
      if (!localStorage.getItem("token")) {
        // localStorage.setItem("token", "isLogined");
      } else {
        setViewerInfo({
          userId: 1,
          userName: "단민",
          regionName: "역삼1동",
          profileImageUrl: "",
        });
      }
    }
  }, []);

  const isSaveModalOpened = useRecoilValue(PlaceToSave).isModalOpened;
  const [toastMessage, setToastMessage] = useRecoilState(ToastMessage);
  const [detailId, setDetailId] = useRecoilState(DetailId);

  // 로그인 및 내 정보 저장
  // const [viewerInfo, setViewerInfo] = useRecoilState(ViewerInfo);
  // const getViewerInfo = useCallback(async (code: string, regionId: string) => {
  //   const data = await getLogin(code, regionId);
  //   setViewerInfo({
  //     userId: data.userId,
  //     userName: data.userName,
  //     regionName: data.regionName,
  //     profileImageUrl: data.profileImageUrl,
  //   });
  //   localStorage.setItem("token", data.token);
  //   Mixpanel.identify(data.userId.toString());
  // }, []);

  // useEffect(() => {
  // if (process.env.NODE_ENV === "development") {
  //   setViewerInfo({
  //     userId: 1,
  //     userName: "단민",
  //     regionName: "역삼1동",
  //     profileImageUrl: "",
  //   });
  //   setRegionId("6530459d189b");
  //   // setRegionId("471abc99b378");
  // } else if (!preload) {
  //   setRegionId(regionId as string);
  //   if (code) {
  //     Mixpanel.track("로그인 - 기존 유저");
  //     getViewerInfo(code, regionId as string);
  //   } else {
  //     mini.startPreset({
  //       preset: process.env.REACT_APP_LOGIN as string,
  //       params: {
  //         appId: process.env.REACT_APP_APP_ID as string,
  //       },
  //       onSuccess: function (result) {
  //         if (result && result.code) {
  //           Mixpanel.track("로그인 - 새로운 유저");
  //           getViewerInfo(result.code, regionId as string);
  //         }
  //       },
  //     });
  //   }
  // }
  // }, []);

  useEffect(() => {
    if (toastMessage.isToastShown) {
      setTimeout(() => {
        setToastMessage({
          isToastShown: false,
          message: "",
        });
      }, 1000);
    }
  }, [toastMessage.isToastShown]);

  // 미오픈 지역
  if (
    !regions.find((region) => region === regionId) &&
    process.env.NODE_ENV !== "development" &&
    !preload
  ) {
    return (
      <Wrapper>
        <Header>
          <Close onClick={() => mini.close()} className="left-icon" />
        </Header>
        <div className="center">
          <LogoInactive />
          <div>
            <span>{regionName && regionName}</span>
            {`의 당장모아는
오픈 준비 중이에요.`}
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Router>
      <div className="App">
        {/* {viewerInfo.userId ? ( */}
        {regionId && !preload && (
          <Analytics id="UA-211655411-1" debug>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/401" component={ClosePage} />
              <Route exact path="/detail/:postId/finish" component={Detail} />
              <Route exact path="/around" component={Around} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/write" component={Write} />
              <Route exact path="/onboarding" component={Select} />
              <Route
                exact
                path="/onboarding/write"
                component={OnboardingWrite}
              />
              <Route exact path="/onboarding/finish" component={Finish} />

              <Route exact path="/onboarding2" component={Select2} />

              <Route path="/edit/:postId" component={Write} />
            </Switch>
            {isSaveModalOpened && <SaveModal />}
            {toastMessage.isToastShown && (
              <Toast>
                <div />
                <div>{toastMessage.message}</div>
              </Toast>
            )}
            {detailId && (
              <Detail
                postId={detailId}
                close={() => {
                  setDetailId(null);
                }}
              />
            )}
          </Analytics>
        )}
        {/* ) : (
          !preload &&
          !code && (
            <Wrapper onClick={() => mini.close()}>
              <Header>
                <Close onClick={() => mini.close()} className="left-icon" />
              </Header>
              <Loading1 />
              <div className="center">
                <Loading2 />
              </div>
            </Wrapper>
          )
        )} */}
      </div>
    </Router>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: 5rem;
  box-sizing: border-box;
  .center {
    ${flexCenter};
    flex-direction: column;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
    & > div {
      margin-top: 2.2rem;
      font-weight: bold;
      font-size: 1.9rem;
      line-height: 150%;
      text-align: center;
      letter-spacing: -2%;
      white-space: pre-line;
      span {
        color: ${theme.color.orange};
      }
    }
  }
`;

const opacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Toast = styled.div`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
  bottom: 2.8rem;
  z-index: 1000;
  animation: ${opacityAnimation} 0.25s linear;

  & > div:nth-child(1) {
    width: 100%;
    background-color: #000;
    opacity: 0.7;
    border-radius: 0.8rem;
    height: 4.4rem;
  }
  & > div:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    width: 100%;
    ${flexCenter};
    height: 4.4rem;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 135%;
  }
`;

export default App;
