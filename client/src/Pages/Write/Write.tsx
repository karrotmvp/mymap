import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { postPost } from "../../api/post";
import { Close, Plus } from "../../assets";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import useInput from "../../Hooks/useInput";
import { Places, RegionId } from "../../Shared/atom";
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
import SearchPlace from "./SearchPlace";

const Write = () => {
  const isWrite = window.location.pathname.split("/")[1] === "write";

  // SearchPlace
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const [isShare, setIsShare] = useState<null | boolean>(null);
  const [places, setPlaces] = useRecoilState(Places);

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
    e.target.style.height = "5.2rem";
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

  // alert
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  // close
  const handleClose = () => {
    if (isWrite) window.history.back();
    else setIsAlertOpened(true);
  };

  const regionId = useRecoilValue(RegionId);
  const handleSubmit = async () => {
    const data = await postPost({
      title: inputVal.value,
      contents: textareaVal.value,
      regionId,
      share: isShare as boolean,
      pins: places.map((place) => {
        return {
          latitude: place.coordinates.latitude,
          longitude: place.coordinates.longitude,
        };
      }),
    });
    if (data.postId) window.location.href = `/detail/${data.postId}`;
  };

  return (
    <Wrapper>
      <Header title={isWrite ? "리스트 만들기" : "리스트 수정"}>
        <Close onClick={handleClose} className="left-icon" />
      </Header>
      <Title>{`모아보고 싶은
나만의 장소를 저장해요`}</Title>

      <div className="subtitle" style={{ marginTop: "3.1rem" }}>
        리스트 제목을 입력해 주세요.
      </div>
      <div className="name-input">
        <Input
          $error={isInputOver}
          maxLength={30}
          onInput={handleInput}
          placeholder="예) 나만 알고있던 혼밥하기 좋은 식당"
        />
      </div>

      <div className="subtitle">컬렉션에 저장할 장소를 추가해주세요.</div>
      <div className="explanation">최대 10개 장소를 추가할 수 있어요.</div>

      {/* 추가된 장소들 */}
      {places?.map((place) => (
        <div key={place.placeId} className="added-list">
          <div className="photo" />
          {place.name}
          <Close onClick={() => handleRemovePlace(place)} className="del-btn" />
        </div>
      ))}

      <div className="add-button" onClick={() => setIsSearchOpened(true)}>
        <Plus className="add-icon" />
        장소 추가
      </div>

      {isSearchOpened && (
        <SearchPlace
          {...{ setIsSearchOpened }}
          close={() => setIsSearchOpened(false)}
        />
      )}

      <div className="subtitle">
        리스트에 대한 설명을 작성해주세요.(선택 사항)
      </div>
      <div className="name-input">
        <Textarea
          $error={isTextareaOver}
          rows={2}
          maxLength={100}
          onInput={handleTextarea}
          placeholder="어떤 리스트인지 추가로 설명해 주세요."
        />
      </div>

      <div className="subtitle">동네 주민들에게 컬렉션을 공개할까요?</div>
      <div className="explanation">
        리스트를 공개하면 서로 더 많은 정보를 나눌 수 있어요.
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

      {/* 삭제 alert */}
      {isAlertOpened && (
        <Alert
          close={() => setIsAlertOpened(false)}
          title="수정한 내용이 저장되지 않았어요!"
          sub="수정한 내용을 저장할까요?"
        >
          <Button onClick={() => window.history.back()}>나가기</Button>
          <Button>저장하기</Button>
        </Alert>
      )}

      <div className="footer">
        <SubmitBtn
          onClick={() => {
            isSubmittable && handleSubmit();
          }}
          $disabled={!isSubmittable}
        >
          {isWrite ? "작성 완료" : "수정 완료"}
        </SubmitBtn>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 13.2rem;
  overflow-y: scroll;
  .name-input {
    margin-top: 1.2rem;
  }
  .added-list {
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
    $disabled ? theme.color.gray4 : theme.color.orange};
`;

const Input = styled.textarea<{ $error?: boolean }>`
  ${input};
  height: 5rem;
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
