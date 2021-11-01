import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getPost, postPost, putPost } from "../../api/post";
import { Close, Plus } from "../../assets";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import useInput from "../../Hooks/useInput";
import { RegionId } from "../../Shared/atom";
import { PlaceType } from "../../Shared/type";
import {
  Button,
  flexCenter,
  gap,
  input,
  theme,
  Title,
  WrapperWithHeader,
} from "../../styles/theme";
import { Mixpanel } from "../../utils/mixpanel";
import OnboardAlert from "./Onboard/OnboardAlert";
import OnboardSubmit from "./Onboard/OnboardSubmit";
import SearchPlace from "./SearchPlace";

const Write = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  const { isExact: isWrite } =
    useRouteMatch({
      path: "/write",
    }) ?? {};
  const { isExact: isOnboarding } =
    useRouteMatch({
      path: "/onboarding/write",
    }) ?? {};

  // SearchPlace
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const [isShare, setIsShare] = useState<boolean>(true);
  const [places, setPlaces] = useState<PlaceType[] | []>([]);

  // remove place
  const handleRemovePlace = (place: PlaceType) => {
    const idx = places.findIndex((p) => p.placeId === place.placeId);
    const newPlaces = [
      ...places.slice(0, idx),
      ...places.slice(idx + 1, places.length),
    ];
    setPlaces(newPlaces);
  };

  // input
  const inputVal = useInput("");
  const [isInputOver, setIsInputOver] = useState(false);
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // textarea autosize
    e.target.style.height = "5rem";
    e.target.style.height = e.target.scrollHeight + "px";

    inputVal.setValue(e.target.value);
    if (e.target.value.length > 30) {
      setIsInputOver(true);
    } else {
      setIsInputOver(false);
    }
  };

  // textarea
  const textareaVal = useInput("");
  const [isTextareaOver, setIsTextareaOver] = useState(false);
  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // textarea autosize
    e.target.style.height = "15rem";
    e.target.style.height = e.target.scrollHeight + "px";

    textareaVal.setValue(e.target.value);
    if (e.target.value.length > 100) {
      setIsTextareaOver(true);
    } else {
      setIsTextareaOver(false);
    }
  };

  // 수정
  const postId = useParams<{ postId: string }>().postId ?? null;

  useEffect(() => {
    if (!isWrite && !isOnboarding) {
      const fetchPost = async () => {
        const data = await getPost(String(postId));
        inputVal.setValue(data.title);
        textareaVal.setValue(data.contents);
        setIsShare(data.share);
        setPlaces(data.pins.map((pin) => pin.place));
      };
      fetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 완료
  const [isSubmittable, setIsSubmittable] = useState(false);
  useEffect(() => {
    if (
      inputVal.value &&
      !isInputOver &&
      !isTextareaOver &&
      isShare !== null &&
      places.length > 0
    ) {
      setIsSubmittable(true);
    }
  }, [inputVal.value, isInputOver, isTextareaOver, isShare, places]);

  const [isEditAlertOpened, setIsEditAlertOpened] = useState(false);
  const [isOnboardOutAlertOpened, setIsOnboardOutAlertOpened] = useState(false);
  const [isOnboardSubmitAlertOpened, setIsOnboardSubmitAlertOpened] =
    useState(false);

  // close
  const handleClose = () => {
    if (isWrite) window.history.back();
    else if (isOnboarding) {
      Mixpanel.track("온보딩 후 글작성에서 나가려함");
      setIsOnboardOutAlertOpened(true);
    } else setIsEditAlertOpened(true);
  };

  const regionId = useRecoilValue(RegionId);

  const handleSubmit = async () => {
    const body = {
      title: inputVal.value,
      contents: textareaVal.value,
      regionId,
      share: isShare as boolean,
      pins: places.map((place) => {
        return {
          placeId: place.placeId,
          latitude: place.coordinates.latitude,
          longitude: place.coordinates.longitude,
        };
      }),
    };
    if (isWrite || isOnboarding) {
      const data = await postPost(body);
      if (data.postId) {
        if (isWrite) history.push(`/detail/${data.postId}/finish`);
        else if (isOnboarding) setIsOnboardSubmitAlertOpened(true);
      }
    } else {
      await putPost(postId!, body);
      history.push(`/detail/${postId}/finish`);
    }
  };

  return (
    <Wrapper>
      <Header
        title={isWrite || isOnboarding ? "테마지도 만들기" : "테마지도 수정"}
      >
        <Close onClick={handleClose} className="left-icon" />
      </Header>
      <Title>{`모아보고 싶은
나만의 장소를 저장해요`}</Title>

      <div className="subtitle" style={{ marginTop: "3.1rem" }}>
        테마지도의 제목을 입력해 주세요.
      </div>
      <div className="name-input">
        <Input
          $error={isInputOver}
          maxLength={30}
          onInput={handleInput}
          placeholder="예) 나만 알고있던 혼밥하기 좋은 식당"
          value={inputVal.value}
        />
        {isInputOver && (
          <div className="error">공백을 포함해 최대 30글자로 작성해주세요</div>
        )}
      </div>

      <div className="subtitle">지도에 저장할 장소를 추가해주세요.</div>
      <div className="explanation">최대 10개 장소를 추가할 수 있어요.</div>

      {/* 추가된 장소들 */}
      {places?.map((place) => (
        <AddedList
          key={place.placeId}
          className="added-list"
          isImgExist={place.images.length > 0}
        >
          {place.images.length > 0 && (
            <img
              className="photo"
              alt="thumbnail"
              src={place.images[0].thumbnail}
            />
          )}
          <div className="">{place.name}</div>
          <Close onClick={() => handleRemovePlace(place)} className="del-btn" />
        </AddedList>
      ))}

      <div className="add-button" onClick={() => setIsSearchOpened(true)}>
        <Plus className="add-icon" />이 장소 추가하기
      </div>

      {isSearchOpened && (
        <SearchPlace
          {...{ setIsSearchOpened, places, setPlaces }}
          close={() => setIsSearchOpened(false)}
        />
      )}

      <div className="subtitle">
        테마지도에 대한 설명을 작성해주세요.<span>(선택)</span>
      </div>
      <div className="name-input">
        <Textarea
          $error={isTextareaOver}
          rows={2}
          maxLength={100}
          onInput={handleTextarea}
          placeholder="어떤 테마 장소들을 모았는지 설명해 주세요."
          value={textareaVal.value}
        />
        {isTextareaOver && (
          <div className="error">공백을 포함해 최대 100글자로 작성해주세요</div>
        )}
      </div>

      <div className="subtitle">동네 이웃에게 테마지도를 공개할까요?</div>
      <div className="explanation">
        지도를 공개하면 서로 더 많은 정보를 나눌 수 있어요.
      </div>
      <div className="select-buttons">
        <SelectBtn
          onClick={() => setIsShare(true)}
          $isSelected={isShare === true}
        >
          공개하기
        </SelectBtn>
        <SelectBtn
          onClick={() => setIsShare(false)}
          $isSelected={isShare === false}
        >
          나만보기
        </SelectBtn>
      </div>

      {isEditAlertOpened && (
        <Alert
          close={() => setIsEditAlertOpened(false)}
          title="수정한 내용이 저장되지 않았어요!"
          sub="수정한 내용을 저장할까요?"
        >
          <Button onClick={() => window.history.back()}>나가기</Button>
          <Button>저장하기</Button>
        </Alert>
      )}

      {isOnboardOutAlertOpened && <OnboardAlert />}
      {isOnboardSubmitAlertOpened && (
        <OnboardSubmit
          close={() => setIsOnboardSubmitAlertOpened(false)}
          {...{ handleSubmit }}
        />
      )}

      <div className="footer">
        <SubmitBtn
          onClick={() => {
            isSubmittable && handleSubmit();
          }}
          $disabled={!isSubmittable}
        >
          {isWrite || isOnboarding ? "작성 완료" : "수정 완료"}
        </SubmitBtn>
      </div>
    </Wrapper>
  );
};

const AddedList = styled.div<{ isImgExist: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  height: 5.2rem;
  border: 1px solid ${theme.color.gray3};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.2rem;
  margin-top: 1.2rem;
  padding: 0 0.6rem;
  padding-left: ${({ isImgExist }) => !isImgExist && "1.6rem"};

  .photo {
    min-width: 4rem;
    height: 4rem;
    border-radius: 0.8rem;
    background-color: lightgray;
    margin-right: 1rem;
  }
  .del-btn {
    margin-left: auto;
    fill: ${theme.color.gray4};
  }
`;

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding-top: 7.3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 13.2rem;
  overflow-y: scroll;
  .error {
    color: ${theme.color.red};
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 160%;
    padding-top: 0.2rem;
  }
  .name-input {
    margin-top: 1.2rem;
  }
  .add-button {
    ${flexCenter};
    position: relative;
    border-radius: 1rem;
    height: 5rem;
    border: 0.1rem dashed ${theme.color.orange};
    font-size: 1.4rem;
    line-height: 135%;
    font-weight: 500;
    margin-top: 1.2rem;
    color: ${theme.color.orange};
    .add-icon {
      position: absolute;
      top: 0;
      left: 0;
      fill: ${theme.color.orange};
    }
  }
  .subtitle {
    font-size: 1.4rem;
    line-height: 120%;
    font-weight: bold;
    margin-top: 3.4rem;
    color: ${theme.color.gray7};
    span {
      margin-left: 0.3rem;
      color: ${theme.color.gray5};
      font-weight: normal;
    }
  }
  .explanation {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    line-height: 160%;
    color: ${theme.color.gray6};
  }
  .select-buttons {
    width: 100%;
    display: flex;
    ${gap("0.8rem")};
    margin-top: 1.2rem;
    box-sizing: border-box;
  }
  .footer {
    position: fixed;
    width: 100%;
    height: 7.4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.color.white};
  }
`;

const SelectBtn = styled.div<{ $isSelected: boolean }>`
  ${flexCenter};
  padding: 1.4rem;
  border: 0.1rem solid
    ${({ $isSelected }) =>
      $isSelected ? theme.color.orange : theme.color.gray2};
  background: ${({ $isSelected }) => $isSelected && "rgba(255, 121, 100, 0.1)"};
  box-sizing: border-box;
  border-radius: 1rem;
  font-size: 1.4rem;
  line-height: 135%;
  width: 100%;
  font-weight: 500;
  color: ${({ $isSelected }) =>
    $isSelected ? theme.color.orange : theme.color.gray7};
`;

const SubmitBtn = styled(Button)<{ $disabled: boolean }>`
  margin: 1rem 2rem;
  background-color: ${({ $disabled }) =>
    $disabled ? theme.color.gray2 : theme.color.orange};
  color: ${({ $disabled }) =>
    $disabled ? theme.color.gray7 : theme.color.white};
`;

const Input = styled.textarea<{ $error?: boolean }>`
  ${input};
  height: 5.4rem;
  border: 0.1rem solid
    ${({ $error }) => (!$error ? theme.color.gray2 : theme.color.red)};
  background-color: ${theme.color.gray1};
  &:focus {
    border: 0.1rem solid
      ${({ $error }) => (!$error ? theme.color.gray4 : theme.color.red)};
  }
`;

const Textarea = styled.textarea<{ $error?: boolean }>`
  ${input};
  height: 14.8rem;
  border: 0.1rem solid
    ${({ $error }) => (!$error ? theme.color.gray2 : theme.color.red)};
  background-color: ${theme.color.gray1};
  &:focus {
    border: 0.1rem solid
      ${({ $error }) => (!$error ? theme.color.gray4 : theme.color.red)};
  }
`;

export default Write;