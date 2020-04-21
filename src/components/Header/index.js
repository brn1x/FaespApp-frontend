import React from 'react';

import { Container, Logo } from './styles';
import Menu from '../Menu'

export default function Header() {
  return (
    <Container >
      <Logo>FaespApp</Logo>
      <Menu />
    </Container>
  );
}