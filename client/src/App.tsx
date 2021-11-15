/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Around from "./Pages/Around/Around";
import Mypage from "./Pages/MyPage/Mypage";
import Detail from "./Pages/Detail/Detail";
import Write from "./Pages/Write/Write";
import Mini from "@karrotmarket/mini";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ViewerInfo, RegionId, PlaceToSave, ToastMessage } from "./Shared/atom";
import { useCallback, useEffect } from "react";
import { getLogin } from "./api/user";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ClosePage from "./Pages/ClosePage";
import Onboarding from "./Pages/Onboarding";
import Analytics from "react-router-ga";
import { Mixpanel } from "./utils/mixpanel";
import { Close, Loading1, Loading2 } from "./assets";
import styled from "styled-components";
import { flexCenter } from "./styles/theme";
import SearchPlace from "./Pages/Write/SearchPlace";
import Header from "./Components/Header";
import mixpanel from "mixpanel-browser";
import SaveModal from "./Components/PlaceCard/SaveModal";

dayjs.locale("ko");

export const mini = new Mini();

const preload = new URLSearchParams(window.location.search).get("preload");
const regionId = new URLSearchParams(window.location.search).get("region_id");
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const setRegionId = useSetRecoilState(RegionId);

  const isSaveModalOpened = useRecoilValue(PlaceToSave).isModalOpened;
  const [toastMessage, setToastMessage] = useRecoilState(ToastMessage);

  // 로그인 및 내 정보 저장
  const [viewerInfo, setViewerInfo] = useRecoilState(ViewerInfo);
  const getMyInfo = useCallback(async (code: string, regionId: string) => {
    const data = await getLogin(code, regionId);
    setViewerInfo({
      userId: data.userId,
      userName: data.userName,
      regionName: data.regionName,
      profileImageUrl: data.profileImageUrl,
    });
    localStorage.setItem("token", data.token);
    Mixpanel.identify(data.userId.toString());
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setViewerInfo({
        userId: 1,
        userName: "team1test",
        regionName: "역삼 1동",
        profileImageUrl: "",
      });
      setRegionId("6530459d189b");
    } else if (!preload) {
      setRegionId(regionId as string);
      if (code) {
        mixpanel.track("기존 유저 로그인");
        getMyInfo(code, regionId as string);
      } else {
        mini.startPreset({
          preset: process.env.REACT_APP_LOGIN as string,
          params: {
            appId: process.env.REACT_APP_APP_ID as string,
          },
          onSuccess: function (result) {
            if (result && result.code) {
              mixpanel.track("새로운 유저 로그인");
              getMyInfo(result.code, regionId as string);
            }
          },
        });
      }
    }
  }, []);

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

  return (
    <Router>
      <div className="App">
        {viewerInfo.userId ? (
          <Analytics id="UA-211655411-1" debug>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/401" component={ClosePage} />
              <Route path="/detail/:postId" component={Detail} />
              <Route exact path="/around" component={Around} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/write" component={Write} />
              <Route exact path="/onboarding" component={Onboarding} />
              <Route exact path="/onboarding/write" component={Write} />
              <Route exact path="/asdf" component={SearchPlace} />
              <Route path="/edit/:postId" component={Write} />
            </Switch>
            {isSaveModalOpened && <SaveModal />}
            {toastMessage.isToastShown && (
              <Toast>
                <div />
                <div>{toastMessage.message}</div>
              </Toast>
            )}
          </Analytics>
        ) : (
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
        )}
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
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
  }
`;

const Toast = styled.div`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
  bottom: 2.8rem;
  z-index: 1000;

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
