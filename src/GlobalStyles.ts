import { palette } from "@neurotech/elements";
import { createGlobalStyle } from "styled-components";

export const fontFamily = `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"`;
export const monoFontFamily = `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace`;

export const GlobalStyles = createGlobalStyle`
  * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
    vertical-align: baseline;
  }

  body {
    background-color: ${palette.black};
    color: white;
    display: flex;
    font-family: ${fontFamily};
    font-size: 1rem;
    line-height: 1.5rem;
    min-height: 100vh;
    padding: 1rem;
    width: 100%;
  }

  a {
    border-radius: 4px;
    color: ${palette.yellow};
  }

  a:hover {
    background-color: ${palette.yellow};
    color: ${palette.darkyellow};

  }

  ::selection {
    background-color: ${palette.white};
    color: ${palette.black};
  }
`;
