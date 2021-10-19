import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import MainSlide from "./MainSlide";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider/PinSlider";
import { Back, Close } from "../../assets";
import { FeedType, PinType, PostType } from "../../Shared/type";
import { getFeedPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { RegionId } from "../../Shared/atom";
import infiniteScroll from "../../utils/infiniteScroll";
// import InfiniteScroll from "react-infinite-scroll-component";

const Main = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const regionId = useRecoilValue(RegionId);
  const [feedPosts, setFeedPosts] = useState<PostType[] | []>([]);

  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    setStartIdx(feedPosts[0]?.postId);
    setEndIdx(feedPosts[feedPosts.length - 1]?.postId);
  };

  const getFeedPostsCallback = useCallback(async () => {
    const data = (
      await getFeedPosts(regionId, {
        start: startIdx,
        end: endIdx,
      })
    ).posts;
    console.log(data);
    if (data.length < 1) {
      setHasMore(false);
      return;
    }

    setIsEnd(false);
    setFeedPosts([...feedPosts, ...data]);
  }, []);

  useEffect(() => {
    getFeedPostsCallback();
  }, []);

  // infinite scroll

  // const handleFetch = async () => {
  //

  //   setIsLoading(true);

  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   handleFetch();
  //   window.addEventListener("scroll", () => {
  //     !isEnd && !isLoading && infiniteScroll(handleFetch);
  //   });
  // }, []);

  const [pins, setPins] = useState<PinType[] | []>([]);
  const [feedPins, setfeedPins] = useState<Pin[] | []>([]);
  useEffect(() => {
    console.log("feedPosts", feedPosts);
    const _pins: PinType[] = [];
    feedPosts?.forEach((post) => {
      _pins.push(...post.pins);
    });
    setPins(_pins);

    const _feedPosts: Pin[] = [];
    feedPosts?.forEach((post) =>
      post.pins.forEach((pin) => {
        _feedPosts.push({
          id: pin.pinId,
          latitude: pin.place.coordinates.latitude,
          longitude: pin.place.coordinates.longitude,
        });
      })
    );
    setfeedPins(_feedPosts);
  }, [feedPosts]);

  useEffect(() => {
    console.log("feedPins", feedPins);
  }, [feedPins]);

  // 핀 선택
  const [isPinSelected, setIsPinSelected] = useState(false);
  const handleSelectPin = (pin: Pin) => {
    console.log(pin);
    setIsPinSelected(true);
  };

  // scroll up
  const [isScrollUp, setIsScrollUp] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight - window.scrollY < 380) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
    });
    return window.removeEventListener("scroll", () => {});
  }, []);

  return (
    <Wrapper>
      <Header title={!isPinSelected ? "서비스명" : ""} isGradient={!isScrollUp}>
        {isPinSelected ? (
          <Back className="left-icon" onClick={() => setIsPinSelected(false)} />
        ) : (
          <Close className="left-icon" />
        )}
      </Header>

      <div onClick={() => setIsMapShown(true)}>
        <MapView
          height="100vh"
          pins={feedPins}
          handleSelectPin={handleSelectPin}
        />
      </div>

      {!isPinSelected ? (
        <>
          <div onClick={() => setIsMapShown(false)}>
            {/* <InfiniteScroll
              dataLength={feedPosts.length}
              next={fetchMoreData}
              style={{ fontSize: 0 }}
              // inverse={true} //
              hasMore={hasMore}
              loader={<div />}
            > */}
            <MainSlide {...{ isMapShown, isScrollUp }} posts={feedPosts} />
            {/* </InfiniteScroll> */}
          </div>
          <Footer />
        </>
      ) : (
        <PinSlider pins={pins} isRecommend />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Main;
