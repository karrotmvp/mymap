import styled from "styled-components";
import { flexCenter, theme } from "../../styles/theme";
import { PlaceType } from "../../Shared/type";
import { Dispatch, SetStateAction } from "react";
import PlaceList from "./PlaceList";

const AroundSlide = ({
  isScrollUp,
  places,
  setIsMapShown,
}: {
  isScrollUp: boolean;
  places: PlaceType[];
  setIsMapShown: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          setIsMapShown(false);
        }}
      >
        {!isScrollUp && (
          <div className="rectangle">
            <div />
          </div>
        )}
        <PlaceList {...{ places }} />
      </Card>
    </>
  );
};

const Card = styled.div`
  position: relative;
  min-height: 10vh;
  background-color: ${theme.color.white};
  padding-top: 4.1rem;
  padding-bottom: 6.8rem;
  box-sizing: border-box;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.15);
  .rectangle {
    ${flexCenter};
    & > div {
      background-color: ${theme.color.gray2};
      border-radius: 2rem;
      width: 4rem;
      height: 0.3rem;
      position: absolute;
      top: 1.4rem;
    }
  }
`;

export default AroundSlide;
