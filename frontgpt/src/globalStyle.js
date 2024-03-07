import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html, body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

#root {
  height: 100%;
  width: 100%;
}

`;

export default GlobalStyle;
