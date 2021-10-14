import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import { theme } from "../styles/theme";
import PlaceInfo from "./PlaceInfo";

const PlaceCard = ({ place }: { place: PlaceType }) => {
  return (
    <Wrapper>
      <div className="photo" />
      <PlaceInfo {...{ place }} />
      <div className="info">010-0000-0000</div>
      <div className="info">09:00 - 22:00 연중무휴</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 1.8rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 0.1rem solid lightgray;
  .photo {
    width: 100%;
    height: 19rem;
    background: lightgray;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    margin-bottom: 1.1rem;
  }
  .info {
    margin-left: 1.2rem;
    margin-top: 0.4rem;
    font-size: 1.3rem;
    line-height: 145%;
    letter-spacing: -2%;
    color: ${theme.color.gray6};
  }
`;

export default PlaceCard;
