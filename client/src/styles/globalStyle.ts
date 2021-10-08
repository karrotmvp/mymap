import { createGlobalStyle } from "styled-components";
import "./reset.scss";

export const GlobalStyle = createGlobalStyle`
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html{
        font-size: 10px;
        -webkit-text-size-adjust: none;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';   
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;
