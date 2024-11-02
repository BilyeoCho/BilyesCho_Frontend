import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import ItemRegisterMain from './ItemRegisterMain';

const ItemRegister = () => {
  return (
    <HomeContainer>
        <TopBar />
        <ItemRegisterMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default ItemRegister