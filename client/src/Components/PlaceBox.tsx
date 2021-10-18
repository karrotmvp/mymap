import { ReactChild } from "react";
import styled from "styled-components";
import { PlaceType } from "../Shared/type";
import { theme } from "../styles/theme";
import PlaceInfo from "./PlaceInfo";

const PlaceBox = ({
  place,
  className,
  children,
}: {
  place: PlaceType;
  className?: string;
  children?: ReactChild;
}) => {
  return (
    <Wrapper {...{ className }}>
      <div className="wrapper">
        <div className="photo" />
        <PlaceInfo {...{ place }} />
      </div>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${theme.color.white};
  border-radius: 1.2rem;
  padding: 2.2rem 1.8rem;
  width: 32rem;
  box-sizing: border-box;
  .wrapper {
    display: flex;
  }
  .photo {
    min-width: 10rem;
    height: 10rem;
    border-radius: 0.8rem;
    background-color: lightgray;
  }
  .recommend {
    font-size: 1.3rem;
    color: ${theme.color.orange};
    letter-spacing: -2%;
    margin-top: 0.4rem;
    line-height: 145%;
  }
`;

export default PlaceBox;
