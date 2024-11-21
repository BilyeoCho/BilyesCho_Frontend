import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar';
import RegisterHistory from './RegisterHistory';

const MyPageMain = () => {
  const [activeMenu, setActiveMenu] = useState('등록내역');

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    // 추후 각 메뉴별 라우팅 처리
  };

  return (
    <Container>
      <SideBar 
        activeMenu={activeMenu} 
        onMenuClick={handleMenuClick}
      />
      <RegisterHistory />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 40px;
  height: 100%;
`;

export default MyPageMain;