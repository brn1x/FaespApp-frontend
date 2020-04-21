import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  a {
    color: #f7f7f7;
    padding: 5px 10px;
    text-decoration: none;

    :hover {
      text-shadow: 0.2px 0.2px #f3f3f3;
      text-decoration: underline
    }
  }
`;

export const MenuList = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;

  li {
    :first-child {
      margin-left: 30px;
    }
    :last-child {
      color: red !important;
    }
  }
`;