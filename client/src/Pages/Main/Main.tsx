import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import MainSlide from "./MainSlide";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider";
import { Back, Close } from "../../assets";
import { PinType, PostType } from "../../Shared/type";
import { getFeedPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { RegionId } from "../../Shared/atom";
import InfiniteScroll from "react-infinite-scroll-component";

const Main = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const regionId = useRecoilValue(RegionId);
  const [feedPosts, setFeedPosts] = useState<PostType[] | []>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.3595704,
    lng: 127.105399,
  });

  // infinite scroll
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const handleNext = () => {
    setStartIdx(feedPosts[0]?.postId);
    setEndIdx(feedPosts[feedPosts.length - 1]?.postId);
  };
  useEffect(() => {
    const fetchFeedPosts = async () => {
      const data = await getFeedPosts(regionId, {
        start: startIdx,
        end: endIdx,
      });
      if (data.posts.length < 1) {
        setHasMore(false);
        return;
      }
      setFeedPosts([...feedPosts, ...data.posts]);
      setCenter({
        lat: data.coordinates.latitude,
        lng: data.coordinates.longitude,
      });
    };
    fetchFeedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIdx, endIdx, regionId]);

  const [pins, setPins] = useState<PinType[] | []>([]);
  const [feedPins, setfeedPins] = useState<Pin[] | []>([]);
  useEffect(() => {
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

  // 핀 선택
  const [isPinSelected, setIsPinSelected] = useState(false);
  const handleSelectPin = (pin: Pin, idx: number) => {
    setIsPinSelected(true);
    setCenter &&
      setCenter({
        lat: pin.latitude,
        lng: pin.longitude,
      });
    setCurrent(idx);
  };

  // 카드 이동
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCenter({
      lat: pins[current]?.place.coordinates.latitude,
      lng: pins[current]?.place.coordinates.longitude,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

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
      <Header isTransparent={!isScrollUp}>
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
          center={center!}
        />
      </div>

      {!isPinSelected ? (
        <>
          <div onClick={() => setIsMapShown(false)}>
            <InfiniteScroll
              dataLength={feedPosts.length}
              next={handleNext}
              style={{ fontSize: 0 }}
              hasMore={hasMore}
              loader={<div />}
            >
              <MainSlide {...{ isMapShown, isScrollUp }} posts={feedPosts} />
            </InfiniteScroll>
          </div>
          <Footer />
        </>
      ) : (
        <PinSlider isRecommend {...{ pins, current, setCurrent, setCenter }} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Main;
