import React from 'react'
import { FaRegHandshake } from "react-icons/fa";
import styled from 'styled-components';

const Title = () => {
  return (
    <TitleWrapper>
      <IconWrapper>
        <FaRegHandshake size={24} color="#333" />
      </IconWrapper>
      <TitleText>BilyeoCho</TitleText>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const IconWrapper = styled.div`
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const TitleText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export default Title