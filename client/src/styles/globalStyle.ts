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
            z-index: 900;
        }
        .pin-image-inactive {
            position: absolute;
            width: 2.5rem;
            transform: translate(-50%,-100%);
        }
        .pin-box {
            font-weight: 500;
            font-size: 1.2rem;
            line-height: 135%;
            padding: 0.9rem 2.1rem;
            border-radius: 1.2rem;
            position: absolute;
            transform: translate(-50%,-270%);
            z-index: 900;
            white-space: nowrap;
            background: ${theme.color.white};
            border: 0.1rem solid ${theme.color.orange};
            box-sizing: border-box;
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.22);
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
        z-index: 200;
    } 
`;
