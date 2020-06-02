import styled from 'styled-components'

export const ButtonsList = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 92.9vh;
  background: #fff;
  padding-top: 15vh;
  border-right: 1px solid #000;

  button {
    width: 100%;
    height: 50px;
    background: #FFF;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    color: #000;
    font-weight: 700;
    padding-right: 10px;
    display: inline-block;
    text-align: right;
    text-decoration: none;
    font-size: 18px;
    line-height: 20px;
    transition: filter 0.2s;
    cursor: pointer;
      :hover {
        filter: brightness(80%);
      }
  }

  button + button{
    border-top: 0;
  }
`

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 93vh;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`