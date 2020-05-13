import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font: 14px 'Roboto', sans-serif;
    background: #ecf1f8;
    color: #333;
    -webkit-font-smoothing: antialiased !important;
  }

  input {
    margin-bottom: 15px;
    width: 100%;
    height: 40px;
    color: #333333;
    border: 1px solid #dcdcd6;
    border-radius: 8px ;
    padding: 0 24px;
  }

  select {
    margin-bottom: 15px;
    width: 100%;
    height: 40px;
    color: #333333;
    border: 1px solid #dcdcd6;
    border-radius: 8px;
    padding: 0 5px;
  }

  textarea {
    width: 100%;
    min-height: 140px;
    max-height: 140px;
    resize: vertical;
    height: 60px;
    margin-bottom: 15px;
    color: #333333;
    border: 1px solid #dcdcd6;
    border-radius: 8px ;
    padding: 16px 24px;
    line-height: 24px;
  }

  input, button, textarea, select{
    font: 400 18px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;