import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import TalkMain from './TalkMain';

const Talk = () => {
  return (
    <HomeContainer>
        <TopBar />
        <TalkMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default Talk