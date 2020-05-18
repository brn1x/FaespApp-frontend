import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-width: 1000px;

  div {
    position: relative;
    padding: 40px;
    background: #f0f0f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 50px auto;
    width: 100%;
    max-width: 450px;

    h2 {
      text-align: center;
      margin-bottom: 20px;
      font-weight: 200;
      font-size: 25px;
    }

    form + form {
      padding-top: 40px;
    }

    form {   
      width: 100%;
      max-width: 450px;

      label {
        font-size: 18px;
        font-weight: 700;
      }

      button {
        width: 100%;
        height: 40px;
        background: #183196;
        border: 0;
        border-radius: 8px;
        color: #FFF;
        font-weight: 700;
        margin-top: 16px;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        line-height: 20px;
        transition: filter 0.2s;
        cursor: pointer;

          :hover {
            filter: brightness(80%);
          }
      }
    }
  }
`

export const CloseButton = styled.button`
  right: 10px;
  top: 10px;
  position: absolute;
  transition: opacity 0.2s;
  display: flex;
  border: none;
  :hover {
    opacity: 0.6;
  }
`