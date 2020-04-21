import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 15px auto;
  min-width: 350px;

  background: #FBFBFB;
  border-radius: 8px;
  position: relative;
  padding: 15px 15px 15px 15px;

  box-shadow: 1px 1px #ddd;

  h1 {
    width: 90%;
    margin-bottom: 3px;
  }

  span {
    font-size: 16px;
    line-height: 25px;
    color: #000;
  }

  strong {
    font-size: 14px;
  }

  button {
    position: absolute;
    right: 14px;
    top: 20px;
    border: 0;
    background: #FFF;
    transition: opacity 0.2s;
  }

  div {
    margin-top: 20px;
  }

  button + button {
    right: 40px;
  }

  button:hover {
    opacity: 0.6;
  }
`

export const CategoryTxt = styled.p`
  font-size: 12px !important;
  color: #828282 !important;
  margin-bottom: 15px !important;
`