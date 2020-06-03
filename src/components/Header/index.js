import React from 'react';

import { Container, Logo } from './styles';
import Menu from '../Menu'

import logoFaespWhite from '../../assets/logoFaespWhite.png'

export default function Header() {
  return (
    <Container >
      <Logo>
        <img src={logoFaespWhite} alt="logo Faesp"/>
      </Logo>
      <Menu />
    </Container>
  );
}