/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import Collection from "../../Components/Collection";
import CreateButton from "../../Components/CreateButton";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { PostType } from "../../Shared/type";
import {
  flexCenter,
  gap,
  theme,
  WrapperWithHeaderFooter,
} from "../../styles/theme";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";
import { ViewerInfo } from "../../Shared/atom";
import { Close, LogoInactive, More, Thumbnail } from "../../assets";
import { mini } from "../../App";
import OrangePlaceBox from "../../Components/OrangePlaceBox";
import MyPlaces from "./MyPlaces";
import { useGetMyPosts, useGetSavedPosts } from "../../api/post";
import { Mixpanel } from "../../utils/mixpanel";
import { useGetSavedPlaces } from "../../api/savedPlaces";

const Tab = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "my" | "others";
  setSelectedTab: Dispatch<SetStateAction<"my" | "others">>;
}) => {
  const handleSelectedTab = (tab: "my" | "others") => {
    if (tab !== selectedTab) {
      Mixpanel.track(
        `나의테마 - ${tab === "my" ? "내가 만든 테마" : "저장한 테마"}`
      );
    }
    setSelectedTab(tab);
  };

  return (
    <TabWrapper>
      <TabBtn
        $isSelected={selectedTab === "my"}
        onClick={() => handleSelectedTab("my")}
      >
        내가 만든 테마
      </TabBtn>
      <TabBtn
        $isSelected={selectedTab === "others"}
        onClick={() => handleSelectedTab("others")}
      >
        저장한 테마
      </TabBtn>
    </TabWrapper>
  );
};

const Mypage = () => {
  const viewerInfo = useRecoilValue(ViewerInfo);

  const [selectedTab, setSelectedTab] = useState<"my" | "others">("my");
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isMyPlacesOpened, setIsMyPlacesOpened] = useState(false);

  const [myPosts, setMyPosts] = useState<PostType[] | []>([]);
  const [myPostsHasMore, setMyPostsHasMore] = useState(true);
  const [myPostPage, setMyPostPage] = useState(1);

  const [savedPosts, setSavedPosts] = useState<PostType[] | []>([]);
  const [savedPostsHasMore, setSavedPostsHasMore] = useState(true);
  const [savedPostPage, setSavedPostPage] = useState(1);

  const { data: myPlaces } = useGetSavedPlaces();
  const {
    status: myPostsResultStatus,
    data: myPostsResult,
    refetch: refetchMyPostsResult,
  } = useGetMyPosts({
    page: myPostPage,
    perPage: 10,
  });
  const {
    status: savedPostsResultStatus,
    data: savedPostsResult,
    refetch: refetchSavedPostsResult,
  } = useGetSavedPosts({
    page: savedPostPage,
  });

  const handleMyPostNext = () => {
    setMyPostPage(myPostPage + 1);
  };
  const handleSavedPostNext = () => {
    setSavedPostPage(savedPostPage + 1);
  };

  useEffect(() => {
    if (myPostsResult) {
      if (myPostsResult.posts.length < 1) {
        setMyPostsHasMore(false);
        return;
      }
      setMyPosts([...myPosts, ...myPostsResult.posts]);
    }
  }, [myPostsResult]);
  useEffect(() => {
    if (savedPostsResult) {
      if (savedPostsResult.posts.length < 1) {
        setSavedPostsHasMore(false);
        return;
      }
      setSavedPosts([...savedPosts, ...savedPostsResult.posts]);
    }
  }, [savedPostsResult]);

  useEffect(() => {
    refetchMyPostsResult();
  }, [myPostPage]);
  useEffect(() => {
    refetchSavedPostsResult();
  }, [savedPostPage]);

  useEffect(() => {
    Mixpanel.track("나의테마 - 진입");

    const targetElement = document.querySelector("#mypage-scroll")!;

    const onScroll = () => {
      setIsScrollUp(targetElement.scrollTop > 100);
    };
    targetElement.addEventListener("scroll", onScroll);
    return () => targetElement.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Wrapper id="mypage-scroll" {...{ isScrollUp }}>
      {isScrollUp && (
        <Header title={`${viewerInfo.userName}님`}>
          <Close className="close-btn" onClick={() => mini.close()} />
        </Header>
      )}

      <Profile>
        <Close className="close-btn" onClick={() => mini.close()} />

        {viewerInfo.profileImageUrl ? (
          <img
            className="photo"
            alt="profile"
            src={viewerInfo.profileImageUrl}
          />
        ) : (
          <Thumbnail className="photo" />
        )}
        <div className="user">
          <div className="place">{viewerInfo.regionName} 주민</div>
          <div className="name">{viewerInfo.userName}</div>
        </div>
      </Profile>

      {myPlaces && myPlaces.length > 0 && (
        <div className="all-places" onClick={() => setIsMyPlacesOpened(true)}>
          <div className="title-wrapper">
            <div style={{ width: "100%" }}>
              <div className="title">
                내가 저장한 <span>{myPlaces.length}</span>개 장소예요
              </div>
            </div>
            <More className="more-icon" />
          </div>
          <div className="places">
            {myPlaces.map((place) => (
              <div key={place.placeId} className="place">
                <OrangePlaceBox {...place} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Tab {...{ selectedTab, setSelectedTab }} />

      <div id="collections">
        {selectedTab === "my" ? (
          myPosts.length > 0 ? (
            <InfiniteScroll
              dataLength={myPosts.length}
              next={handleMyPostNext}
              hasMore={myPostsHasMore}
              loader={<div />}
              scrollableTarget="mypage-scroll"
            >
              {myPosts.map((post) => (
                <Collection key={post.postId} {...{ post }} />
              ))}
            </InfiniteScroll>
          ) : (
            myPostsResultStatus !== "loading" && (
              <div className="empty">
                <LogoInactive />
                <div>{`아직 만든 테마가 없어요.
나만의 테마를 만들어볼까요?`}</div>
              </div>
            )
          )
        ) : savedPosts.length > 0 ? (
          <InfiniteScroll
            dataLength={savedPosts.length}
            next={handleSavedPostNext}
            hasMore={savedPostsHasMore}
            loader={<div />}
            scrollableTarget="mypage-scroll"
          >
            {savedPosts
              .filter((post) => post.saved !== false)
              .map((post, i) => (
                <Collection key={i} {...{ post, savedPosts, setSavedPosts }} />
              ))}
          </InfiniteScroll>
        ) : (
          savedPostsResultStatus !== "loading" && (
            <div className="empty">
              <LogoInactive />
              <div>{`아직 저장한 테마가 없어요.
추천 테마에서 이웃의 테마를 구경해 봐요!`}</div>
            </div>
          )
        )}
      </div>

      <CreateButton targetId="mypage-scroll" />

      <Footer />

      {isMyPlacesOpened && myPlaces && (
        <MyPlaces places={myPlaces} close={() => setIsMyPlacesOpened(false)} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isScrollUp: boolean }>`
  ${WrapperWithHeaderFooter};
  overflow-y: scroll;
  #collections {
    position: relative;
    padding-bottom: 8.6rem;
    & > div > div > div:not(:first-child) {
      border-top: 0.1rem solid ${theme.color.gray1_7};
    }
  }
  .all-places {
    width: 100%;
    padding: 3.6rem 0;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    border-bottom: 1.6rem solid ${theme.color.gray1_5};
    .title-wrapper {
      padding-left: 2rem;
      width: 100%;
      ${flexCenter};
      justify-content: space-between;

      .title {
        max-width: 100%;
        font-size: 1.6rem;
        line-height: 120%;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 5rem;
        box-sizing: border-box;
        overflow: hidden;
        span {
          color: ${theme.color.orange};
        }
      }
      .more-icon {
        position: absolute;
        right: 0;
        fill: ${theme.color.gray6};
      }
    }

    .places {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      margin-top: 1.6rem;
      padding-left: 2rem;
      box-sizing: border-box;
      ${gap("0.8rem")};
      .place {
        &:last-child {
          padding-right: 2rem;
        }
      }
    }
  }
  .close-btn {
    position: absolute;
    top: 0.1rem;
    left: 0;
    fill: ${({ theme, isScrollUp }) =>
      isScrollUp ? theme.color.gray7 : theme.color.white};
    z-index: 100;
  }
  .empty {
    padding-top: 5rem;
    box-sizing: border-box;
    ${flexCenter};
    flex-direction: column;
    text-align: center;
    white-space: pre-line;
    & > div {
      margin-top: 1.4rem;
      color: ${theme.color.gray5};
      line-height: 160%;
      font-weight: 500;
      font-size: 1.4rem;
    }
  }
`;

const Profile = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  background-color: ${theme.color.orange};
  margin-top: -5rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  padding-top: 4rem;
  box-sizing: border-box;
  color: ${theme.color.white};

  .photo {
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 50%;
    border: 0.3rem solid ${theme.color.white};
    background-color: ${theme.color.gray4};
  }
  .user {
    margin-left: 2rem;
    .place {
      font-size: 1.3rem;
      line-height: 150%;
    }
    .name {
      font-size: 1.6rem;
      line-height: 150%;
      margin-top: 0.2rem;
    }
  }
`;

const TabWrapper = styled.div`
  ${flexCenter};
  width: 100%;
  padding: 0 2rem;
  padding-top: 1.9rem;
  box-sizing: border-box;
  ${gap("0.5rem")}
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
  border-bottom: 0.1rem solid ${theme.color.gray1_7};
`;

const TabBtn = styled.div<{ $isSelected: boolean }>`
  font-size: 1.5rem;
  width: 100%;
  line-height: 120%;
  padding: 1.7rem 2.9rem;
  text-align: center;
  color: ${({ $isSelected }) =>
    $isSelected ? theme.color.black : theme.color.gray6};
  border-bottom: ${({ $isSelected }) =>
    `0.2rem solid ${$isSelected ? theme.color.gray7 : theme.color.white}`};
  font-weight: ${({ $isSelected }) => $isSelected && "bold"};
`;

export default Mypage;
