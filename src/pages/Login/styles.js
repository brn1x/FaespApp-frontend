import styled from 'styled-components'

export const Container = styled.div`  
margin: 150px auto ;
max-width: 1500px;
display: flex;
align-items: center;
justify-content: space-between;
  
  img {
    width: 800px;
  }

  div{
    img {
      width: 600px;
    }
    
    form {
      width: 300px;
      margin: 7% 35%;
      align-items: center;
      justify-content: center;

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
        align-items: center;
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