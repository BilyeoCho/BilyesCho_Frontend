import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import Main from './Main';

const Home = () => {
  return (
    <HomeContainer>
      <TopBar />
      <Main />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default Home;
