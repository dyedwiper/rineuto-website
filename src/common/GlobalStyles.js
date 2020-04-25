import { createGlobalStyle } from 'styled-components/macro';
import blackPerlImage from '../assets/blackPerl.png';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
 
  body {
    margin: 0;
    background-image: url(${blackPerlImage});
    background-size: 100%;
    background-color: black;
    font-family: 'Linux Libertine G', serif;
    font-size: 16px;
  }

  input, button, textarea {
    border: none;
    font-family: inherit;
    font-size: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;
