import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import ItemRentMain from './ItemRentMain';
import { useNavigate } from 'react-router-dom';

const ItemRent = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <TopBar />
      <MainWrapper>
        <ItemRentMain onCardClick={(itemId) => navigate(`/itemrent/${itemId}`)} />
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