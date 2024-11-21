import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import styled from 'styled-components';

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리 로직
    navigate('/');
  };

  return (
    <TopBarWrapper>
      <TitleWrapper onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        <Title />
      </TitleWrapper>
      <MenuWrapper>
        <MenuItem onClick={() => navigate('/itemrent')}>대여</MenuItem>
        <MenuItem onClick={() => navigate('/itemregister')}>등록</MenuItem>
        <MenuItem onClick={() => navigate('/review')}>리뷰</MenuItem>
        <MenuItem onClick={() => navigate('/mypage')}>마이페이지</MenuItem>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
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
  transition: opacity 0.2s ease-in-out;
  
  &:hover {
    opacity: 0.7;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
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

const LogoutButton = styled(MenuItem)`
  color: #dc3545;
  font-weight: 500;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default TopBar;
