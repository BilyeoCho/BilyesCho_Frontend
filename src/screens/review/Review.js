import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import ReviewMain from './ReviewMain';

const Review = () => {
  return (
    <HomeContainer>
        <TopBar />
        <ReviewMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default Review