import styled from "styled-components";

const PlaceInfo = () => {
  return (
    <Wrapper>
      <Tag>식당</Tag>
      <div className="title">카페 노티드 청담</div>
      <div className="subinfo">
        부산광역시 강서구 녹산산단382로14번가길 10~29번지(송정동)
      </div>
      <div className="subinfo">09:00 - 22:00 연중무휴2</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.1rem;
  .title {
    margin-top: 1rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
  }
  .subinfo {
    margin-top: 0.7rem;
    color: gray;
    font-size: 1.3rem;
  }
`;

const Tag = styled.div`
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0.1rem solid lightgray;
`;

export default PlaceInfo;
