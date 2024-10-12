import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import MyPageMain from './MyPageMain';

const MyPage = () => {
  return (
    <HomeContainer>
        <TopBar />
        <MyPageMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default MyPage