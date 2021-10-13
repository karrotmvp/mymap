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
    black: "#333333",
    gray7: "#585858",
    gray6: "#767676",
    gray5: "#9C9C9C",
    gray4: "#B4B4B4",
    gray3: "#CECECE",
    gray2: "#E5E5E5",
    gray1: "#F8F9FA",
    white: "#FFFFFF",
    orange: "#FF7964",
    red: "#FC453A",
  },
  flexCenter,
};

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

export const Input = styled.textarea<{ $error?: boolean }>`
  width: 100%;
  height: 5rem;
  padding: 1.5rem 1.6rem;
  border: 0.1rem solid
    ${({ $error }) => (!$error ? theme.color.gray3 : theme.color.red)};
  border-radius: 1rem;
  font-size: 1.4rem;
  box-sizing: border-box;
  &:focus {
    border: 0.1rem solid
      ${({ $error }) => (!$error ? theme.color.gray5 : theme.color.red)};
  }
`;
