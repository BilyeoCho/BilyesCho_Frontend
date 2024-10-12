import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import RentMain from './RentMain';

const Rent = () => {
  return (
    <HomeContainer>
        <TopBar />
        <RentMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default Rent