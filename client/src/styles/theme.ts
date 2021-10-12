import styled, { DefaultTheme, css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperWithHeaderFooter = css`
  width: 100%;
  padding-top: 7rem;
  padding-bottom: 8.8rem;
  box-sizing: border-box;
`;
export const WrapperWithHeader = css`
  width: 100%;
  padding-top: 7rem;
  box-sizing: border-box;
`;

export const Button = styled.div`
  ${flexCenter};
  background-color: #000;
  color: #fff;
  padding: 1.4rem 0;
  font-size: 1.6rem;
  border-radius: 1.2rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.5rem 0;
  padding-left: 1.6rem;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  font-size: 1.4rem;
  box-sizing: border-box;
  &:focus {
    border: 0.1rem solid lightgray;
  }
`;

const calculateMargin = (
  gap: string,
  direction: "row" | "column" | "column-reverse"
) => {
  if (direction === "row") return `margin-left: ${gap}`;
  if (direction === "column") return `margin-top: ${gap}`;
  if (direction === "column-reverse") return `margin-bottom: ${gap}`;
  return "";
};
export const gap = (
  gapLength: string,
  direction: "row" | "column" | "column-reverse" = "row"
) => {
  return css`
    & > * + * {
      ${calculateMargin(gapLength, direction)}
    }
  `;
};

export const theme: DefaultTheme = {
  color: {
    purple: "#8661de",
    blue: "#00bac7",
    gray: "#f6f6f6",
    green: "#07b495",
    lightGreen: "#99ecdd",
    darkGray: "#54595d",
  },
  boxShadow: {
    normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
    purple: "0 3px 8px 0 #d6c9ff",
    blue: "0 3px 8px 0 #b3e2e6",
  },
  flexCenter,
};
