import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import MainSlide from "./MainSlide";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider";
import { Back, Close, LogoTypo } from "../../assets";
import { PlaceType, PostType } from "../../Shared/type";
import { getFeedPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { RegionId } from "../../Shared/atom";
import InfiniteScroll from "react-infinite-scroll-component";
import { WrapperWithFooter } from "../../styles/theme";
import { mini } from "../../App";

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
      if (!data) {
        return;
      }
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

  const [pins, setPins] = useState<PlaceType[] | []>([]);
  const [feedPins, setfeedPins] = useState<Pin[] | []>([]);
  useEffect(() => {
    const _pins: PlaceType[] = [];
    feedPosts?.forEach((post) => {
      post.pins.forEach((pin) => {
        if (!_pins.find((p) => p.placeId === pin.place.placeId)) {
          _pins.push(pin.place);
        }
      });
    });
    setPins(_pins);

    const _feedPosts: Pin[] = [];
    feedPosts?.forEach((post) =>
      post.pins.forEach((pin) => {
        if (!_feedPosts.find((p) => p.placeId === pin.place.placeId)) {
          _feedPosts.push({
            id: pin.pinId,
            placeId: pin.place.placeId,
            name: pin.place.name,
            latitude: pin.place.coordinates.latitude,
            longitude: pin.place.coordinates.longitude,
          });
        }
      })
    );
    setfeedPins(_feedPosts);
  }, [feedPosts]);

  // 핀 선택
  const [isPinSelected, setIsPinSelected] = useState(false);
  const handleSelectPin = (pin: Pin, idx: number) => {
    setIsPinSelected(true);
    setCenter({
      lat: pin.latitude,
      lng: pin.longitude,
    });
    setCurrent(idx);
  };

  // 카드 이동
  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    setCenter({
      lat: pins[current]?.coordinates.latitude,
      lng: pins[current]?.coordinates.longitude,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // scroll up
  const [isScrollUp, setIsScrollUp] = useState(false);
  useEffect(() => {
    if (!isPinSelected) {
      const targetElement = document.querySelector("#main-scroll")!;

      const onScroll = () => {
        setIsScrollUp(window.innerHeight - targetElement.scrollTop < 450);
        setIsMapShown(targetElement.scrollTop <= 0);
      };
      targetElement.addEventListener("scroll", onScroll);
      return () => targetElement.removeEventListener("scroll", onScroll);
    }
  }, [isPinSelected]);

  const handleBack = () => {
    setCenter({ lat: 0, lng: 0 });
    setIsPinSelected(false);
    setCurrent(-1);
  };

  return (
    <Wrapper>
      <Header isTransparent={!isScrollUp}>
        {isScrollUp ? <LogoTypo /> : <div />}
        {isPinSelected ? (
          <Back className="left-icon" onClick={handleBack} />
        ) : (
          <Close className="left-icon" onClick={() => mini.close()} />
        )}
      </Header>

      <div onClick={() => setIsMapShown(true)}>
        <MapView
          mapId="main"
          height="100vh"
          pins={feedPins}
          handleSelectPin={handleSelectPin}
          center={center!}
        />
      </div>

      {!isPinSelected ? (
        <div>
          <MainScroll
            id="main-scroll"
            $isMapShown={isMapShown}
            onClick={() => setIsMapShown(true)}
          >
            <InfiniteScroll
              dataLength={feedPosts.length}
              next={handleNext}
              hasMore={hasMore}
              loader={<div />}
              scrollableTarget="main-scroll"
            >
              <MainSlide {...{ isScrollUp, setIsMapShown }} posts={feedPosts} />
            </InfiniteScroll>
          </MainScroll>
          <Footer />
        </div>
      ) : (
        current > -1 && (
          <PinSlider
            placeCardType="map"
            {...{ pins, current, setCurrent, setCenter }}
          />
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const MainScroll = styled.div<{ $isMapShown: boolean }>`
  ${WrapperWithFooter};
  transition: 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  margin-top: ${({ $isMapShown }) => ($isMapShown ? "calc(100vh - 11rem)" : 0)};
  padding-top: ${({ $isMapShown }) => ($isMapShown ? 0 : "50vh")};
`;

export default Main;
