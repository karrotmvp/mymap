import { createGlobalStyle } from "styled-components";
import "./reset.scss";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html {
        font-size: 10px;
        -webkit-text-size-adjust: none;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
        color: ${theme.color.black};
        background-color: #FFFFFF;
        .pin-image {
            position: absolute;
            width: 4.2rem;
            transform: translate(-50%,-100%);
        }
        .pin-image-inactive {
            position: absolute;
            width: 2.5rem;
            transform: translate(-50%,-100%);
        }
    }
    textarea {
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    }
    img {
        object-fit: cover;
    }

    // naver map
    #react-naver-map{
        & > div {
            display: none;
        }
    }

    .background {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100vh;
        background-color: #000;
        opacity: 0.5;
        z-index: 100;
    } 
`;
