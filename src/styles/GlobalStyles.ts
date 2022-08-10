import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }

:root{
  display:flex;
  justify-content:center;
  height:100vh;
  font-size: 11px;
  }
  

  p,div,li {
    color: #393B44;
  }

a {
  color: inherit;
  text-decoration: none;
} 
`;

export default GlobalStyle;
