import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import Main from './Main';

const Home = () => {
  return (
    <HomeContainer>
      <TopBar />
      <MainWrapper>
        <Main />
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

export default Home;
