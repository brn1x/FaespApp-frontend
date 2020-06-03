import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  a {
    display: flex;
    color: #f7f7f7;
    padding: 30px 15px;
    text-decoration: none; 
    font-size: 18px;
    font-weight: 700;
    transition: 0.4s;

    :hover {
      background-color: #ecf1f8;
      text-shadow: 0.2px 0.2px #f3f3f3;
      color: #183196;
    }
  }
`;

export const MenuList = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;

  li {
    :first-child {
      margin-left: 33px;
    }
  }
`;