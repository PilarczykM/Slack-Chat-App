import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .messages {
    height: 440px;
    overflow-y: scroll;
  }

  .message__form {
    position: fixed !important;
    bottom: 1em;
    left: 320px;
    right: 0;
    z-index: 200;
  }
`;
