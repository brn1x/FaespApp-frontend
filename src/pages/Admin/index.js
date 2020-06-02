import React, { useState } from 'react';

import { ButtonsList, Background } from './styles';

import Header from '../../components/Header';
import ModalConfigDate from '../../components/Modals/ModalConfigDate';
import ModalCategory from '../../components/Modals/ModalCategory';
import ModalCampus from '../../components/Modals/ModalCampus';


export default function Admin () {

  const [modalConfigDateView, setModalConfigDateView] = useState(false);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalCampus, setModalCampus] = useState(false);

  return (
    <>
      <Header />
      <ButtonsList>
        <button onClick={() => setModalConfigDateView(true)}>Configuração de datas</button>
        <button onClick={() => setModalCategory(true)}>Categorias de grupos</button>
        <button onClick={() => setModalCampus(true)}>Campus</button>
      </ButtonsList>
      {modalConfigDateView ? (
          <Background>
            <ModalConfigDate onClose={() => setModalConfigDateView(false)} />
          </Background>
        ) : null}
      {modalCategory ? (
          <Background>
            <ModalCategory onClose={() => setModalCategory(false)}/>
          </Background>
        ) : null}
      {modalCampus ? (
          <Background>
            <ModalCampus onClose={() => setModalCampus(false)} />
          </Background>
        ) : null}
    </>
  )
}