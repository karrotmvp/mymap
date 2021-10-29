/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { getMyPosts, getSavedPosts } from "../api/post";
import Collection from "../Components/Collection";
import CreateButton from "../Components/CreateButton";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { PostType } from "../Shared/type";
import { gap, theme, WrapperWithHeaderFooter } from "../styles/theme";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";
import { MyInfo } from "../Shared/atom";

const Tab = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "my" | "others";
  setSelectedTab: Dispatch<SetStateAction<"my" | "others">>;
}) => {
  const handleSelectedTab = (tab: "my" | "others") => {
    setSelectedTab(tab);
  };

  return (
    <TabWrapper>
      <TabBtn
        $isSelected={selectedTab === "my"}
        onClick={() => handleSelectedTab("my")}
      >
        내 리스트
      </TabBtn>
      <TabBtn
        $isSelected={selectedTab === "others"}
        onClick={() => handleSelectedTab("others")}
      >
        저장한 리스트
      </TabBtn>
    </TabWrapper>
  );
};

const Mypage = () => {
  const [selectedTab, setSelectedTab] = useState<"my" | "others">("my");
  const [isScrollUp, setIsScrollUp] = useState(false);

  // 내 리스트
  const [myPosts, setMyPosts] = useState<PostType[] | []>([]);
  const [myPostsHasMore, setMyPostsHasMore] = useState(true);
  const [myPostPage, setMyPostPage] = useState(1);
  const handleMyPostNext = () => {
    setMyPostPage(myPostPage + 1);
  };
  useEffect(() => {
    const fetchMyPosts = async () => {
      const data = (
        await getMyPosts({
          page: myPostPage,
        })
      ).posts;
      if (data.length < 1) {
        setMyPostsHasMore(false);
        return;
      }
      setMyPosts([...myPosts, ...data]);
    };
    fetchMyPosts();
  }, [myPostPage]);

  // 저장한 리스트
  const [savedPosts, setSavedPosts] = useState<PostType[] | []>([]);
  const [savedPostsHasMore, setSavedPostsHasMore] = useState(true);
  const [savedPostPage, setSavedPostPage] = useState(1);
  const handleSavedPostNext = () => {
    setSavedPostPage(savedPostPage + 1);
  };
  useEffect(() => {
    const fetchSavedPosts = async () => {
      const data = (
        await getSavedPosts({
          page: savedPostPage,
        })
      ).posts;
      if (data.length < 1) {
        setSavedPostsHasMore(false);
        return;
      }
      setSavedPosts([...savedPosts, ...data]);
    };
    fetchSavedPosts();
  }, [savedPostPage]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setIsScrollUp(true);
      else setIsScrollUp(false);
    });
    return window.removeEventListener("scroll", () => {});
  }, []);

  const myInfo = useRecoilValue(MyInfo);

  return (
    <Wrapper>
      {isScrollUp && (
        <Header className="header-scroll" title="로컬큐레이터님" />
      )}

      <Profile>
        <div className="photo" />
        <div className="user">
          <div className="name">{myInfo.userName}</div>
          <div className="place">논현동</div>
        </div>
      </Profile>

      <Tab {...{ selectedTab, setSelectedTab }} />

      <div className="collections">
        {selectedTab === "my" ? (
          <InfiniteScroll
            dataLength={myPosts.length}
            next={handleMyPostNext}
            style={{ fontSize: 0 }}
            hasMore={myPostsHasMore}
            loader={<div />}
          >
            {myPosts?.map((post, i) => (
              <Collection key={i} {...post} />
            ))}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            dataLength={savedPosts.length}
            next={handleSavedPostNext}
            style={{ fontSize: 0 }}
            hasMore={savedPostsHasMore}
            loader={<div />}
          >
            {savedPosts?.map((post, i) => (
              <Collection key={i} {...post} />
            ))}
          </InfiniteScroll>
        )}
      </div>

      <CreateButton />

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeaderFooter};
  .collections {
    margin-top: 0.4rem;
    padding-bottom: 8.6rem;
    & > div > div > div:not(:first-child) {
      border-top: 0.6rem solid ${theme.color.gray1_5};
    }
  }
`;

const Profile = styled.div`
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
  }
  .user {
    margin-left: 1.2rem;
    .name {
      font-size: 1.8rem;
      line-height: 115%;
    }
    .place {
      font-size: 1.5rem;
      line-height: 115%;
      margin-top: 0.7rem;
    }
  }
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2.5rem 1.6rem;
  box-sizing: border-box;
  ${gap("0.5rem")}
  position: sticky;
  top: 4.9rem;
  background-color: #fff;
`;

const TabBtn = styled.div<{ $isSelected: boolean }>`
  font-size: 1.5rem;
  line-height: 120%;
  padding: 1rem 1.2rem;
  border-radius: 3rem;
  color: ${({ $isSelected }) =>
    $isSelected ? theme.color.white : theme.color.gray6};
  font-weight: ${({ $isSelected }) => $isSelected && "bold"};
  background-color: ${({ $isSelected }) => $isSelected && theme.color.orange};
`;

export default Mypage;
