import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import styled from 'styled-components';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <TopBarWrapper>
      <TitleWrapper>
        <Title />
      </TitleWrapper>
      <MenuWrapper>
        <MenuItem onClick={() => navigate('/home')}>홈</MenuItem>
        <MenuItem onClick={() => navigate('/itemrent')}>대여</MenuItem>
        <MenuItem onClick={() => navigate('/itemregister')}>등록</MenuItem>
        <MenuItem onClick={() => navigate('/talk')}>톡</MenuItem>
        <MenuItem onClick={() => navigate('/review')}>리뷰</MenuItem>
        <MenuItem onClick={() => navigate('/mypage')}>마이페이지</MenuItem>
      </MenuWrapper>
    </TopBarWrapper>
  );
};

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MenuWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  &:hover {
    opacity: 0.7;
  }
`;

export default TopBar;
