import styled from "styled-components";
import { ReactElement, SetStateAction, useEffect, useState } from "react";
import Flickity from "react-flickity-component";

export type SwiperProps = {
  contents?: Array<ReactElement>;
  onChange?: (index: number) => void;
  current?: number;
  style?: React.CSSProperties;
};

function Swiper({ contents, onChange, current }: SwiperProps) {
  const [ref, setRef] = useState<any>();

  useEffect(() => {
    if (!ref || current === undefined || current === null) {
      return;
    }

    if (current !== ref.selectedIndex) {
      ref.select(current);
    }

    const handleFlktyChange = (index: number) => {
      onChange && onChange(index);
    };

    ref.on("change", handleFlktyChange);
    return () => {
      ref.off("change", handleFlktyChange);
    };
  }, [ref, onChange, current]);

  return (
    <Wrapper>
      <Flickity
        options={{
          prevNextButtons: false,
          initialIndex: current,
        }}
        flickityRef={(c: SetStateAction<any>) => setRef(c)}
      >
        {contents}
      </Flickity>
    </Wrapper>
  );
}

export default Swiper;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  outline: none;
`;
