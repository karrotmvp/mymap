import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import MainSlide from "./MainSlide";
import MapView, { Pin } from "../../Components/MapView";
import PinSlider from "../../Components/PinSlider/PinSlider";
import { Back, Close } from "../../assets";
import { FeedType, PinType } from "../../Shared/type";
import { getFeedPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { RegionId } from "../../Shared/atom";

const Main = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const regionId = useRecoilValue(RegionId);
  const [feedPosts, setFeedPosts] = useState<FeedType | null>(null);

  const getFeed = useCallback(async () => {
    const data = await getFeedPosts(regionId);
    console.log(data);
    setFeedPosts(data);
  }, [regionId]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  const [pins, setPins] = useState<PinType[] | []>([]);
  const [feedPins, setfeedPins] = useState<Pin[] | []>([]);
  useEffect(() => {
    console.log("feedPosts", feedPosts);
    const _pins: PinType[] = [];
    feedPosts?.posts.forEach((post) => {
      _pins.push(...post.pins);
    });
    setPins(_pins);

    const _feedPosts: Pin[] = [];
    feedPosts?.posts.forEach((post) =>
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
            <MainSlide
              {...{ isMapShown, isScrollUp }}
              posts={feedPosts?.posts ?? []}
            />
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
