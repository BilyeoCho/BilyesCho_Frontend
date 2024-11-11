import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import ItemRentMain from './ItemRentMain';

const ItemRent = () => {
  return (
    <HomeContainer>
      <TopBar />
      <MainWrapper>
        <ItemRentMain />
      </MainWrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;

export default ItemRent;