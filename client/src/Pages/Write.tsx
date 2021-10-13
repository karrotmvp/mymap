import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import {
  Button,
  flexCenter,
  gap,
  Input,
  WrapperWithHeader,
} from "../styles/theme";
import SearchPlace from "./SearchPlace";

const Write = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [isPublic, setIsPublic] = useState<null | boolean>(null);

  // 글자수 제한
  const [isTextOver, setIsTextOver] = useState(false);
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // textarea autosize
    e.target.style.height = "5.2rem";
    e.target.style.height = e.target.scrollHeight + "px";

    if (e.target.value.length > 30) {
      setIsTextOver(true);
    } else {
      setIsTextOver(false);
    }
  };

  return (
    <Wrapper>
      <Header title="컬렉션 만들기" />
      <Title>{`추천하고 싶은
나만의 장소를 알려주세요`}</Title>

      <div className="subtitle">컬렉션 이름을 정해주세요</div>
      <div className="name-input">
        <Input
          $error={isTextOver}
          rows={2}
          maxLength={30}
          onInput={handleInput}
          placeholder="예) 나만 알고있던 혼밥하기 좋은 식당"
        />
      </div>

      <div className="subtitle">동네 주민들에게 컬렉션을 공개할까요?</div>
      <div>서비스명은 동네 주민과 공유하는 것을 권장해요?</div>
      <div className="public-buttons">
        <SelectBtn
          onClick={() => setIsPublic(true)}
          isSelected={isPublic === true}
        >
          공개하기
        </SelectBtn>
        <SelectBtn
          onClick={() => setIsPublic(false)}
          isSelected={isPublic === false}
        >
          나만보기
        </SelectBtn>
      </div>

      <div className="subtitle">컬렉션에 저장할 장소를 추가해주세요</div>
      <div>최대 10개 장소까지 추가할 수 있어요!</div>

      <div className="add-button" onClick={() => setIsSearchOpened(true)}>
        장소 추가
      </div>

      {isSearchOpened && <SearchPlace />}

      <SubmitBtn>완료</SubmitBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding-left: 2rem;
  padding-right: 2rem;
  .name-input {
    margin-top: 1.2rem;
  }
  .add-button {
    ${flexCenter};
    border-radius: 1.2rem;
    padding: 1.4rem 0;
    border: 1px solid #acb5bd;
    font-size: 1.6rem;
    margin-top: 1.2rem;
  }
  .subtitle {
    font-size: 1.7rem;
    margin-top: 3.6rem;
    line-height: 160%;
  }
  .public-buttons {
    width: 100%;
    display: flex;
    ${gap("0.8rem")};
    margin-top: 1rem;
    box-sizing: border-box;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.2rem;
  line-height: 115%;
  white-space: pre-wrap;
  margin-top: 2.9rem;
`;

const SelectBtn = styled.div<{ isSelected: boolean }>`
  ${flexCenter};
  padding: 1.4rem;
  border: 0.1rem solid
    ${({ isSelected }) => (isSelected ? "#FFA26E" : "#dde2e5")};
  background: ${({ isSelected }) => isSelected && "#FFA26E"};
  box-sizing: border-box;
  border-radius: 1rem;
  font-size: 1.4rem;
  line-height: 135%;
  width: 100%;
  color: ${({ isSelected }) => isSelected && "#fff"};
`;

const SubmitBtn = styled(Button)`
  position: fixed;
  left: 0;
  right: 0;
  width: auto;
  margin: 0 2rem;
  bottom: 3.5rem;
`;

export default Write;
