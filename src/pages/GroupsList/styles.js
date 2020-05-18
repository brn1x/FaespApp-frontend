import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-width: 1095px;
`

export const Title = styled.h1`
  text-align: center;
  margin: 20px;
`

export const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;
`

export const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  margin: 32px auto;
`