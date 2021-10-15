import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../Components/Header";
import useInput from "../Hooks/useInput";
import { Places } from "../Shared/atom";
import {
  Button,
  flexCenter,
  gap,
  input,
  theme,
  Title,
  WrapperWithHeader,
} from "../styles/theme";
import SearchPlace from "./SearchPlace";

const Write = () => {
  // SearchPlace
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const [isShare, setIsShare] = useState<null | boolean>(null);
  const places = useRecoilValue(Places);

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

  return (
    <Wrapper>
      <Header title="컬렉션 만들기" />
      <Title>{`추천하고 싶은
나만의 장소를 모아봐요`}</Title>

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

      <div className="subtitle">컬렉션에 저장할 장소를 추가해주세요.</div>
      <div className="explanation">최대 10개 장소를 추가할 수 있어요.</div>

      {/* 추가된 장소들 */}
      {places?.map((place) => (
        <div className="added-list">
          <div className="photo" />
          {place.name}
        </div>
      ))}

      <div className="add-button" onClick={() => setIsSearchOpened(true)}>
        장소 추가
      </div>

      {isSearchOpened && <SearchPlace {...{ setIsSearchOpened }} />}

      <SubmitBtn $disabled={!isSubmittable}>완료</SubmitBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 11.7rem;
  overflow-y: scroll;
  .name-input {
    margin-top: 1.2rem;
  }
  .added-list {
    display: flex;
    align-items: center;
    border-radius: 1rem;
    height: 5.2rem;
    border: 1px solid ${theme.color.orange};
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
  }
  .add-button {
    ${flexCenter};
    border-radius: 1rem;
    height: 5.2rem;
    border: 1px dashed ${theme.color.orange};
    font-size: 1.4rem;
    line-height: 135%;
    font-weight: 500;
    margin-top: 1.2rem;
    color: ${theme.color.orange};
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
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 2rem;
  bottom: 3.5rem;
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
    background-color: ${theme.color.white};
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
    background-color: ${theme.color.white};
    border: 0.1rem solid
      ${({ $error }) => (!$error ? theme.color.gray4 : theme.color.red)};
  }
`;

export default Write;
