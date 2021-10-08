import styled from "styled-components";
import Header from "../Components/Header";
import { Input, WrapperWithHeader } from "../styles/theme";

const Write = () => {
  return (
    <Wrapper>
      <Header title="컬렉션 만들기" />
      <Title>{`추천하고 싶은
나만의 장소를 알려주세요`}</Title>

      <div>컬렉션 이름을 정해주세요</div>
      <Input />

      <div>컬렉션에 저장할 장소를 추가해주세요</div>
      <div>최대 10개 장소까지 추가할 수 있어요!</div>
      <div>장소 추가</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${WrapperWithHeader};
  padding-left: 2rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.2rem;
  line-height: 115%;
  white-space: pre-wrap;
  margin-top: 2.9rem;
`;

export default Write;
