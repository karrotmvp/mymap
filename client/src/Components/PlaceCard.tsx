import styled from "styled-components";
import { Call, Time } from "../assets";
import { PlaceType } from "../Shared/type";
import { theme } from "../styles/theme";
import PlaceInfo from "./PlaceInfo";

const PlaceCard = ({ place }: { place: PlaceType }) => {
  return (
    <Wrapper>
      {place.images.length > 0 && (
        <img
          className="photo"
          alt="thumbnail"
          src={place.images[0].thumbnail}
        />
      )}
      <div className="place-info">
        <PlaceInfo {...{ place }} />
        <div className="sub-info phone">
          <Call />
          <div>010-0000-0000</div>
        </div>
        <div className="sub-info time">
          <Time />
          <div>09:00 - 22:00 연중무휴</div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    object-fit: cover;
  }
  .place-info {
    padding: 1.5rem;
  }
  .sub-info {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    color: ${theme.color.gray6};
    line-height: 145%;
    letter-spacing: -2%;
    & > div {
      margin-left: 1.1rem;
    }
  }
  .phone {
    margin-top: 0.6rem;
  }
  .time {
    margin-top: 0.4rem;
  }
`;

export default PlaceCard;
