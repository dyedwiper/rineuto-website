import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
 
  body {
    margin: 0;
    font-family: 'Linux Libertine G', serif;
    font-size: 16px;
  }
  
  input, button, textarea {
    font-family: 'Linux Libertine G', serif;
    font-size: 1em;
  }
`