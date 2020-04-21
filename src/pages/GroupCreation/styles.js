import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 30px auto;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;
  background: #f0f0f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  align-items: center;

  form {
    width: 100%;
    max-width: 450px;
    align-items: center;
    justify-content: center;

    label {
      font-size: 18px;
      font-weight: 700;
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
  }

  input, button, textarea {
    font: 400 18px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }
`

export const Button = styled.button`
  width: 100%;
  height: 60px;
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
  line-height: 60px;
  transition: filter 0.2s;

  :hover {
    filter: brightness(80%);
  }


  
`