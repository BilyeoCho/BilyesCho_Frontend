import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import ItemRentMain from './ItemRentMain';

const ItemRent = () => {
  return (
    <HomeContainer>
        <TopBar />
        <ItemRentMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default ItemRent