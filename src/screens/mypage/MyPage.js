import React from 'react';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import MyPageMain from './MyPageMain';

const MyPage = () => {
  return (
    <HomeContainer>
      <TopBar />
      <MainWrapper>
        <MyPageMain />
      </MainWrapper>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;
export default MyPage;