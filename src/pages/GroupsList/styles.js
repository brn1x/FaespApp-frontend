import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;

  padding-right: 15px;
  padding-left: 15px;
`

export const List = styled.div`
  width: 100%;
  max-width: 90%;
  padding: 0 30px;
  margin: 32px auto;
`