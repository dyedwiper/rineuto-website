import { createGlobalStyle } from 'styled-components/macro';
import twinCurtainImage from '../assets/twinCurtain.jpg';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
 
  body {
    margin: 0;
    background-image: url(${twinCurtainImage});
    background-size: cover;
    background-color: black;
    font-family: 'Linux Libertine G', 'Times New Roman', 'Times', serif;
    font-size: 16px;
    overflow-wrap: break-word;
  }

  input, button, textarea {
    border: none;
    font-family: inherit;
    font-size: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 5px;
    padding: 5px;
  }

  input {
    /* Fix for iPhone because inputs are somehow too wide elsewise */
    width: 100%;
  }

  button {
    background-color: white;
    cursor: pointer;
  }
`;
