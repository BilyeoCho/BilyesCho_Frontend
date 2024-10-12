import React from 'react'
import styled from 'styled-components'
import TopBar from '../../components/TopBar';
import RegisterMain from './RegisterMain';

const Register = () => {
  return (
    <HomeContainer>
        <TopBar />
        <RegisterMain />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default Register