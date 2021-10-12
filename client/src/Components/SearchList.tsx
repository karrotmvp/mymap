import styled from "styled-components";

const SearchList = () => {
  return (
    <Wrapper>
      <div className="name">폴바셋 교보문고</div>
      <div className="address">
        서울특별시 서초구 서초4동 강남대로 465 교보 타워{" "}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 0.1rem solid lightgray;
  padding: 1.3rem 2rem;
  .name {
    font-size: 1.6rem;
    line-height: 135%;
  }
  .address {
    font-size: 1.4rem;
    line-height: 140%;
  }
`;

export default SearchList;
