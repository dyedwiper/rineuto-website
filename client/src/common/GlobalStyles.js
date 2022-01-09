import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root{
      --primary-color: white;
      --success-color: chartreuse;
      --error-color: coral;
  }
 
  body {
    margin: 0;
    font-family: 'Linux Libertine G', 'Times New Roman', 'Times', serif;
    font-size: 16px;
    overflow-wrap: break-word;
    background-color: black;
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
